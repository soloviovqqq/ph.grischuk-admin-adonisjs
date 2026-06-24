import type Invoice from '#models/invoice'
import InvoiceItem from '#models/invoice_item'
import type { InvoiceItemPayload } from '#validators/invoice'
import type { TransactionClientContract } from '@adonisjs/lucid/types/database'

export default class InvoiceTotalService {
  static calculateFromPayload(items: InvoiceItemPayload[]) {
    return items.reduce((total, item) => total + item.totalPrice, 0)
  }

  static async recalculate(invoice: Invoice, trx?: TransactionClientContract) {
    const query = InvoiceItem.query()
      .where('invoice_id', invoice.id)
      .sum('total_price as totalAmount')

    if (trx) {
      query.useTransaction(trx)
    }

    const result = await query.first()
    const totalAmount = Number(result?.$extras.totalAmount ?? 0)

    invoice.totalAmount = totalAmount
    if (trx) {
      invoice.useTransaction(trx)
    }
    await invoice.save()

    return totalAmount
  }
}
