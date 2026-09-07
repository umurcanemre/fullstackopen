const express = require('express')
const personRouter = require('./controllers/persons')
const { requestLogger, errorHandler, unknownEndpoint } = require('./utils/middleware')
require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI

console.log('connecting to', url.substring(0, 20).concat('...'))
mongoose.connect(url, { family: 4 })

  .then(console.log('connected to MongoDB'))
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const app = express()
app.use(express.json())
app.use(express.static('dist'))
app.use(requestLogger)

app.use('/api/persons', personRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
