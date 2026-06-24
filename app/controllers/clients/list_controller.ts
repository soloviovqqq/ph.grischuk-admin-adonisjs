import Client from '#models/client'
import type { HttpContext } from '@adonisjs/core/http'

export default class ListController {
  public async handle({ response }: HttpContext) {
    const clients = await Client.query().orderBy('createdAt', 'asc')

    return response.ok(clients)
  }
}
