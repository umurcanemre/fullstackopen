import { useState } from 'react'
import blogsService from '../services/blogs'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@mui/material'

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
      <TextField
        label='title'
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      <br />
      <TextField
        label='author'
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      <br />
      <TextField
        label='url'
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
      <br />
      <Button type="submit" variant="contained" style={{ marginTop: 10 }} onClick={createBlog}>create</Button>
    </div>
  )
}

export default BlogForm