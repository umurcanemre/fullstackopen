import { render, screen } from '@testing-library/react'
import Blog from '../../components/Blog'
import userEvent from '@testing-library/user-event'

test('renders title and author by default', () => {
  const blog = {
    title: 'Blog title',
    author: 'blog author',
    url: 'http://blogurl.com',
    likes: 0,
    user: { id: '539723097532', name: 'name', username: 'username' }
  }

  render(<Blog blog={blog} />)

  const blogElement = screen.getByText('Blog title blog author')
  expect(blogElement).toBeDefined()
  console.log('blog element')
  screen.debug(blogElement)

  const urlElement = screen.getByText('http://blogurl.com')
  expect(urlElement).toBeDefined().not.toBeVisible()
  console.log('url element')
  screen.debug(urlElement)

  const likesElement = screen.getByText('likes 0')
  expect(likesElement).toBeDefined().not.toBeVisible()
  console.log('likes element')
  screen.debug(likesElement)

  const userElement = screen.getByText('username')
  expect(userElement).toBeDefined().not.toBeVisible()
  console.log('user element')
  screen.debug(userElement)
})

test('renders details when view is clicked', async () => {
  const blog = {
    title: 'Blog title',
    author: 'blog author',
    url: 'http://blogurl.com',
    likes: 0,
    user: { id: '539723097532', name: 'name', username: 'username' }
  }

  render(<Blog blog={blog} />)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const blogElement = screen.getByText('Blog title blog author')
  expect(blogElement).toBeDefined().toBeVisible()

  const urlElement = screen.getByText('http://blogurl.com')
  expect(urlElement).toBeDefined().toBeVisible()

  const likesElement = screen.getByText('likes 0')
  expect(likesElement).toBeDefined().toBeVisible()

  const userElement = screen.getByText('username')
  expect(userElement).toBeDefined().toBeVisible()
})

test('removes details when hide is clicked', async () => {
  const blog = {
    title: 'Blog title',
    author: 'blog author',
    url: 'http://blogurl.com',
    likes: 0,
    user: { id: '539723097532', name: 'name', username: 'username' }
  }

  render(<Blog blog={blog} />)
  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  expect(viewButton).toBeDefined().not.toBeVisible()

  const hideButton = screen.getByText('hide')
  expect(hideButton).toBeDefined().toBeVisible()
  await user.click(hideButton)


  const blogElement = screen.getByText('Blog title blog author')
  expect(blogElement).toBeDefined()

  const urlElement = screen.getByText('http://blogurl.com')
  expect(urlElement).toBeDefined().not.toBeVisible()

  const likesElement = screen.getByText('likes 0')
  expect(likesElement).toBeDefined().not.toBeVisible()

  const userElement = screen.getByText('username')
  expect(userElement).toBeDefined().not.toBeVisible()
})



test('like button register clicks', async () => {
  const blog = {
    title: 'Blog title',
    author: 'blog author',
    url: 'http://blogurl.com',
    likes: 0,
    user: { id: '539723097532', name: 'name', username: 'username' }
  }
  const likeBlog = vi.fn()


  render(<Blog blog={blog} likeBlog={likeBlog} />)
  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)


  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)


  expect(likeBlog.mock.calls).toHaveLength(2)
  expect(likeBlog.mock.calls[0][0].title).toBe('Blog title')
  expect(likeBlog.mock.calls[1][0].title).toBe('Blog title')
})

