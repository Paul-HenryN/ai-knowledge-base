import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'documents'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('content')
      table.specificType('embedding', 'vector(1536)')
      table.string('name').notNullable()
      table.string('url').notNullable()
      table.string('type').notNullable()
      table.integer('user_id').notNullable()
      table.string('status').notNullable().defaultTo('pending')
      table.dateTime('last_viewed_at').notNullable()
      table.timestamps(true, true)

      table.foreign('user_id').references('id').inTable('users')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
