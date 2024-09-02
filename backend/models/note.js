//import uniqueValidator from 'mongoose-unique-validator'
//const uniqueValidator = require('mongoose-unique-validator')
const mongoose = require('mongoose')
require('dotenv').config()

const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const noteSchema = new mongoose.Schema({
  note:{
    id: {type: String,
        required: true,
        unique: true,
    },
    title: {type: String},
    content: {
      type: String,
      required: true,
      unique: true,
    },
    created: {type: String},
    edited: {type: String},
  }
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
//schema.plugin(uniqueValidator)

module.exports = mongoose.model('Note', noteSchema)
