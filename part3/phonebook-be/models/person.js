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
const phoneValidator = (value) => {
  if (!value) return false
  if (value.length < 8) return false
  return /^\d{2,3}-\d+$/.test(value)
}
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLenght: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: phoneValidator,
      message: 'Phone must be 8+ chars: 09-1234556 or 040-22334455'
    }
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)