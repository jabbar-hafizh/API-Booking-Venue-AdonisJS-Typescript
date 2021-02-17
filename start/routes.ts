/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})




Route.group(() => {
  Route.post('/login', 'AuthController.login').as('login')
  Route.post('/register', 'AuthController.register').as('register')
  Route.resource('/venues', 'VenuesController').middleware['auth']
  Route.resource('/categoryvenues', 'CategoryVenuesController').middleware['auth']

  Route.group(() => {
    Route.post(':id/book', 'BooksController.book')
    Route.get('/book/bookings', 'BooksController.index')
  }).prefix('venues').middleware('auth')
}).prefix('api/v1')
