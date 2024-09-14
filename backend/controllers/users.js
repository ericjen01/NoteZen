const bcrypt = require('bcrypt')
const User = require('../models/user')
const usersRouter = require('express').Router()

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', { 
		title: 1,
		author: 1,
		url: 1, 
    })
    res.json(users)
})

usersRouter.post('/', async(req, res) => {
    const { username, name, password} = req.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
        username: username,
        name: name,
        passwordHash
    })
    const savedUser = await user.save()
    res.status(201).json(savedUser)
})

module.exports = usersRouter