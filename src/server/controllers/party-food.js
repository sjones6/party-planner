const Validator = require('Validator')

const validations = {
  food: 'required|max:244',
}

module.exports = PartyFood => ({
  async post(req, res, next) {
    const v = Validator.make(req.body, validations)

    // validation safeguard
    if (v.fails()) {
      res.status(400).json(v.getErrors())
      return
    }

    try {
      const food = await PartyFood.create({ food: req.body.food, user: req.user._id })
      res.json({ id: food._id })
    } catch (err) {
      res.status(500).json({ error: 'failed to create food' })
    }
  },
  async put(req, res, next) {
    try {
      const food = await PartyFood.findOneAndUpdate(
        { _id: req.params.food, user: req.user._id },
        { food: req.body.food }
      ).exec()
      res.json({
        id: req.params.food,
      })
    } catch (err) {
      res.status(500).send('ERROR')
    }
  },
  async index(req, res, next) {
    try {
      const foods = await PartyFood.find({ user: req.user._id })
        .lean()
        .exec()
      res.json(foods || [])
    } catch (err) {
      res.status(500).send('ERROR')
    }
  },
  async get(req, res, next) {
    try {
      const food = await PartyFood.findOne({ _id: req.params.food, user: req.user._id })
        .lean()
        .exec()
      food ? res.json(food) : res.status(404).send('LOST')
    } catch (err) {
      res.status(500).send('ERROR')
    }
  },
  async del(req, res, next) {
    if (!req.params.food) {
      res.status(400).send('ERROR')
      return
    }

    try {
      const u = await PartyFood.findOneAndRemove({
        _id: req.params.food,
        user: req.user._id,
      }).exec()
      res.json({
        id: req.params.food,
      })
    } catch (err) {
      res.status(500).send('ERROR')
    }
  },
})
