import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'messages'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('text').notNullable()
      table.string('type')
      table.integer('chat_id')
      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.foreign('chat_id').references('id').inTable('chats')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
