import { useState } from 'react'
import blogsService from '../services/blogs'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}
const Blog = ({ blog, refreshPage }) => {
  const [detailed, setDetailed] = useState(false)
  const showDetails = { display: detailed ? '' : 'none' }
  const hideDetails = { display: detailed ? 'none' : '' }

  const toggleDetail = () => setDetailed(!detailed)
  const likeCurrent = () => blogsService.likeBlog(blog).then(() => { refreshPage() })
  const deleteCurrent = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogsService.deleteBlog(blog).then(() => { refreshPage() })
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button style={hideDetails} onClick={toggleDetail}>view</button>
      <button style={showDetails} onClick={toggleDetail}>hide</button>
      <div style={showDetails}>
        {blog.url}
        <br />
        likes {blog.likes} <button onClick={likeCurrent}>like</button>
        <br />
        {blog.user.username}
        <br />
        <button onClick={deleteCurrent}>remove</button>
      </div>
    </div>
  )
}

export default Blog