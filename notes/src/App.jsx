import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import NoteForm from './components/NoteForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import noteService from './services/notes'
import loginService from './services/login'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {
  const noteFormRef = useRef()
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [reloadFlag, setReloadFlag] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  console.log('render', notes.length, 'notes')

  useEffect(() => {
    console.log("effect")
    noteService.getAll()
      .then(receivedNotes => {
        setNotes(receivedNotes)
      })
  }, [reloadFlag])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      setUser(user)
      noteService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const addNote = (noteObject) => noteService.create(noteObject).then(() => {   
    noteFormRef.current.toggleVisibility()
    setReloadFlag(!reloadFlag) 
  })

  const toggleImportance = (note) => {
    const updatedNote = { ...note, important: !note.important }
    noteService.update(updatedNote)
      .then(toggledNote => {
        console.log(`importance of ${note.id} is toggled from ${note.important} to ${!note.important}`)
        setNotes(notes.map(n => n.id === note.id ? toggledNote : n))
        setReloadFlag(!reloadFlag)
      })
      .catch(e => {
        setErrorMessage(`Note '${note.content}' was already removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== note.id))
      })
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user &&
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      }
      {user &&
        <Togglable buttonLabel='new note' ref={noteFormRef}>
          <NoteForm
            createNote={addNote}
          />
        </Togglable>}
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
      <Footer />
    </div>
  )
}

export default App