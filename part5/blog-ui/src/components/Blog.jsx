import blogsService from '../services/blogs'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import { Button } from '@mui/material'
import {
  useNavigate
} from 'react-router-dom'


// const blogStyle = {
//   paddingTop: 10,
//   paddingLeft: 2,
//   border: 'solid',
//   borderWidth: 1,
//   marginBottom: 5
// }
const Blog = ({ blog, user, likeBlog }) => {
  const nav = useNavigate()
  const showDeleteButton = { display: user?.id === blog.user.id ? '' : 'none' }

  // const likeCurrent = () => likeBlog(blog).then(() => { refreshPage() })
  const deleteCurrent = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogsService.deleteBlog(blog).then(() => { nav('/') })
    }
  }

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <h3>{blog.title}</h3>
          <div>
            <>by {blog.author}</>
          </div>
          <a href={blog.url} >{blog.url}</a>

          <div>
            <>added by {blog.user.name}</>
          </div>

          <div>
            {blog.likes} likes
            {user && user.id !== blog.user.id && <Button onClick={() => likeBlog(blog)}>LIKE</Button>}
            <Button onClick={deleteCurrent} style={showDeleteButton}>DELETE</Button>
          </div>
        </CardContent>
      </Card>
    </Box>
    // <div style={blogStyle}>
    //   {blog.title} {blog.author}
    //   <button style={hideDetails} onClick={() => view(blog.id)}>view</button>
    //   <div className='blogDetails' style={showDetails}>
    //     <div>{blog.url}</div>
    //     <div>likes {blog.likes} {user && user.id !== blog.user.id && <button onClick={() => likeBlog(blog)}>like</button>} </div>
    //     <div>{blog.user.username}</div>
    //     <div style={showDeleteButton}><button onClick={deleteCurrent}>remove</button></div>
    //   </div>
    // </div>
  )
}

export default Blog