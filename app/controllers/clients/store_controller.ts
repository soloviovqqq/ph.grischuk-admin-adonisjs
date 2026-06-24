import Client from '#models/client'
import type { HttpContext } from '@adonisjs/core/http'
import { createClientValidator } from '#validators/clients'

export default class StoreController {
  public async handle({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createClientValidator)
    const client = await Client.create(payload)

    return response.created(client)
  }
}
