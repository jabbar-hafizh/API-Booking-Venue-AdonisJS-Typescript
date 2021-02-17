import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public async login({request, response, auth}:HttpContextContract){
    const validator = {
      schema: schema.create({
        email: schema.string({}, [
          rules.required(),
          rules.email(),
        ]),
        password: schema.string({}, [
          rules.required(),
          rules.minLength(6)
        ])
      }),
      messages: {
        'email.required' : 'please fill your email',
        'email.unique': `{{ field }} ${request.input('email')} had been used`,
        'password.minLength': '{{ field }}  must be more than 6 characters',
        'password.required': 'please fill your password'
      }
    }

    const validated = await request.validate(validator)
    const data = await auth.use('api').attempt(validated.email, validated.password)

    return response.status(200).json({message : 'logged in', data})
  }

  public async register({request, response} : HttpContextContract) {
    const validator = {
      schema: schema.create({
        name: schema.string({}, [
          rules.required()
        ]),
        role: schema.string({}, [
          rules.required()
        ]),
        email: schema.string({}, [
          rules.required(),
          rules.email(),
          rules.unique({table: 'users', column: 'email'})
        ]),
        password: schema.string({}, [
          rules.required(),
          rules.minLength(6),
          rules.confirmed()
        ])
      }),
      messages: {
        'name.required' : 'please fill your {{ field }}',
        'role.required' : 'please fill the {{ field }}',
        'email.required' : 'please fill your email',
        'email.unique': `{{ field }} ${request.input('email')} had been used`,
        'password.minLength': '{{ field }}  must be more than 6 characters',
        'password.required': 'please fill your {{ field }}'
      }
    }

    const validated = await request.validate(validator)
    const newUser = new User()
    newUser.name = validated.name
    newUser.role = validated.role
    newUser.email = validated.email
    newUser.password = validated.password
    await newUser.save()
    const data = newUser

    return response.status(200).json({message : 'register success', data})
  }
}
