const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const log = require('../utils/logger')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 })

  response.json(notes)
})

notesRouter.get('/:id', async (request, response) => {
  const foundNote = await Note.findById(request.params.id).populate('user', { username: 1, name: 1 })
  if (foundNote) {
    response.json(foundNote)
  } else {
    response.status(404).end()
  }
})

notesRouter.delete('/:id', async (request, response) => {
  await Note.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

notesRouter.post('/', async (request, response) => {
  const userId = request.userId
  log.info(`user for note creation ${userId}`)
  const user = await User.findById(userId)
  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const note = new Note({
    content: request.body.content,
    important: request.body.important || false,
    user: user._id
  })
  const saved = await note.save()
  user.notes = user.notes.concat(saved._id)
  await user.save()

  log.info('note saved')
  response.status(201).json(saved)
})

notesRouter.put('/:id', (request, response) => {

  if (!request.body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  Note.findByIdAndUpdate(request.params.id, request.body)
    .then(found => {
      if (found) {
        response.status(200).json(found)
      }
      else {
        response.status(404).end()
      }
    })
    .catch(e => {
      log.error('findbyid error :', e)
      response.status(500).end()
    })
})

module.exports = notesRouter