const mongoose = require('mongoose')

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