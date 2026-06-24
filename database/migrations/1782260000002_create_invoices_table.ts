import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'invoices'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('invoice_number_string').nullable()
      table.integer('invoice_number').nullable()
      table.integer('invoice_year').nullable()
      table
        .integer('client_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('clients')
        .onDelete('RESTRICT')
      table.date('issue_date').notNullable()
      table.date('service_date').nullable()
      table.string('payment_method').notNullable().defaultTo('Überweisung')
      table.integer('payment_due_days').notNullable().defaultTo(7)
      table.enu('status', ['draft', 'issued', 'paid', 'cancelled']).notNullable().defaultTo('draft')
      table.string('currency', 3).notNullable().defaultTo('EUR')
      table.integer('total_amount').notNullable().defaultTo(0)
      table.string('pdf_path').nullable()
      table.timestamp('issued_at').nullable()
      table.timestamp('paid_at').nullable()
      table.timestamp('cancelled_at').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.unique(['invoice_year', 'invoice_number'])
      table.index(['client_id'])
      table.index(['status'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
