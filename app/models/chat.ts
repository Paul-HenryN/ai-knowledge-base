import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Message from '#models/message'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Chat extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @hasMany(() => Message)
  declare messages: HasMany<typeof Message>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
