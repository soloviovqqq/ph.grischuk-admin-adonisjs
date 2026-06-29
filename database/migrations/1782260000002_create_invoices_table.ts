import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'invoices'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('number').notNullable()
      table.integer('year').notNullable()
      table.integer('client_id').unsigned().references('clients.id').onDelete('RESTRICT')
      table.string('payment_method').notNullable()
      table.integer('total').notNullable().defaultTo(0)
      table.string('pdf_path').nullable()
      table.integer('status').nullable().defaultTo(0)
      table.timestamp('issued_at').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.unique(['number', 'year'])
      table.index(['client_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
