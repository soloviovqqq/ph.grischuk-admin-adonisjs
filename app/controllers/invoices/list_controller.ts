import Invoice from '#models/invoice'
import type { HttpContext } from '@adonisjs/core/http'

export default class ListController {
  public async handle({ response }: HttpContext) {
    const invoices = await Invoice.query().preload('client').orderBy('createdAt', 'desc')

    return response.ok(invoices)
  }
}
