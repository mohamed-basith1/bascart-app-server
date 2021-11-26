const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,
  pincode: String,
  id: String,
})

module.exports = mongoose.model('users', userSchema)
