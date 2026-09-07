const log = require('../utils/logger')
const morgan = require('morgan')

const errorHandler = (error, request, response, next) => {
  log.error(error.message)

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

const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms :body')

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

module.exports = {
  errorHandler, unknownEndpoint, requestLogger
}