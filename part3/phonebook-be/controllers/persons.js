const Person = require('../models/person')
const personRouter = require('express').Router()
const log = require('../utils/logger')

personRouter.get('/', (request, response) => {
  Person.find({}).then(p => {
    response.json(p)
  }).catch(e => {
    log.error('find all error :', e)
    response.status(500).end()
  })
})

personRouter.get('/:id', (request, response, next) => {

  Person.findById(request.params.id)
    .then(p => {
      if (p) {
        log.info('found person', p)
        response.json(p)
      } else {
        log.info('person not found')
        response.status(404).end()
      }
    })
    .catch(e => next(e))
})

personRouter.put('/:id', (request, response, next) => {

  Person.findByIdAndUpdate(request.params.id, request.body)
    .then(p => {
      if (p) {
        response.json(p)
      } else {
        response.status(404).end()
      }
    })
    .catch(e => next(e))

})

personRouter.post('/', (request, response, next) => {
  const newPerson = new Person({
    name: request.body.name,
    number: request.body.number
  })

  newPerson.save()
    .then(p => response.status(201).json(p))
    .catch(e => {
      console.log('save error: ', e)
      next(e)
    })
})

personRouter.delete('/:id', (request, response) => {
  console.log(`deleting person with id ${request.params.id}`)
  Person.findByIdAndDelete(request.params.id)
    .then(response.status(204).end())
    .catch(e =>
      console.log('delete error', e)
        .status(500).end())
})

personRouter.get('/info', (request, response) => {
  Person.find({}).then(p => {
    const info = `<p>Phonebook has info for ${p.length} people</p>`
      .concat(`<p>${new Date()}</p>`)
    response.send(info)
  })
})

module.exports = personRouter