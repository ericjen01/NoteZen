const cypressTestingRouter = require('express').Router()
const Note = require('../models/note')
//const User = require('../models/user')

cypressTestingRouter.post('/reset', async (req, res) => {
  await Blog.deleteMany({})
  //await User.deleteMany({})

  res.status(204).end()
})

module.exports = cypressTestingRouter