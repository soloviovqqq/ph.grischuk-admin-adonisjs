import Invoice from '#models/invoice'
import type { HttpContext } from '@adonisjs/core/http'
import InvoicePdfService from '#services/invoice_pdf_service'

export default class GeneratePdfController {
  public async handle({ params, response }: HttpContext) {
    const invoice = await Invoice.query()
      .where('id', params.id)
      .preload('client')
      .preload('items', (itemsQuery) => itemsQuery.orderBy('sort_order', 'asc'))
      .firstOrFail()

    await InvoicePdfService.generateAndPersist(invoice)

    return response.ok(invoice)
  }
}
