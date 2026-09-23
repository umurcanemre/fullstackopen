import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import BlogForm from '../../components/BlogForm'
import userEvent from '@testing-library/user-event'


// Mock the blogs service
vi.mock('../../services/blogs', () => ({
  default: {
    createBlog: vi.fn()
  }
}))

import blogsService from '../../services/blogs'



describe('BlogForm', () => {
  beforeEach(() => {
    // Clear mocks before each test
    vi.clearAllMocks()
  })

  test('blog form updates parent state and calls onSubmit', async () => {
    const mockRefreshPage = vi.fn()
    const mockRefreshState = true

    blogsService.createBlog.mockResolvedValue({ id: 1 })

    render(
      <BlogForm
        refreshPage={mockRefreshPage}
        refreshState={mockRefreshState}
      />
    )

    fireEvent.change(screen.getByLabelText('title:'), {
      target: { value: 'Test Blog' }
    })
    fireEvent.change(screen.getByLabelText('author:'), {
      target: { value: 'Test Author' }
    })
    fireEvent.change(screen.getByLabelText('url:'), {
      target: { value: 'https://example.com' }
    })

    fireEvent.click(screen.getByText('create'))

    await waitFor(() => {
      expect(blogsService.createBlog).toHaveBeenCalledWith({
        title: 'Test Blog',
        author: 'Test Author',
        url: 'https://example.com'
      })

      expect(mockRefreshPage).toHaveBeenCalledWith(!mockRefreshState)

      const inputs = screen.getAllByRole('textbox')
      inputs.forEach(input => {
        expect(input.value).toBe('')
      })
    })
  })
})