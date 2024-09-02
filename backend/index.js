const database = require('./db.json')
const Note = require('./models/note')
const { v1: uuid } = require('uuid')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("method-:method, status-:status, url-:url, body-:body"));

morgan.token("body", (req) => JSON.stringify(req.body));

const notes = database.notes

app.get('/', (req, res) => {
  res.send('<h1>to access the notes, please go to api/notes</h1>')
}) 

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id
  const note = notes.find(n => n.id === id)
  res.json(note)
})

app.post('/api/notes', (req, res) => {
  const body = req.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    id: uuid(),
    title: body.title,
    content: body.content,
    created: new Date(),
    edited: body.edited || new Date()
  }

  console.log('new note: ', note)
  //notes = notes.concat(note)
  res.json(note)
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const notes = notes.filter(n => n.id !== id)
  res.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})