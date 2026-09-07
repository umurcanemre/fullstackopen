const config = require('./utils/config')
const log = require('./utils/logger')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.set('strictQuery', false)
const url = config.MONGODB_URI

log.info('connecting to', url.substring(0, 20).concat('...'))
mongoose.connect(url, { family: 4 })

  .then(() => {
    log.info('connected to MongoDB')
  })
  .catch(error => {
    log.error('error connecting to MongoDB:', error.message)
  })

app.use(express.json())
app.use(express.static('dist'))

app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app