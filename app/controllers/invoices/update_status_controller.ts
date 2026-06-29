import Invoice from '#models/invoice'
import type { HttpContext } from '@adonisjs/core/http'
import { updateInvoiceStatusValidator } from '#validators/invoice'

export default class UpdateStatusController {
  public async handle({ params, response, request }: HttpContext) {
    const { status } = await request.validateUsing(updateInvoiceStatusValidator)
    await Invoice.query().update('status', status).where('id', params.id)

    return response.ok({})
  }
}
