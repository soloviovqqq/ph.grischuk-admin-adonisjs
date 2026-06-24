import Client from '#models/client'
import Invoice from '#models/invoice'
import type { HttpContext } from '@adonisjs/core/http'

export default class DestroyController {
  public async handle({ params, response }: HttpContext) {
    const client = await Client.findOrFail(params.id)
    const invoice = await Invoice.query().where('client_id', client.id).first()

    if (invoice) {
      return response.status(409)
    }

    await client.delete()
    return response.noContent()
  }
}
