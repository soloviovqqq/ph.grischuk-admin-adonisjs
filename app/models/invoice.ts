import { DateTime } from 'luxon'
import Client from '#models/client'
import InvoiceItem from '#models/invoice_item'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'

export type InvoicePaymentMethod = 'bank_transfer' | 'cash'

export default class Invoice extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare number: number

  @column()
  declare year: number

  @column()
  declare clientId: number

  @column()
  declare paymentMethod: InvoicePaymentMethod

  @column()
  declare total: number

  @column()
  declare pdfPath: string | null

  @column.date()
  declare issuedAt: DateTime | null

  @column.date()
  declare serviceAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>

  @hasMany(() => InvoiceItem)
  declare items: HasMany<typeof InvoiceItem>
}
