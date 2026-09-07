const notesRouter = require('express').Router()
const Note = require('../models/note')
const log = require('../utils/logger')

notesRouter.get('/', (request, response) => {
  Note.find({})
    .then(result => {
      response.json(result)
    })
    .catch(e => {
      log.error('find all error :', e)
      response.status(500).end()
    })
})

notesRouter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(e => {
      next(e)
    })
})

notesRouter.delete('/:id', (request, response) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch(e => {
      log.error('delete by id error :', e)
      response.status(500).end()
    })
})

notesRouter.post('/', (request, response, next) => {
  const note = new Note({
    content: request.body.content,
    important: request.body.important || false
  })
  note.save()
    .then(result => {
      log.error('note saved!')
      response.status(201).json(result)
    })
    .catch(e => next(e))
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