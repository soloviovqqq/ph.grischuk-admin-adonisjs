import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'invoice_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('invoice_id').unsigned().references('invoices.id').onDelete('CASCADE')
      table.text('description').notNullable()
      table.integer('quantity').notNullable()
      table.integer('price').notNullable()
      table.integer('total').notNullable()
      table.integer('sort_order').notNullable().defaultTo(0)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.index(['invoice_id', 'sort_order'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
