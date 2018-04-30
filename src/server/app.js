require('dotenv').config()

const fs = require('fs')
const { join } = require('path')
const express = require('express')
const session = require('express-session')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const mongoose = require('mongoose')

const root = process.cwd()

// connect mongo
mongoose.connect(
  `${process.env.MONGO_URL || 'mongodb://localhost'}/${process.env.MONGO_DB || 'party-planner'}`
)

// Application container
const app = express()

// Initialize global middlewares
app.use(logger('dev'))
app.set('view engine', 'html')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(join(process.cwd(), 'dist')))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
)
app.use(passport.initialize())
app.use(passport.session())

// grab language config
const languages = require(join(process.cwd(), 'i18n.conf.js'))

// redirect all unrecognized to /en-us/
app.get('/', (req, res) => res.redirect(301, '/en-us/'))
app.get(/(en-us|es-es)/, (req, res, next) => {
  if (req.params[0] in languages) {
    res.sendFile(join(root, 'dist', `index.${req.params[0]}.html`))
  } else {
    next()
  }
})

// Wire up the routes
fs.readdirSync(join(__dirname, 'routes')).forEach(fileName => {
  require(join(__dirname, 'routes', fileName))(app)
})

module.exports = app
