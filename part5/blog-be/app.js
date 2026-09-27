const blogRoute = require('./controllers/blog')
const userRoute = require('./controllers/users')
const loginRoute = require('./controllers/login')

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
app.use(middleware.securedEndpoint)
app.use('/api/login', loginRoute)
app.use('/api/blogs', blogRoute)
app.use('/api/users', userRoute)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)


module.exports = app
