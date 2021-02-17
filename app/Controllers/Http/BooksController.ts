import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import Book from 'App/Models/Book'
import Venues from 'App/Models/Venues'

export default class BooksController {
  public async book({ params, auth, request, response }:HttpContextContract) {
    const user = auth.user
    const data = await Venues.findOrFail(params.id)

    // jika role bukan pemain
    if(user?.role !== 'pemain') return response.status(400).json({message: 'forbidden'})
    // jika id venue tidak ada dalam daftar
    if(!data) return response.status(400).json({message: `${params.id} tidak ada dalam daftar venue`})

    const validator = {
      schema: schema.create({
        duration: schema.number([
          rules.required()
        ]),
        start: schema.string({}, [
          rules.required()
        ]),
        play_date: schema.string({}, [
          rules.required()
        ]),
        total_players: schema.number([
          rules.required(),
          rules.range(2,20)
        ]),
      })
    }
    const validated = await request.validate(validator)

    await Database.insertQuery().table('books')
      .insert({
        user_id: user.id,
        venue_id: params.id,
        duration: validated.duration,
        start: validated.start,
        play_date: validated.play_date,
        total_players: validated.total_players,
      })
    const newBook = await Database.query().select('*').from('books').where('user_id', user.id)

    return response.status(200).json({message: 'booked success', data: newBook});
  }

  public async index({ response }:HttpContextContract) {
    const data = await Book.all()

    return response.status(200).json({message : 'succes', data: data})
  }
}
