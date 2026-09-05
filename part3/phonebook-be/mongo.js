const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3] 
const phone = process.argv[4]

const url = `mongodb+srv://...`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
})

const Person = mongoose.model('person', personSchema)

if(name && phone) {
  const person = new Person({name, phone})

  person.save().then(result => {
    console.log(`added ${result.name} ${result.phone} to phonebook` , result)
    mongoose.connection.close()
  })
}
else {
  Person.find({}).then(result => {
    console.log("phonebook:")
    result.forEach(person => {
      console.log(`${person.name} ${person.phone}`)
    })
    mongoose.connection.close()
  })
}