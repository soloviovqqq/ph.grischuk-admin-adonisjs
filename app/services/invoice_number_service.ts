import Invoice from '#models/invoice'
import type { TransactionClientContract } from '@adonisjs/lucid/types/database'

export type GeneratedInvoiceNumber = {
  invoiceNumber: number
  invoiceYear: number
  invoiceNumberString: string
}

export default class InvoiceNumberService {
  static async getNextNumber(year: number, trx: TransactionClientContract) {
    const latest = await Invoice.query({ client: trx })
      .where('invoice_year', year)
      .whereNotNull('invoice_number')
      .max('invoice_number as max_number')
      .first()

    return Number(latest?.$extras.max_number ?? 0) + 1
  }

  static async generateInvoiceNumber(
    year: number,
    trx: TransactionClientContract
  ): Promise<GeneratedInvoiceNumber> {
    const invoiceNumber = await this.getNextNumber(year, trx)

    return {
      invoiceNumber,
      invoiceYear: year,
      invoiceNumberString: `${invoiceNumber}/${year}`,
    }
  }

  static async assign(invoice: Invoice, trx: TransactionClientContract) {
    if (invoice.invoiceNumber && invoice.invoiceYear && invoice.invoiceNumberString) {
      return invoice
    }

    const generated = await this.generateInvoiceNumber(invoice.issueDate.year, trx)

    invoice.invoiceNumber = generated.invoiceNumber
    invoice.invoiceYear = generated.invoiceYear
    invoice.invoiceNumberString = generated.invoiceNumberString

    return invoice
  }
}
