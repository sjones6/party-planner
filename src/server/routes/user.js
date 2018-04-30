const { Router } = require('express')
const passport = require('passport')
const User = require('server/models/user.js')
const makeUserController = require('server/controllers/user.js')
const wireLoginStrategy = require('server/auth/login.js')

module.exports = app => {
  // prepare passport to authenticate requests
  wireLoginStrategy(passport, User)

  // Build out router and controller
  const router = Router()
  const controller = makeUserController(User)

  const authenticate = (req, res, next) => {
    !req.isAuthenticated() ? res.status(400).send('INVALID') : next()
  }

  // wire routes
  router.post('/', controller.post)
  router.put('/', authenticate, controller.put)
  router.get('/', authenticate, controller.get)
  router.delete('/', authenticate, controller.del)

  // Login requires special handling via passport
  router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({
      email: req.user.email,
      birthday: req.user.birthday,
    }) // success callback
  })

  // Logout the user (clears session cookie)
  router.get('/logout', authenticate, (req, res) => {
    req.logout()
    res.status(200).send('OK') // success callback
  })

  // wire routes up to application
  app.use('/user', router)
}
