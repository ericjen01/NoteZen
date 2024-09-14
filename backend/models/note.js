const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  note:{
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    created: {
      type: String,
      required: true,
    },
    edited: {
      type: String,
      required: true,
    },
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
