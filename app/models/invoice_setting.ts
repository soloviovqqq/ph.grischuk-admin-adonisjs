import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class InvoiceSetting extends BaseModel {
  static table = 'invoice_settings'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare businessName: string

  @column()
  declare addressLine1: string

  @column()
  declare addressLine2: string | null

  @column()
  declare zip: string

  @column()
  declare city: string

  @column()
  declare country: string

  @column()
  declare phone: string | null

  @column()
  declare email: string

  @column()
  declare taxNumber: string | null

  @column()
  declare gisaNumber: string | null

  @column()
  declare iban: string

  @column()
  declare bic: string

  @column()
  declare bankAccountName: string

  @column()
  declare bankName: string

  @column()
  declare smallBusinessText: string

  @column()
  declare defaultPaymentDueDays: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
