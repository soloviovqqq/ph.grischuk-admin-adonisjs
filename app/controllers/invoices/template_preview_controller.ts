import { DateTime } from 'luxon'
import type Client from '#models/client'
import type Invoice from '#models/invoice'
import type InvoiceItem from '#models/invoice_item'
import type { HttpContext } from '@adonisjs/core/http'
import { renderInvoiceTemplate } from '#templates/invoice_template'

export default class TemplatePreviewController {
  public async handle({ response }: HttpContext) {
    const issuedAt = DateTime.fromISO('2026-06-25')
    const invoice = {
      number: 24,
      year: 2026,
      paymentMethod: 'bank_transfer',
      totalAmount: 55000,
      issuedAt,
      createdAt: issuedAt,
    } as Invoice

    const client = {
      name: '[Kundenname / Firma]',
      address: '[Adresse]',
      zip: '[PLZ,',
      city: 'Ort]',
      country: '',
      email: '[kunde@example.com]',
    } as Client

    const items = [
      {
        description: 'Fotoshooting - 3 Stunden',
        quantity: 3,
        price: 15000,
        totalPrice: 45000,
      },
      {
        description: 'Transportkosten',
        quantity: 1,
        price: 10000,
        totalPrice: 10000,
      },
    ] as InvoiceItem[]

    const html = renderInvoiceTemplate({
      invoice,
      client,
      settings: null,
      items,
    })

    response.header('content-type', 'text/html; charset=utf-8')
    return response.send(html)
  }
}
