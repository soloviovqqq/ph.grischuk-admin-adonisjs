import Invoice from '#models/invoice'
import type { TransactionClientContract } from '@adonisjs/lucid/types/database'
import { DateTime } from 'luxon'

export type GeneratedInvoiceNumber = {
  number: number
  year: number
}

export default class InvoiceNumberService {
  static async getNextNumber(year: number, trx: TransactionClientContract) {
    const latest = await Invoice.query({ client: trx })
      .where('year', year)
      .max('number as max_number')
      .first()

    return Number(latest?.$extras.max_number ?? 0) + 1
  }

  static async generateInvoiceNumber(
    year: number,
    trx: TransactionClientContract
  ): Promise<GeneratedInvoiceNumber> {
    const number = await this.getNextNumber(year, trx)

    return {
      number,
      year,
    }
  }

  static async assign(invoice: Invoice, trx: TransactionClientContract) {
    if (invoice.number && invoice.year) {
      return invoice
    }

    const generated = await this.generateInvoiceNumber(DateTime.now().year, trx)

    invoice.number = generated.number
    invoice.year = generated.year

    return invoice
  }
}
