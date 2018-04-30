const { Router } = require('express')
const isAuthenticated = require('server/middleware/is-authenticated.js')
const asyncCompat = require('server/middleware/async-compat.js')
const makeRecommendationController = require('server/controllers/recommendations.js')
const PartyFood = require('server/models/party-food.js')

module.exports = app => {
  // Build out router and controller
  const router = Router()
  const controller = makeRecommendationController(PartyFood)

  // All routes require authentication
  router.use(isAuthenticated)

  // wire routes
  router.get('/:food/recommendations', asyncCompat(controller.get))

  // wire routes up to application
  app.use('/food', router)
}
