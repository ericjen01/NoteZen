require('express-async-errors')
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const config = require('./utils/config.js')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use(cors())
app.use(express.json())
app.use(middleware.userExtractor)
app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(morgan("method-:method, status-:status, url-:url, body-:body"));

mongoose.set('strictQuery', false)
logger.info('connecting to', config.MONGO_URI)
morgan.token("body", (req) => JSON.stringify(req.body));

mongoose.connect(config.MONGO_URI)
.then(() => {
  logger.info('connected to MongoDB')
})
.catch((error) => {
  logger.error('error connecting to MongoDB:', error.message)
})

if (process.env.NODE_ENV === 'test') {
  console.log("connecting to testing data")
  const testingRouter = require('./controllers/cypressTesting.js')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.reqLogger(
    "method-:method, status-:status, url-:url, body-:body"
  )
);
//app.use(middleware.errorHandler)
//app.use(middleware.unknownEndpoint)

module.exports = app