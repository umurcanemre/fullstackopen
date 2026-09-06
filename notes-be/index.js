require('dotenv').config()
const express = require('express')
const Note = require('./models/note')

const errorHandler = (error, request, response, next) => {
  console.log(`error name ${error.name}`)
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const app = express()
app.use(express.json())
app.use(express.static('dist'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({})
    .then(result => {
      response.json(result)
    })
    .catch(e => {
      console.log('find all error :', e)
      response.status(500).end()
    })
})

app.get('/api/notes/:id', (request, response, next) => {
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

app.delete('/api/notes/:id', (request, response) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch(e => {
      console.log('delete by id error :', e)
      response.status(500).end()
    })
})

app.post('/api/notes', (request, response, next) => {
  const note = new Note({
    content: request.body.content,
    important: request.body.important || false
  })
  note.save()
    .then(result => {
      console.log('note saved!')
      response.status(201).json(result)
    })
    .catch(e => next(e))
})

app.put('/api/notes/:id', (request, response) => {

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
      console.log('findbyid error :', e)
      response.status(500).end()
    })
})

app.use(unknownEndpoint)
app.use(errorHandler)
const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)