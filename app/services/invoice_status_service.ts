import Invoice from '#models/invoice'
import InvoiceNumberService from '#services/invoice_number_service'
import HttpError from '#services/http_error'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

const UNIQUE_CONSTRAINT_CODES = new Set(['23505', 'SQLITE_CONSTRAINT', 'SQLITE_CONSTRAINT_UNIQUE'])

function isUniqueConstraintError(error: unknown) {
  const code = (error as { code?: string })?.code
  const message = (error as { message?: string })?.message ?? ''

  return Boolean(
    (code && UNIQUE_CONSTRAINT_CODES.has(code)) ||
    message.includes('UNIQUE constraint failed') ||
    message.includes('duplicate key value')
  )
}

export default class InvoiceStatusService {
  static async issue(invoiceId: number) {
    return this.ensureIssued(invoiceId)
  }

  static async ensureIssued(invoiceId: number) {
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        return await db.transaction(async (trx) => {
          const invoice = await Invoice.query({ client: trx })
            .where('id', invoiceId)
            .preload('client')
            .preload('items')
            .first()

          if (!invoice) {
            throw new HttpError(404, 'Invoice not found')
          }

          if (invoice.status === 'cancelled') {
            throw new HttpError(409, 'Cancelled invoices cannot be issued or regenerated')
          }

          if (!invoice.client) {
            throw new HttpError(422, 'Invoice must have a client before PDF generation')
          }

          if (invoice.items.length === 0) {
            throw new HttpError(422, 'Invoice must have at least one item before PDF generation')
          }

          if (invoice.status === 'issued' || invoice.status === 'paid') {
            return invoice
          }

          if (invoice.status !== 'draft') {
            throw new HttpError(409, `Invoice with status "${invoice.status}" cannot be issued`)
          }

          await InvoiceNumberService.assign(invoice, trx)
          invoice.status = 'issued'
          invoice.issuedAt = invoice.issuedAt ?? DateTime.now()
          invoice.useTransaction(trx)
          await invoice.save()

          return invoice
        })
      } catch (error) {
        if (attempt < 3 && isUniqueConstraintError(error)) {
          continue
        }
        throw error
      }
    }

    throw new HttpError(409, 'Could not assign an invoice number, please retry')
  }

  static async markPaid(invoiceId: number) {
    const invoice = await Invoice.find(invoiceId)

    if (!invoice) {
      throw new HttpError(404, 'Invoice not found')
    }

    if (invoice.status === 'draft') {
      throw new HttpError(409, 'Draft invoices must be issued before they can be marked as paid')
    }

    if (invoice.status === 'cancelled') {
      throw new HttpError(409, 'Cancelled invoices cannot be marked as paid')
    }

    if (invoice.status === 'paid') {
      return invoice
    }

    invoice.status = 'paid'
    invoice.paidAt = invoice.paidAt ?? DateTime.now()
    await invoice.save()

    return invoice
  }

  static async cancel(invoiceId: number) {
    const invoice = await Invoice.find(invoiceId)

    if (!invoice) {
      throw new HttpError(404, 'Invoice not found')
    }

    if (invoice.status === 'paid') {
      throw new HttpError(409, 'Paid invoices cannot be cancelled')
    }

    if (invoice.status === 'cancelled') {
      return invoice
    }

    invoice.status = 'cancelled'
    invoice.cancelledAt = invoice.cancelledAt ?? DateTime.now()
    await invoice.save()

    return invoice
  }
}
