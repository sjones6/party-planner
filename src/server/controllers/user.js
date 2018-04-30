const passport = require('passport')
const Validator = require('Validator')
const birthdayValidation = require('common/validations/birthday.js')

const validations = {
  post: {
    email: 'required|email',
    password: 'required|min:6|max:244',
  },
  put: {
    birthday: 'required|date',
  },
}

module.exports = User => ({
  async post(req, res, next) {
    const v = Validator.make(req.body, validations.post)

    // validation safeguard
    if (v.fails()) {
      res.status(400).json(v.getErrors())
      return
    }

    // safe to proceed
    try {
      const dup = await User.findOne({ email: req.body.email }).exec()

      // a duplicate user was already found: error
      if (dup) {
        res.status(400).json({ email: ['Email already registered; do you want to login?'] })
      } else {
        // create the user
        const user = await User.create({
          email: req.body.email,
          password: req.body.password,
        })
        res.json({
          id: user._id,
        })
      }
    } catch (err) {
      res.status(500).json({ error: ['failed to create user'] })
    }
  },
  async put(req, res, next) {
    const v = Validator.make(req.body, validations.put)

    // validation safeguard
    if (v.fails()) {
      res.status(400).json(v.getErrors())
      return
    }

    // validate birthday separately
    const birthday = new Date(req.body.birthday)
    const errors = birthdayValidation(birthday)
    if (errors) {
      res.status(500).json(errors)
    } else {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.user._id },
          { birthday: req.body.birthday }
        )
        res.json({
          id: req.user._id,
        })
      } catch (err) {
        res.status(500).json({
          error: 'unable to save user',
        })
      }
    }
  },
  async get(req, res, next) {
    try {
      const user = await User.findOne({ _id: req.user._id })
        .lean()
        .exec()
      res.json({
        id: user._id,
        email: user.email,
        birthday: user.birthday,
      })
    } catch (err) {
      res.status(500).send('ERROR')
    }
  },
  async del(req, res, next) {
    try {
      const u = await User.findOneAndRemove({ _id: req.user._id }).exec()
      res.json({
        id: req.user._id,
      })
    } catch (err) {
      res.status(500).send('ERROR')
    }
  },
})
