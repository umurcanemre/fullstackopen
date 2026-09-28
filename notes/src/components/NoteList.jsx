import { useState } from 'react'

import Note from './Note'
import noteService from '../services/notes'


const NoteList = ({ notes, reload, errNotif }) => {
  const [showAll, setShowAll] = useState(true)
  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  const toggleImportance = (note) => {
    const updatedNote = { ...note, important: !note.important }
    noteService.update(updatedNote)
      .then(() => {
        console.log(`importance of ${note.id} is toggled from ${note.important} to ${!note.important}`)
        // setNotes(notes.map(n => n.id === note.id ? toggledNote : n))
        reload()
      })
      .catch(() => {
        errNotif()
      })
  }

  return (
    <div>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note)} />
        ))}
      </ul>
    </div>
  )
}

export default NoteList