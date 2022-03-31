const router = require('express').Router()

const cart = require('../model/cartschema')
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_KEY)

router.post('/', async (req, res) => {
  //   const totalamount = await cart.findOne({ email: req.body.email })
  const id = req.body.tokenid
  //   console.log(totalamount.totalprice)
  console.log(id)
  console.log('checkout nadanthurukku')
  console.log(process.env.STRIPE_KEY)
  const paymant = await stripe.charges
    .create({
      source: req.body.tokenid,
      amount: 2000,
      currency: 'usd',
    })
    .then(() => {
      console.log('succesfully payment submitedd')
      res.status(200).json('succesfully payment submited')
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
    })
  if (paymant) {
    console.log('payment function working')
  }
})

module.exports = router
