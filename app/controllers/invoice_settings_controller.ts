import InvoiceSetting from '#models/invoice_setting'
import HttpError, { isHttpError } from '#services/http_error'
import { invoiceSettingsValidator } from '#validators/invoice'
import type { HttpContext } from '@adonisjs/core/http'

const DEFAULT_SMALL_BUSINESS_TEXT = 'Umsatzsteuerbefreiter Kleinunternehmer gemäß §6(1)27 UStG'

const REQUIRED_ON_CREATE = [
  'businessName',
  'addressLine1',
  'zip',
  'city',
  'country',
  'email',
  'iban',
  'bic',
  'bankAccountName',
  'bankName',
] as const

function handleHttpError(error: unknown, response: HttpContext['response']) {
  if (isHttpError(error)) {
    return response.status(error.status).send({ message: error.message })
  }

  throw error
}

export default class InvoiceSettingsController {
  async show({ response }: HttpContext) {
    const settings = await InvoiceSetting.first()
    if (!settings) {
      return response.status(404).send({ message: 'Invoice settings are not configured yet' })
    }

    return { data: settings.serialize() }
  }

  async update({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(invoiceSettingsValidator)
      const settings = await InvoiceSetting.first()

      if (!settings) {
        const missingFields = REQUIRED_ON_CREATE.filter((field) => {
          const value = payload[field]
          return value === undefined || value === null || value === ''
        })

        if (missingFields.length > 0) {
          throw new HttpError(422, `Missing required invoice settings: ${missingFields.join(', ')}`)
        }

        const created = await InvoiceSetting.create({
          ...payload,
          smallBusinessText: payload.smallBusinessText ?? DEFAULT_SMALL_BUSINESS_TEXT,
          defaultPaymentDueDays: payload.defaultPaymentDueDays ?? 7,
        })

        response.status(201)
        return { data: created.serialize() }
      }

      settings.merge(payload)
      await settings.save()

      return { data: settings.serialize() }
    } catch (error) {
      return handleHttpError(error, response)
    }
  }
}
