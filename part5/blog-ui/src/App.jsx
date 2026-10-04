/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

import {
  BrowserRouter as Router,
  Routes, Route, Link, useMatch, useNavigate
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
  const navigate = useNavigate()


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
      setNotificationType('ok')
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
    setNotificationType('ok')
    setTimeout(() => {
      setNotificationMessage(null)
    }, 3000)
  }

  const blogList = () => {
    return (
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id}
            blog={blog}
            user={user}
            view={(id) => navigate('/blogs/' + id)}
            refreshPage={() => { setRefresh(!refresh) }}
            q={(lb) => { blogService.likeBlog(lb).then(() => { setRefresh(!refresh) }) }} />
        )}
      </div>
    )
  }


  const auth = () => {
    return (
      <div>
        <h2>log into application</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type='text'
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type='password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type='submit'>login</button>
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
    <>
      <div>
        <Link style={padding} to="/">blogs</Link>
        {user && <Link style={padding} to="/create">new blog</Link>}

        {!user && <Link style={padding} to="/login">login</Link>}
        {user && <button onClick={logout}>Logout</button>}

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
            detailed='true' />
        } />
      </Routes>

    </>
  )
}

export default App