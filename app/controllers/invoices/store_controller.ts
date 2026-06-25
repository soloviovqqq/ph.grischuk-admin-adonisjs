import { DateTime } from 'luxon'
import Client from '#models/client'
import Invoice from '#models/invoice'
import InvoiceItem from '#models/invoice_item'
import type { HttpContext } from '@adonisjs/core/http'
import { createInvoiceValidator } from '#validators/invoice'

export default class StoreController {
  public async handle({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createInvoiceValidator)
    const client = await Client.findOrFail(payload.clientId)

    const lastInvoice = await Invoice.query().orderBy('number', 'desc').first()
    const invoice = await Invoice.create({
      number: lastInvoice ? lastInvoice.number + 1 : 1,
      year: new Date().getFullYear(),
      clientId: client.id,
      paymentMethod: 'bank_transfer',
      serviceAt: DateTime.now(),
      totalAmount: 0,
    })

    for (let i = 0; i < 5; i++) {}

    const items = payload.items.map((item, index) => ({
      invoiceId: invoice.id,
      description: item.description,
      quantity: item.quantity,
      price: item.price,
      totalPrice: item.quantity * item.price,
      sortOrder: index + 1,
    }))

    await InvoiceItem.createMany(items)
    invoice.totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0)
    await invoice.save()

    return response.created()
  }
}
