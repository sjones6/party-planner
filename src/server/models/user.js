const mongoose = require('mongoose')

var userSchema = mongoose.Schema({
  email: String,
  password: String,
  birthday: Date,
})

module.exports = mongoose.models.User || mongoose.model('User', userSchema)
