const mongoose = require('mongoose')

var partyFoodSchema = mongoose.Schema({
  food: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

module.exports = mongoose.models.PartyFood || mongoose.model('PartyFood', partyFoodSchema)
