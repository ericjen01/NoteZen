const Note = require('../models/note')
const User = require('../models/user')

const initialNotes = [
  {
    title: 'Note 01',
    content: 'HTML is fun',
    user: 'Test User',
    created: '2024', 
    edited: '2024'
  },
  {
    title: 'Note 02',
    content: 'Browser can execute only JavaScript',
    user: 'Test User',
    created: '2024',
    edited: '2024'
  }
]

const nonExistingId = async () => {
  const note = new Note({ 
    title: 'willremovethissoon', 
    content: 'willremovethissoon',
    user: 'willremovethissoon',
    created: 'willremovethissoon',
    edited: 'willremovethissoon'
  })
  await note.save()
  await note.deleteOne()
  return note._id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

module.exports = {
  initialNotes, nonExistingId, notesInDb, usersInDb
}