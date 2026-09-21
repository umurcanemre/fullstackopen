import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  console.log("rendering app")
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
        setBlogs(retrievedBlogs)
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
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  const auth = () => {
    if (!user)
      return (
        <div>
          <h2>log into application</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label>
                username
                <input
                  type="text"
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                password
                <input
                  type="password"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
              </label>
            </div>
            <button type="submit">login</button>
          </form>
        </div>
      )
    else
      return (
        <div>
          <p>{user.username} logged in <>  </>
            <button onClick={logout}>Logout</button>
          </p>
        </div>
      )
  }

  return (
    <div>

      <h2>blogs</h2>
      <Notification message={notificationMessage} type={notificationType} />
      {auth()}
      {user && <BlogForm refreshPage={setRefresh} refreshState={refresh}></BlogForm>}
      {user && blogList()}
    </div>
  )
}

export default App