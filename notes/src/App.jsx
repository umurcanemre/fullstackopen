import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [reloadFlag, setReloadFlag] = useState(false)
  console.log('render', notes.length, 'notes')

  useEffect(()=> {
    console.log("effect")
    noteService.getAll()
    .then(receivedNotes => {
      setNotes(receivedNotes)
    })
  }, [reloadFlag])

  const addNote = (event) => {
    event.preventDefault()

    console.log(`note id generating ${notes.length}, ${String(notes.length + 1)}`)
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
      id: String(notes.length + 1),
    }

    noteService.create(noteObject)
    .then(createdNote => {
      console.log('created ', createdNote)
      setNewNote('')
      setReloadFlag(!reloadFlag)
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportance = (note) => {
    const updatedNote = {...note, important: !note.important}
    noteService.update(updatedNote)
    .then(toggledNote => {
      console.log(`importance of ${note.id} is toggled from ${note.important} to ${!note.important}`)
      setNotes(notes.map(n => n.id === note.id ? toggledNote : n))
    })
    .catch( e => {
      alert(`the note ${note.content.substring(0, 5) + "..."} couldn't be updated`)
    })
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} toggleImportance={()=>toggleImportance(note)} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App