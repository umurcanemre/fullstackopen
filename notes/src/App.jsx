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
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import { Container, AppBar, Toolbar, Button } from '@mui/material'

const App = () => {
  const noteFormRef = useRef()
  const [notes, setNotes] = useState([])
  const [reloadFlag, setReloadFlag] = useState(false)
  const [notification, setNotification] = useState({})
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  console.log('render', notes.length, 'notes')

  const match = useMatch('/notes/:id')
  const note = match
    ? notes.find(note => note.id === match.params.id)
    : null

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
        setNotification({ message: 'Note couldn\'t be updated', type: 'error' })
        setTimeout(() => {
          setNotification({})
        }, 5000)
      })
  }
  const removeNote = async (note) => {
    noteService.remove(note)
      .then(() => {
        console.log('removed note ' + note.id)
      })
      .catch(() => {
        setNotification({ message: 'Note couldn\'t be deleted', type: 'error' })
        setTimeout(() => {
          setNotification({})
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
      setNotification({ message: `Note added!`, type: 'success' })
      setTimeout(() => {
        setNotification({})
      }, 5000)
    })
    .catch(() => {
      setNotification({ message: 'Note couldn\'t be created', type: 'error' })
      setTimeout(() => {
        setNotification({})
      }, 5000)
    })
  const padding = {
    padding: 5
  }
  const hoverStyle = { '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/" sx={hoverStyle}>home</Button>
          <Button color="inherit" component={Link} to="/notes" sx={hoverStyle}>notes</Button>
          <Button color="inherit" component={Link} to="/create" sx={hoverStyle}>new note</Button>
          <Button color="inherit" component={Link} to="/account" sx={hoverStyle}>account</Button>
        </Toolbar>
      </AppBar>
      
      <Notification message={notification.message} type={notification.type} />

      <Routes>
        <Route path="/notes/:id" element={
          <Note note={note} toggleImportance={toggleImportance} removeNote={removeNote} />
        } />
        <Route path="/notes" element={
          <NoteList
            notes={notes}
            reload={() => setReloadFlag(!reloadFlag)}
            errNotif={() => {
              setNotification(`Note couldn't be updated`)
              setTimeout(() => {
                setNotification(null)
              }, 5000)
            }}
          />
        } />
        <Route path="/create" element={
          <NoteForm createNote={addNote} />
        } />
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<LoginForm setUser={setUser}
          setErrorMessage={setNotification} />} />
      </Routes>
      <Footer />
    </Container>
  )
}

export default App