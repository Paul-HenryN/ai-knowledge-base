import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'documents'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('name').notNullable().defaultTo('')
      table.string('url').notNullable().defaultTo('')
      table.string('type').notNullable().defaultTo('pdf')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('name')
      table.dropColumn('url')
      table.dropColumn('type')
    })
  }
}
