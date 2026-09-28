import { useState } from 'react'
import { Link } from 'react-router-dom'
import Note from './Note'
import noteService from '../services/notes'


const NoteList = ({ notes, reload, errNotif }) => {
  const [showAll, setShowAll] = useState(true)
  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  // const toggleImportance = (note) => {
  //   const updatedNote = { ...note, important: !note.important }
  //   noteService.update(updatedNote)
  //     .then(() => {
  //       console.log(`importance of ${note.id} is toggled from ${note.important} to ${!note.important}`)
  //       reload()
  //     })
  //     .catch(() => {
  //       errNotif()
  //     })
  // }

  return (
    <div>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <li className='note' key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.content}</Link>
          </li> //key={note.id} note={note} toggleImportance={() => toggleImportance(note)} />
        ))}
      </ul>
    </div>
  )
}

export default NoteList