const blogRoute = require('./controllers/blog')
const userRoute = require('./controllers/users')

const mongoose = require('mongoose')
const express = require('express')
const config = require('./utils/config')
const log = require('./utils/logger')
const middleware = require('./utils/middleware')

const app = express()
mongoose.connect(config.MONGODB_URI, { family: 4 })
  .then(log.info('Mongo connection established'))
  .catch(e => log.error('Mongo connection error: ', e))

app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogRoute)
app.use('/api/users', userRoute)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)


module.exports = app
