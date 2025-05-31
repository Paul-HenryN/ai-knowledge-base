import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'documents'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('content')
      table.specificType('embedding', 'vector(1536)')
      table.string('name').notNullable().notNullable()
      table.string('url').notNullable().notNullable()
      table.string('type').notNullable().notNullable()
      table.string('status').notNullable().defaultTo('pending')
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
