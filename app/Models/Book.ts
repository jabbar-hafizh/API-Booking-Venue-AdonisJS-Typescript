import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Venues from './Venues'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public venue_id: number

  @column()
  public user_id: number

  @column()
  public duration: number

  @column()
  public start: string

  @column()
  public play_date: string

  @column()
  public total_players: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'user_id'
  })
  public user: BelongsTo<typeof User>

  @belongsTo(() => Venues, {
    foreignKey: 'venue_id'
  })
  public venues: BelongsTo<typeof Venues>

}
