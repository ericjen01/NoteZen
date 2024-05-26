const { v1: uuid } = require('uuid')
const express = require('express')
const morgan = require('morgan')
const app = express()

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(express.json())
app.use(morgan("method-:method, status-:status, url-:url, body-:body"));

const notes = [
    {
      "id": 1,
      "title": "Write better code and become exceptional using ReactJs with these tips and tricks",
      "content": "1. Use React With TypeScriptLearning Typescript is a game-changer with profound productivity effects for your React applications. Te create-react app now comes with built-in support for typescript. 2. React fragments allow you to group a list of children without adding extra nodes to the DOM. This can be useful when you need to render a list of items without adding extra markup. Use fragments all the time to tidy up the DOM and improve readability. 3. Use of PropTypes PropTypes allow you to valicreated the props you pass to a component. Using PropTypes can help you catch errors early and make your code more maintainable. During development, React will log an error to inform you if any component is missing a necessary prop or receives the incorrect type for one of the props. To determine if the received data is valid or not, it exports a variety of validators.",
      "created": "9 Apr, 2024",
      "edited": "16 Mar, 2024"
    },
    {
      "id": 2,
      "title": "Newest Post Write better code and become exceptional using ReactJs with these tips and tricks",
      "content": "1. Use React With TypeScriptLearning Typescript is a game-changer with profound productivity effects for your React applications. Te create-react app now comes with built-in support for typescript. 2. React fragments allow you to group a list of children without adding extra nodes to the DOM. This can be useful when you need to render a list of items without adding extra markup. Use fragments all the time to tidy up the DOM and improve readability. 3. Use of PropTypes PropTypes allow you to valicreated the props you pass to a component. Using PropTypes can help you catch errors early and make your code more maintainable. During development, React will log an error to inform you if any component is missing a necessary prop or receives the incorrect type for one of the props. To determine if the received data is valid or not, it exports a variety of validators.",
      "created": "16 Mar, 2024",
      "edited": "08 Apr, 2024"
    },
    {
      "id": 3,
      "title": "Write better code and become exceptional using ReactJs with these tips and tricks",
      "content": "1. Use React With TypeScriptLearning Typescript is a game-changer with profound productivity effects for your React applications. Te create-react app now comes with built-in support for typescript. 2. React fragments allow you to group a list of children without adding extra nodes to the DOM. This can be useful when you need to render a list of items without adding extra markup. Use fragments all the time to tidy up the DOM and improve readability. 3. Use of PropTypes PropTypes allow you to validate the props you pass to a component. Using PropTypes can help you catch errors early and make your code more maintainable. During development, React will log an error to inform you if any component is missing a necessary prop or receives the incorrect type for one of the props. To determine if the received data is valid or not, it exports a variety of validators.",
      "created": "16 Mar, 2017",
      "edited": "16 Mar, 2017"
    },
    {
      "id": 4,
      "title": "kids loves mouse",
      "content": "test",
      "created": "16 Mar, 2015",
      "edited": "16 Mar, 2019"
    }
]

app.get('/', (req, res) => {
  res.send('<h1>to access the notes, please go to api/notes</h1>')
}) 

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
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
 
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
