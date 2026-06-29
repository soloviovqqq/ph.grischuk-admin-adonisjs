import Client from '#models/client'
import type { HttpContext } from '@adonisjs/core/http'

export default class ListController {
  public async handle({ response }: HttpContext) {
    const clients = await Client.query()
      .withAggregate('invoices', (query) => {
        query.sum('total').as('total')
      })
      .orderBy('createdAt', 'desc')

    return response.ok(
      clients.map((client) => ({
        ...client.serialize(),
        total: Number(client.$extras.total ?? 0),
      }))
    )
  }
}
