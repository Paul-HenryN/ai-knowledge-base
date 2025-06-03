import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Document extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare content: string

  @column({
    serialize: (value: number[]) => value,
    prepare: (value: number[]) => `[${value.join(',')}]`,
  })
  declare embedding: number[]

  @column()
  declare name: string

  @column()
  declare url: string

  @column()
  declare type: string

  @column()
  declare status: 'pending' | 'failed' | 'success'

  @column.dateTime({ autoCreate: true })
  declare lastViewedAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
