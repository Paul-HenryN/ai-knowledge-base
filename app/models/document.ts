import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

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

  @column()
  declare userId: User['id']

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare lastViewedAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
