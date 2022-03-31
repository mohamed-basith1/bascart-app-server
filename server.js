const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()
const userRouter = require('./router/userrouter')
const cartRouter = require('./router/cartrouter')
const checkoutRouter = require('./router/stripe')
require('dotenv').config()
const cors = require('cors')

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.use('/user', userRouter)
app.use('/cart', cartRouter)
app.use('/checkout', checkoutRouter)

mongoose.connect(process.env.MONGO_CONNECTION, (err) => {
  if (err) {
    console.log('problem in db connection')
  } else {
    console.log('DB is connected')
  }
})
app.listen(process.env.PORT, () => {
  console.log('Server is connected')
})
