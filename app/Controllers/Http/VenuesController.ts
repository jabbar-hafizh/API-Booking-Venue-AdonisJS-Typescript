import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import Venues from 'App/Models/Venues'

export default class VenuesController {
  public async store({request, response} : HttpContextContract) {
    const validator = {
      schema: schema.create({
        name: schema.string({}, [
          rules.required()
        ]),
        category_venue_id: schema.number([
          rules.required(),
          rules.unsigned()
        ])
      }),
      messages: {
        'name.required' : 'please fill your {{ field }}',
        'category_venue_id.required' : 'please fill the {{ field }}',
        'category_venue_id.unsigned' : '{{ field }} must be number'
      }
    }

    const validated = await request.validate(validator)
    const newVenue = new Venues()
    newVenue.name = validated.name
    newVenue.category_venue_id = validated.category_venue_id
    await newVenue.save()
    const data = newVenue

    return response.status(200).json({message : 'data saved', data})
  }

  public async index({ response }: HttpContextContract) {
    const data = await Venues.all()

    return response.status(200).json({message : 'succes', data})
  }

  public async show({ params, response }: HttpContextContract) {
    const data = await Venues.findOrFail(params.id)

    return response.status(200).json({message : 'succes', data})
  }

  public async update({ params, request, response }: HttpContextContract) {
    let newData = {
      name: request.input('name'),
      category_venue_id: request.input('category_venue_id')
    }

    const queryUpdate = await Database
    .from('venues')
    .where({id: params.id})
    .update({
      name: newData.name,
      category_venue_id: newData.category_venue_id
    })

    const data = await Venues.findOrFail(params.id)

    if(queryUpdate) {
      return response.status(200).json({200: 'OK', data_updated: data});
    } else {
      return response.status(400).json({message: 'not found'});
    }
  }
}
