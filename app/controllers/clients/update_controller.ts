import Client from '#models/client'
import type { HttpContext } from '@adonisjs/core/http'
import { updateClientValidator } from '#validators/clients'

export default class UpdateController {
  public async handle({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(updateClientValidator)
    const client = await Client.findOrFail(params.id)

    client.merge(payload)
    await client.save()

    return response.ok(client)
  }
}
