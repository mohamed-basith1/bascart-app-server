const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
  email: String,
  price: Number,
  products: String,
  id: String,
  categories: String,
  image: String,
  quantity: Number,
  totalprice: Number,
})

module.exports = mongoose.model('carts', cartSchema)
