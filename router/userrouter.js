const router = require('express').Router()
const user = require('../model/userschema')
const bcrypt = require('bcryptjs')
const token = require('jsonwebtoken')
require('dotenv').config()

//get name for nav bar
router.get('/findname/:email', async (req, res) => {
  try {
    console.log(req.params.email)
    const getname = await user
      .findOne({ email: req.params.email })
      .select(['name', 'email', 'address', 'pincode', '_id'])
    res.status(200).json(getname)
  } catch (error) {
    res.status(500).json(error)
  }
})

//register api
router.post('/register', async (req, res) => {
  try {
    const checking = await user.findOne({ email: req.body.email })
    if (checking) {
      res.status(200).json('email is already exits')
    } else {
      const hash = await bcrypt.hash(req.body.password, 10)
      const userRouter = await user({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        address: req.body.address,
        pincode: req.body.pincode,
        id: req.body.id,
      })
      const saveuser = await userRouter.save()
      res.status(200).json('succesfully submited')
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

router.post('/signin', async (req, res) => {
  const usercheck = await user.findOne({ email: req.body.email })
  if (!usercheck) {
    res.status(200).json('user is not found ')
  }
  const checkpassword = await bcrypt.compare(
    req.body.password,
    usercheck.password,
  )
  if (!checkpassword) {
    res.status(200).json('check your password')
  }

  const givetoken = token.sign(
    { email: usercheck.email, name: usercheck.name },
    'summa',
  )
  res.status(200).json(givetoken)
})

router.put('/:id', async (req, res) => {
  try {
    const updateaddress = await user.updateOne(
      { email: req.params.id },
      { $set: { address: req.body.address, pincode: req.body.pincode } },
    )
    res.status(200).json('Address success updated')
  } catch (error) {
    res.status(500).json(error)
  }
})
module.exports = router
