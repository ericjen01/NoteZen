const bcrypt = require('bcrypt')
const User = require('../models/user')
const usersRouter = require('express').Router()

usersRouter.get('/', async (req, res) => {
    const users = await User.find({})
    .populate(
      'notes', {title: 1, author: 1, url: 1}
    )
    res.json(users)
})

usersRouter.post('/', async(req, res) => {
  console.log('controllers>users>req')
    const {email, password} = req.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
      passwordHash,
      email: email,
      username: email.substring(0, email.indexOf('@')),
    })
    const savedUser = await user.save()
    res.status(201).json(savedUser)
})

module.exports = usersRouter