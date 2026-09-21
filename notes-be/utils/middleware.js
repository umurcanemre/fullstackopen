const log = require('../utils/logger')
const morgan = require('morgan')
const tokenHandler = require('./tokenHandler')

const errorHandler = (error, request, response, next) => {
  log.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    console.log('mongo server error', error.message)
    return response.status(400).json({ error: 'expected unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }
  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const securedEndpoint = async (request, response, next) => {
  const securedByUser = [['/api/notes', 'POST'],['/api/notes', 'PUT']]
  if (securedByUser.some(it => request.url.startsWith(it[0]) && it[1] === request.method)) {
    if (!request.headers.authorization) {
      return response.status(401).json({ error: 'token expected' })
    }
    request.userId = await tokenHandler.getIdOfToken(request)
  }
  next()
}

const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms :body')

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

module.exports = {
  errorHandler, unknownEndpoint, requestLogger, securedEndpoint
}