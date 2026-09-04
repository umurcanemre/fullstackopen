const express = require('express')
const app = express()
app.use(express.json())

let notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true
    },
    {
        id: "2",
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: "3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

const generateId = () => {
    const maxId = notes.length > 0 ?
        Math.max(...notes.map(n => Number(n.id))) : 0
    const selectedId = String(maxId + 1)
    console.log(`generated id : ${selectedId}`)
    return selectedId
}

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(n => n.id === id)
    if (note) {
        response.json(note)
    }
    else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(n => n.id !== id).sort()

    response.status(204).end()
})

app.post('/api/notes', (request, response) => {

    if (!request.body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const newNote = {
        id: generateId(),
        content: request.body.content,
        important: request.body.important || false
    }

    notes = notes.concat(newNote)
    response.status(201).json(newNote)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)