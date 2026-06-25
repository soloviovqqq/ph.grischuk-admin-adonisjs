import Invoice from '#models/invoice'
import type { HttpContext } from '@adonisjs/core/http'

export default class ListController {
  public async handle({ response }: HttpContext) {
    const invoices = await Invoice.query().orderBy('createdAt', 'asc')

    return response.ok(invoices)
  }
}
