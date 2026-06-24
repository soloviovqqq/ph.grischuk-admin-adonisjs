import Client from '#models/client'
import Invoice from '#models/invoice'
import HttpError, { isHttpError } from '#services/http_error'
import { createClientValidator, updateClientValidator } from '#validators/invoice'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

function handleHttpError(error: unknown, response: HttpContext['response']) {
  if (isHttpError(error)) {
    return response.status(error.status).send({ message: error.message })
  }

  throw error
}

export default class ClientsController {
  async index({}: HttpContext) {
    const clients = await Client.query().orderBy('name', 'asc')

    return { data: clients.map((client) => client.serialize()) }
  }

  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createClientValidator)
      const client = await Client.create(payload)

      response.status(201)
      return { data: client.serialize() }
    } catch (error) {
      return handleHttpError(error, response)
    }
  }

  async show({ params, response }: HttpContext) {
    const client = await Client.find(params.id)
    if (!client) {
      return response.status(404).send({ message: 'Client not found' })
    }

    return { data: client.serialize() }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(updateClientValidator)
      const client = await Client.find(params.id)

      if (!client) {
        throw new HttpError(404, 'Client not found')
      }

      client.merge(payload)
      await client.save()

      return { data: client.serialize() }
    } catch (error) {
      return handleHttpError(error, response)
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      await db.transaction(async (trx) => {
        const client = await Client.find(params.id, { client: trx })
        if (!client) {
          throw new HttpError(404, 'Client not found')
        }

        const usedInvoice = await Invoice.query({ client: trx })
          .where('client_id', client.id)
          .whereIn('status', ['issued', 'paid', 'cancelled'])
          .first()

        if (usedInvoice) {
          throw new HttpError(409, 'Client is used by an issued invoice and cannot be deleted')
        }

        await Invoice.query({ client: trx })
          .where('client_id', client.id)
          .where('status', 'draft')
          .delete()

        client.useTransaction(trx)
        await client.delete()
      })

      return response.noContent()
    } catch (error) {
      return handleHttpError(error, response)
    }
  }
}
