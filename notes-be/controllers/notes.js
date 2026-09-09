const notesRouter = require('express').Router()
const Note = require('../models/note')
const log = require('../utils/logger')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})

  response.json(notes)
})

notesRouter.get('/:id', async (request, response) => {
  const foundNote = await Note.findById(request.params.id)
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
  const note = new Note({
    content: request.body.content,
    important: request.body.important || false
  })
  const saved = await note.save()

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