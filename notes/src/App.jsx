import { useState, useEffect, useRef } from 'react'
import Home from './components/Home'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'
import Note from './components/Note'
import LoginForm from './components/LoginForm'
// import Togglable from './components/Togglable'
import noteService from './services/notes'
// import loginService from './services/login'
import Notification from './components/Notification'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const App = () => {
  const noteFormRef = useRef()
  const [notes, setNotes] = useState([])
  const [reloadFlag, setReloadFlag] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
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
  const toggleImportance = (note) => {
    const updatedNote = { ...note, important: !note.important }
    noteService.update(updatedNote)
      .then(() => {
        console.log(`importance of ${note.id} is toggled from ${note.important} to ${!note.important}`)
        setReloadFlag(!reloadFlag)
      })
      .catch(() => {
        setErrorMessage(`Note couldn't be updated`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }
  const removeNote = async (note) => {
    noteService.remove(note)
      .then(() => {
        console.log('removed note ' + note.id)
      })
      .catch(() => {
        setErrorMessage(`Note couldn't be deleted`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    setReloadFlag(!reloadFlag)
  }

  // const handleLogin = async (event) => {
  //   event.preventDefault()
  //   console.log('logging in with', username, password)
  //   try {
  //     const user = await loginService.login({ username, password })

  //     window.localStorage.setItem(
  //       'loggedNoteappUser', JSON.stringify(user)
  //     )

  //     setUser(user)
  //     noteService.setToken(user.token)
  //     setUsername('')
  //     setPassword('')
  //   } catch {
  //     setErrorMessage('wrong credentials')
  //     setTimeout(() => {
  //       setErrorMessage(null)
  //     }, 5000)
  //   }
  // }
  const addNote = (noteObject) => noteService.create(noteObject)
    .then(() => {
      // noteFormRef.current.toggleVisibility()
      setReloadFlag(!reloadFlag)
    })
    .catch(() => {
      setErrorMessage(`Note couldn't be created`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/create">new note</Link>
        <Link style={padding} to="/account">account</Link>
      </div>

      <Notification message={errorMessage} />

      <Routes>
        <Route path="/notes/:id" element={
          <Note notes={notes} toggleImportance={toggleImportance} removeNote={removeNote} />
        } />
        <Route path="/notes" element={
          <NoteList
            notes={notes}
            reload={() => setReloadFlag(!reloadFlag)}
            errNotif={() => {
              setErrorMessage(`Note couldn't be updated`)
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            }}
          />
        } />
        <Route path="/create" element={
          <NoteForm createNote={addNote} />
        } />
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<LoginForm setUser={setUser}
          setErrorMessage={setErrorMessage} />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App