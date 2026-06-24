import Client from '#models/client'
import InvoiceItem from '#models/invoice_item'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export type InvoiceStatus = 'draft' | 'issued' | 'paid' | 'cancelled'

export default class Invoice extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare invoiceNumberString: string | null

  @column()
  declare invoiceNumber: number | null

  @column()
  declare invoiceYear: number | null

  @column()
  declare clientId: number

  @column.date()
  declare issueDate: DateTime

  @column.date()
  declare serviceDate: DateTime | null

  @column()
  declare paymentMethod: string

  @column()
  declare paymentDueDays: number

  @column()
  declare status: InvoiceStatus

  @column()
  declare currency: string

  @column()
  declare totalAmount: number

  @column()
  declare pdfPath: string | null

  @column.dateTime()
  declare issuedAt: DateTime | null

  @column.dateTime()
  declare paidAt: DateTime | null

  @column.dateTime()
  declare cancelledAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>

  @hasMany(() => InvoiceItem)
  declare items: HasMany<typeof InvoiceItem>
}
