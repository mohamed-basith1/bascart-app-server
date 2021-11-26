const router = require('express').Router()
const cart = require('../model/cartschema')

//get cart product by email
router.get('/getcart/:email', async (req, res) => {
  try {
    const cartget = await cart.find({ email: req.params.email })
    res.status(200).json(cartget)
  } catch (error) {
    res.status(500).json(error)
  }
})

//post cart product br email
router.post('/', async (req, res) => {
  //check coming product already in cart
  const check = await cart.findOne({ id: req.body.id })

  //if product already in cart
  if (check) {
    const increment = req.body.quantity
    console.log(increment)
    console.log('ethu quentijfkhghf check')
    const overwrite = await cart.findOneAndUpdate(
      { id: req.body.id },
      { $inc: { quantity: increment } },

      async (err, data) => {
        if (err) {
          res.status(500).json('not updata')
        } else {
          const findquantity = await cart.findOne({ id: req.body.id })

          const quantityty = findquantity.quantity
          const pricess = findquantity.price
          console.log(quantityty)
          const final = quantityty * pricess
          console.log(final)
          // const priceupdate = await cart.findOneAndUpdate(
          //   { id: req.body.id },
          //   { $mul: { price: findquantity.quantity } },
          //   (err, data) => {
          //     if (err) {
          //       console.log(err)
          //     } else {
          //       console.log(data)
          //       console.log(' akakkakskasksks')
          //     }
          //   },
          // )
          const updateprice = await cart.updateOne(
            { id: req.body.id },
            {
              totalprice: final,
            },
          )
          console.log(updateprice)

          res.status(200).json(data)
        }
      },
    )
  } else {
    const okok = req.body.price * req.body.quantity
    console.log(okok)
    const cartget = await cart({
      image: req.body.image,
      categories: req.body.categories,
      email: req.body.email,
      products: req.body.products,
      price: req.body.price,
      id: req.body.id,
      quantity: req.body.quantity,
      totalprice: okok,
    })

    const savecart = await cartget.save()
    res.status(200).json(savecart)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const delcart = await cart.remove({ id: req.params.id })
    res.status(200).json('product remove')
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
