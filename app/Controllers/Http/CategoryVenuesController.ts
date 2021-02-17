import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import CategoryVenues from 'App/Models/CategoryVenues'

export default class CategoryVenuesController {
  public async store({request, response} : HttpContextContract) {
    const validator = {
      schema: schema.create({
        name: schema.string({}, [
          rules.required()
        ])
      }),
      messages: {
        'name.required' : 'please fill your {{ field }}',
      }
    }

    const validated = await request.validate(validator)
    const newCategoryVenue = new CategoryVenues()
    newCategoryVenue.name = validated.name
    await newCategoryVenue.save()
    const data = newCategoryVenue

    return response.status(200).json({message : 'data saved', data})
  }

  public async index({ response }: HttpContextContract) {
    const data = await CategoryVenues.all()
    console.log(data);

    return response.status(200).json({message : 'succes', data})
  }
}
