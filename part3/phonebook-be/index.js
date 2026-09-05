const express = require('express')
const morgan = require('morgan');
const Person = require('./models/person')

const app = express()
app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req) => {
    return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


const baseUrl = '/api/persons'


app.get(baseUrl, (request, response) => {
    Person.find({}).then(p => {
        response.json(p)
    })
})

app.get(baseUrl + '/:id', (request, response) => {

    Person.findById(request.params.id)
        .then(p => {
            response.json(p)
        })
        .catch(e => response.status(404).end())

})

app.post(baseUrl, (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response
            .status(400)
            .json({ error: "name and body fields are necessary" })
    }


    const newPerson = new Person({
        name: request.body.name,
        number: request.body.number
    })

    newPerson.save()
        .then(p => response.status(201).json(p))
        .catch(e => response.status(500).end())
})

app.delete(baseUrl + '/:id', (request, response) => {
    console.log(`deleting person with id ${request.params.id}`)
    Person.findByIdAndDelete(request.params.id)
        .then(p => {
            response.status(204).end()
        })
        .catch(e =>
            console.log("delete error", e)
                .status(404).end())
})

app.get('/info', (request, response) => {
    Person.find({}).then(p => {
        const info = `<p>Phonebook has info for ${p.length} people</p>`
            .concat(`<p>${new Date()}</p>`)
        response.send(info)
    })
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)