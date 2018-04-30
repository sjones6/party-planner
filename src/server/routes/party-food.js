const { Router } = require('express')
const isAuthenticated = require('server/middleware/is-authenticated.js')
const asyncCompat = require('server/middleware/async-compat.js')
const PartyFood = require('server/models/party-food.js')
const makeFoodController = require('server/controllers/party-food.js')
const wireLoginStrategy = require('server/auth/login.js')

module.exports = app => {
  // Build out router and controller
  const router = Router()
  const controller = makeFoodController(PartyFood)

  // all routes should require an authenticated user
  router.use(isAuthenticated)

  // wire routes
  router.get('/', asyncCompat(controller.index))
  router.post('/', asyncCompat(controller.post))
  router.put('/:food', asyncCompat(controller.put))
  router.get('/:food', asyncCompat(controller.get))
  router.delete('/:food', asyncCompat(controller.del))

  // wire routes up to application
  app.use('/food', router)
}
