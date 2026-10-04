import { render, screen } from '@testing-library/react'
import Blog from '../../components/Blog'
import userEvent from '@testing-library/user-event'

test('renders all details for loggedout user', () => {
  const blog = {
    title: 'Blog title',
    author: 'blog author',
    url: 'http://blogurl.com',
    likes: 10,
    user: { id: '539723097532', name: 'name', username: 'username' }
  }

  render(<Blog blog={blog} detailed='true' />)

  const blogElement = screen.getByText('Blog title blog author')
  expect(blogElement).toBeDefined().toBeVisible()

  const urlElement = screen.getByText('http://blogurl.com')
  expect(urlElement).toBeDefined().toBeVisible()

  const likesElement = screen.getByText('likes 10')
  expect(likesElement).toBeDefined().toBeVisible()

  const likesButtonElement = screen.queryByRole('button', { name: 'like' })
  expect(likesButtonElement).not.toBeInTheDocument()

  const userElement = screen.getByText('username')
  expect(userElement).toBeDefined().toBeVisible()

  const removeElement = screen.queryByRole('button', { name: 'remove' })
  expect(removeElement).not.toBeInTheDocument()
})

test('renders all details and remove button for owning user', () => {
  const user = { id: '539723097532', name: 'name', username: 'username' }
  const blog = {
    title: 'Blog title',
    author: 'blog author',
    url: 'http://blogurl.com',
    likes: 10,
    user: user
  }

  render(<Blog blog={blog} user={user} detailed='true' />)

  const blogElement = screen.getByText('Blog title blog author')
  expect(blogElement).toBeDefined().toBeVisible()

  const urlElement = screen.getByText('http://blogurl.com')
  expect(urlElement).toBeDefined().toBeVisible()

  const likesElement = screen.getByText('likes 10')
  expect(likesElement).toBeDefined().toBeVisible()

  const likesButtonElement = screen.queryByRole('button', { name: 'like' })
  expect(likesButtonElement).not.toBeInTheDocument()

  const userElement = screen.getByText('username')
  expect(userElement).toBeDefined().toBeVisible()

  const removeElement = screen.queryByRole('button', { name: 'remove' })
  expect(removeElement).toBeInTheDocument()
})

test('renders all details and like button for loggedin other user', () => {
  const user = { id: '539723097532', name: 'name', username: 'username' }
  const blog = {
    title: 'Blog title',
    author: 'blog author',
    url: 'http://blogurl.com',
    likes: 10,
    user: user
  }

  render(<Blog blog={blog} user={{ id: '539797532', name: 'name2', username: 'username2' }} detailed='true' />)

  const blogElement = screen.getByText('Blog title blog author')
  expect(blogElement).toBeDefined().toBeVisible()

  const urlElement = screen.getByText('http://blogurl.com')
  expect(urlElement).toBeDefined().toBeVisible()

  const likesElement = screen.getByText('likes 10')
  expect(likesElement).toBeDefined().toBeVisible()

  const likesButtonElement = screen.queryByRole('button', { name: 'like' })
  expect(likesButtonElement).toBeInTheDocument()

  const userElement = screen.getByText('username')
  expect(userElement).toBeDefined().toBeVisible()

  const removeElement = screen.queryByRole('button', { name: 'remove' })
  expect(removeElement).not.toBeInTheDocument()
})

// test('renders details when view is clicked', async () => {
//   const blog = {
//     title: 'Blog title',
//     author: 'blog author',
//     url: 'http://blogurl.com',
//     likes: 0,
//     user: { id: '539723097532', name: 'name', username: 'username' }
//   }

//   render(<Blog blog={blog} />)
//   const user = userEvent.setup()
//   const button = screen.getByText('view')
//   await user.click(button)

//   const blogElement = screen.getByText('Blog title blog author')
//   expect(blogElement).toBeDefined().toBeVisible()

//   const urlElement = screen.getByText('http://blogurl.com')
//   expect(urlElement).toBeDefined().toBeVisible()

//   const likesElement = screen.getByText('likes 0')
//   expect(likesElement).toBeDefined().toBeVisible()

//   const userElement = screen.getByText('username')
//   expect(userElement).toBeDefined().toBeVisible()
// })



// test('like button register clicks', async () => {
//   const blog = {
//     title: 'Blog title',
//     author: 'blog author',
//     url: 'http://blogurl.com',
//     likes: 0,
//     user: { id: '539723097532', name: 'name', username: 'username' }
//   }
//   const likeBlog = vi.fn()


//   render(<Blog blog={blog} likeBlog={likeBlog} />)
//   const user = userEvent.setup()
//   const viewButton = screen.getByText('view')
//   await user.click(viewButton)


//   const likeButton = screen.getByText('like')
//   await user.click(likeButton)
//   await user.click(likeButton)


//   expect(likeBlog.mock.calls).toHaveLength(2)
//   expect(likeBlog.mock.calls[0][0].title).toBe('Blog title')
//   expect(likeBlog.mock.calls[1][0].title).toBe('Blog title')
// })

