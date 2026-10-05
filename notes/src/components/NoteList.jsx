import { useState } from 'react'
import { Link } from 'react-router-dom'
import Note from './Note'
import noteService from '../services/notes'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'


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

      <h2>Notes</h2>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>content</TableCell>
              <TableCell>user</TableCell>
              <TableCell>important</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notesToShow.map(note => (
              <TableRow key={note.id}>
                <TableCell>
                  <Link to={`/notes/${note.id}`}>
                    {note.content}
                  </Link>
                </TableCell>
                <TableCell>
                  {note.user.name}
                </TableCell>
                <TableCell>
                  {note.important ? 'yes' : ''}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <ul>
        {notesToShow.map((note) => (
          <li className='note' key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.content}</Link>
          </li> //key={note.id} note={note} toggleImportance={() => toggleImportance(note)} />
        ))}
      </ul> */}
    </div>
  )
}

export default NoteList