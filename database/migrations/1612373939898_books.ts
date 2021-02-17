import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Books extends BaseSchema {
  protected tableName = 'books'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('venue_id').unsigned()
      table.foreign('venue_id').references('id').inTable('venues').onDelete('cascade')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('id').inTable('users').onDelete('cascade')
      table.integer('duration').defaultTo(1)
      table.time('start')
      table.date('play_date')
      table.integer('total_players')
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
