import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'invoice_settings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('business_name').notNullable()
      table.string('address_line_1').notNullable()
      table.string('address_line_2').nullable()
      table.string('zip').notNullable()
      table.string('city').notNullable()
      table.string('country').notNullable()
      table.string('phone').nullable()
      table.string('email', 254).notNullable()
      table.string('tax_number').nullable()
      table.string('gisa_number').nullable()
      table.string('iban').notNullable()
      table.string('bic').notNullable()
      table.string('bank_account_name').notNullable()
      table.string('bank_name').notNullable()
      table
        .text('small_business_text')
        .notNullable()
        .defaultTo('Umsatzsteuerbefreiter Kleinunternehmer gemäß §6(1)27 UStG')
      table.integer('default_payment_due_days').notNullable().defaultTo(7)

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
