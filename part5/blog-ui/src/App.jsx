/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { Container, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper, Button } from '@mui/material'
import { TextField, AppBar, Toolbar } from '@mui/material'

import {
  BrowserRouter as Router,
  Routes, Route, Link, useMatch
} from 'react-router-dom'

const App = () => {
  console.log('rendering app')
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('error')


  useEffect(() => {
    console.log('blogs effect')
    const fetchData = async () => {
      try {
        const retrievedBlogs = await blogService.getAll()
        console.log('retrieved blogs ', retrievedBlogs)
        setBlogs(retrievedBlogs.sort((a, b) => { return b.likes - a.likes }))
      } catch {
        e => {
          setNotificationMessage(e)
          setNotificationType('error')
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
        }
      }
    }
    fetchData()
  }, [refresh])

  useEffect(() => {
    console.log('auth effect')
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')

      setNotificationMessage('logged in')
      setNotificationType('success')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)
    } catch {
      console.error('login failed')
      setNotificationMessage('login failed')
      setNotificationType('error')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)
    }
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
    setNotificationMessage('logged out')
    setNotificationType('success')
    setTimeout(() => {
      setNotificationMessage(null)
    }, 3000)
  }

  const blogList = () => {
    return (
      <div>
        <h2>Blogs</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {blogs.map((blog) =>
                <TableRow key={blog.id}>
                  <TableCell>
                    <Link style={padding} to={'/blogs/' + blog.id}>{blog.title}</Link>
                  </TableCell>
                  <TableCell>
                    {blog.author}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }


  const auth = () => {
    return (
      <div>
        <h2>log into application</h2>
        <form onSubmit={handleLogin}>
          <div>
            <TextField
              label='username'
              value={username}
              style={{ marginTop: 10 }}
              onChange={({ target }) => setUsername(target.value)}
            />

          </div>
          <div>
            <TextField
              label='password'
              type='password'
              value={password}
              style={{ marginTop: 10 }}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <Button type='submit' style={{ marginTop: 10 }}>login</Button>
        </form>
      </div>
    )
  }

  const padding = { padding: 5 }
  const match = useMatch('/blogs/:id')
  const chosenBlog = match
    ? blogs.find(b => b.id === match.params.id)
    : null
  return (
    <Container>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">Home</Button>
            {user && <Button color="inherit" component={Link} to="/create">New Blog</Button>}
            {!user && <Button color="inherit" component={Link} to="/login">Login</Button>}
            {user && <Button color="inherit" onClick={logout}>Logout</Button>}
          </Toolbar>
        </AppBar>
      </div>

      <div>

        <Notification message={notificationMessage} type={notificationType} />
      </div>

      <Routes>
        <Route path="/" element={
          <div>
            {blogList()}
          </div>
        } />
        <Route path="/create" element={
          <div>
            <BlogForm refreshPage={setRefresh} refreshState={refresh}></BlogForm>
          </div>
        } />
        <Route path="/login" element={auth()} />
        <Route path="/blogs/:id" element={
          <Blog
            blog={chosenBlog}
            user={user}
            refreshPage={() => { setRefresh(!refresh) }}
            likeBlog={(lb) => { blogService.likeBlog(lb).then(() => { setRefresh(!refresh) }) }}
          />
        } />
      </Routes>

    </Container >
  )
}

export default App