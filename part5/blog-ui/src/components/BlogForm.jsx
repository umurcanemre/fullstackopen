import { useState } from 'react'
import blogsService from '../services/blogs'
import { useNavigate } from 'react-router-dom'

const BlogForm = ({ refreshPage, refreshState }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const navigate = useNavigate()

  const createBlog = async () => {
    await blogsService.createBlog({ title, author, url })
    navigate('/')
    refreshPage(!refreshState)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create New</h2>
      <label>
        title:
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </label>
      <br />
      <label>
        author:
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </label>
      <br />
      <label>
        url:
        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </label>
      <br />
      <button onClick={createBlog}>create</button>
    </div>
  )
}

export default BlogForm