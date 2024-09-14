const jwt = require('jsonwebtoken')
const { restart } = require('nodemon')
const User = require('../models/user')
const Note = require('../models/note')
const notesRouter = require('express').Router()

const getTokenFrom = req => {
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('bearer ')) {
      return authorization.replace('bearer ', '')
    }
    return null
}

notesRouter.get('/', async (req, res) => {
    const notes = await Note.find({})  
       res.json(notes)
})

notesRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id
    const blog = await Blog.findById(id)
    blog
    ? res.json(blog)
    : res.status(404).end()
})

notesRouter.post('/', async (req, res, next) => {

    let token
    const body = req.body
    const { title, url, likes, author } = req.body;

    (req.user)
        ? (token = req.headers.authorization.split(' ')[1])
        : res.status(401).json({ error: 'token missing or invalid' });

    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }
    const decodedUser = await User.findById(decodedToken.id)    
    if(!(decodedUser && title && url)){
        return res.status(400).json({error: 'title, token and url required'})
    }
    console.log("....blog: ", decodedUser.username)
    console.log("....blog: ", decodedUser._id)

const note = new Note({
        title: body.title,
        content: body.content,
        date: new Date().toISOString().slice(0,10),
        edited:  new Date().toISOString().slice(0,10),
        user:{
            userId: decodedUser._id,
            username: decodedUser.username
        }
    })
    
    const savedBlog = await blog.save()
    decodedUser.notes = decodedUser.notes.concat(savedBlog._id)
    await decodedUser.save()
    res.status(201).json(savedBlog)
})

notesRouter.put("/:id", async (req, res, next) => {
    console.log("backend updating")
    const { title, content, user, created, edited } = req.body;
    const id = req.params.id;
    const newNote = new Note({title, content, user, created, edited})
    const savedBlog = await Note.findByIdAndUpdate(id, blog, {new: true,})
    res.status(200).json(savedBlog)
  });

notesRouter.delete('/:id', async (req, res, next) => {
    const id = req.params.id
    const user = req.user
    const blog = await Note.findByIdAndRemove(id)
    res.status(204).end()
})

module.exports = notesRouter