import Client from '#models/client'
import Invoice from '#models/invoice'
import InvoiceItem from '#models/invoice_item'
import InvoiceSetting from '#models/invoice_setting'
import HttpError, { isHttpError } from '#services/http_error'
import InvoicePdfService from '#services/invoice_pdf_service'
import InvoiceStatusService from '#services/invoice_status_service'
import InvoiceTotalService from '#services/invoice_total_service'
import {
  createInvoiceValidator,
  updateInvoiceValidator,
  type InvoiceItemPayload,
} from '#validators/invoice'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { access } from 'node:fs/promises'
import path from 'node:path'
import { DateTime } from 'luxon'

function handleHttpError(error: unknown, response: HttpContext['response']) {
  if (isHttpError(error)) {
    return response.status(error.status).send({ message: error.message })
  }

  throw error
}

function parseDate(value: string, field: string) {
  const date = DateTime.fromISO(value)

  if (!date.isValid) {
    throw new HttpError(422, `${field} must be a valid ISO date`)
  }

  return date
}

function mapItems(invoiceId: number, items: InvoiceItemPayload[]) {
  return items.map((item, index) => ({
    invoiceId,
    description: item.description,
    quantity: item.quantity ?? null,
    unitPrice: item.unitPrice ?? null,
    totalPrice: item.totalPrice,
    sortOrder: index + 1,
  }))
}

export default class InvoicesController {
  async index({}: HttpContext) {
    const invoices = await Invoice.query()
      .preload('client')
      .preload('items', (itemsQuery) => itemsQuery.orderBy('sort_order', 'asc'))
      .orderBy('issue_date', 'desc')
      .orderBy('id', 'desc')

    return { data: invoices.map((invoice) => invoice.serialize()) }
  }

  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createInvoiceValidator)
      const invoiceId = await db.transaction(async (trx) => {
        const client = await Client.find(payload.clientId, { client: trx })
        if (!client) {
          throw new HttpError(404, 'Client not found')
        }

        const settings = await InvoiceSetting.query({ client: trx }).first()
        const invoice = new Invoice()
        invoice.clientId = client.id
        invoice.issueDate = parseDate(payload.issueDate, 'issueDate')
        invoice.serviceDate = payload.serviceDate
          ? parseDate(payload.serviceDate, 'serviceDate')
          : null
        invoice.paymentMethod = payload.paymentMethod ?? 'Überweisung'
        invoice.paymentDueDays = payload.paymentDueDays ?? settings?.defaultPaymentDueDays ?? 7
        invoice.status = 'draft'
        invoice.currency = 'EUR'
        invoice.totalAmount = InvoiceTotalService.calculateFromPayload(payload.items)

        invoice.useTransaction(trx)
        await invoice.save()
        await InvoiceItem.createMany(mapItems(invoice.id, payload.items), { client: trx })

        return invoice.id
      })

      const invoice = await this.findWithRelations(invoiceId)

      response.status(201)
      return { data: invoice!.serialize() }
    } catch (error) {
      return handleHttpError(error, response)
    }
  }

  async show({ params, response }: HttpContext) {
    const invoice = await this.findWithRelations(params.id)
    if (!invoice) {
      return response.status(404).send({ message: 'Invoice not found' })
    }

    return { data: invoice.serialize() }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(updateInvoiceValidator)
      const invoiceId = await db.transaction(async (trx) => {
        const invoice = await Invoice.find(params.id, { client: trx })
        if (!invoice) {
          throw new HttpError(404, 'Invoice not found')
        }

        if (invoice.status !== 'draft') {
          throw new HttpError(409, 'Only draft invoices can be edited')
        }

        if (payload.clientId !== undefined) {
          const client = await Client.find(payload.clientId, { client: trx })
          if (!client) {
            throw new HttpError(404, 'Client not found')
          }
          invoice.clientId = client.id
        }

        if (payload.issueDate !== undefined) {
          invoice.issueDate = parseDate(payload.issueDate, 'issueDate')
        }
        if (payload.serviceDate !== undefined) {
          invoice.serviceDate = payload.serviceDate
            ? parseDate(payload.serviceDate, 'serviceDate')
            : null
        }
        if (payload.paymentMethod !== undefined) {
          invoice.paymentMethod = payload.paymentMethod
        }
        if (payload.paymentDueDays !== undefined) {
          invoice.paymentDueDays = payload.paymentDueDays
        }
        if (payload.items !== undefined) {
          await InvoiceItem.query({ client: trx }).where('invoice_id', invoice.id).delete()
          await InvoiceItem.createMany(mapItems(invoice.id, payload.items), { client: trx })
          invoice.totalAmount = InvoiceTotalService.calculateFromPayload(payload.items)
        }

        invoice.useTransaction(trx)
        await invoice.save()

        return invoice.id
      })

      const invoice = await this.findWithRelations(invoiceId)

      return { data: invoice!.serialize() }
    } catch (error) {
      return handleHttpError(error, response)
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const invoice = await Invoice.find(params.id)
      if (!invoice) {
        throw new HttpError(404, 'Invoice not found')
      }

      if (invoice.status !== 'draft') {
        throw new HttpError(409, 'Only draft invoices can be deleted')
      }

      await invoice.delete()

      return response.noContent()
    } catch (error) {
      return handleHttpError(error, response)
    }
  }

  async issue({ params, response }: HttpContext) {
    try {
      const invoice = await InvoiceStatusService.issue(Number(params.id))
      await InvoicePdfService.generateAndPersist(invoice.id)
      const issuedInvoice = await this.findWithRelations(invoice.id)

      return { data: issuedInvoice!.serialize() }
    } catch (error) {
      return handleHttpError(error, response)
    }
  }

  async generatePdf({ params, response }: HttpContext) {
    try {
      const invoice = await InvoiceStatusService.ensureIssued(Number(params.id))
      await InvoicePdfService.generateAndPersist(invoice.id)
      const updatedInvoice = await this.findWithRelations(invoice.id)

      return { data: updatedInvoice!.serialize() }
    } catch (error) {
      return handleHttpError(error, response)
    }
  }

  async download({ params, response }: HttpContext) {
    try {
      const invoice = await Invoice.find(params.id)
      if (!invoice) {
        throw new HttpError(404, 'Invoice not found')
      }

      if (!invoice.pdfPath) {
        throw new HttpError(404, 'PDF has not been generated for this invoice yet')
      }

      const absolutePath = InvoicePdfService.absolutePath(invoice.pdfPath)
      try {
        await access(absolutePath)
      } catch {
        throw new HttpError(404, 'Generated PDF file was not found on disk')
      }

      const fileName = path.basename(absolutePath)
      return response.attachment(absolutePath, fileName)
    } catch (error) {
      return handleHttpError(error, response)
    }
  }

  async markPaid({ params, response }: HttpContext) {
    try {
      const invoice = await InvoiceStatusService.markPaid(Number(params.id))
      const paidInvoice = await this.findWithRelations(invoice.id)

      return { data: paidInvoice!.serialize() }
    } catch (error) {
      return handleHttpError(error, response)
    }
  }

  async cancel({ params, response }: HttpContext) {
    try {
      const invoice = await InvoiceStatusService.cancel(Number(params.id))
      const cancelledInvoice = await this.findWithRelations(invoice.id)

      return { data: cancelledInvoice!.serialize() }
    } catch (error) {
      return handleHttpError(error, response)
    }
  }

  private async findWithRelations(id: string | number) {
    return Invoice.query()
      .where('id', id)
      .preload('client')
      .preload('items', (itemsQuery) => itemsQuery.orderBy('sort_order', 'asc'))
      .first()
  }
}
