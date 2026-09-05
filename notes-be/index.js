require('dotenv').config()
const express = require('express')
const Note = require('./models/note')

const app = express()
app.use(express.json())
app.use(express.static('dist'))

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(result => {
        response.json(result)
    })
})

app.get('/api/notes/:id', (request, response) => {

    Note.findById(request.params.id).then(note => {
        response.json(note)
    }).catch( e=> {
        response.status(404).end()
    })
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

    const note = new Note({
        content: request.body.content,
        important: request.body.important || false
    })
    note.save().then(result => {
        console.log('note saved!')
        response.status(201).json(result)
    })
})

app.put('/api/notes/:id', (request, response) => {

    if (!request.body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    Note.findById(request.params.id)
    .then(note => {
        note.content = request.body.content
        note.important = request.body.important
        note.save().then( n=> {
            console.log('note updated!')
            response.status(201).json(n)
        })
    }).catch( e=> {
        response.status(404).end()
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)