import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Venue extends BaseSchema {
  protected tableName = 'venues'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.integer('category_venue_id').unsigned()
      table.foreign('category_venue_id').references('id').inTable('category_venues').onDelete('cascade')
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
