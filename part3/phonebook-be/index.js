const express = require('express')
const morgan = require('morgan');
const app = express()
app.use(express.json())
morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


const baseUrl = '/api/persons'
let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

const generateId = () => {
    const ceiling = 100
    let id = 0

    do {
        id = Math.floor(Math.random() * ceiling)
    } while (persons.find(p => p.id === String(id)))
    return id
}

app.get(baseUrl, (request, response) => {
    response.json(persons)
})

app.get(baseUrl + '/:id', (request, response) => {
    const person = persons.find(p => p.id === request.params.id)

    if (person) {
        response.json(person)
    }

    response.status(404).end()
})

app.post(baseUrl, (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response
        .status(400)
        .json({ error: "name and body fields are necessary" })
    }

    if (persons.find(p => p.name === body.name)) {
        return response
        .status(400)
        .json({ error: `Name ${body.name} already exists`})
    }

    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(newPerson)
    response.status(201).json(newPerson)
})

app.delete(baseUrl + '/:id', (request, response) => {
    persons = persons.filter(p => p.id !== request.params.id)

    response.status(204).end()
})

app.get('/info', (request, response) => {
    const info = `<p>Phonebook has info for ${persons.length} people</p>`
        .concat(`<p>${new Date()}</p>`)

    response.send(info)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)