import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CategoryVenues extends BaseSchema {
  protected tableName = 'category_venues'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
