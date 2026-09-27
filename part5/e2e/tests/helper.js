const testuser1 = {
  name: 'Testing User Userzade',
  username: 'testuser',
  password: 'testpwd'
}
const testuser2 = {
  name: 'Testing User Userzade2',
  username: 'testuser2',
  password: 'testpwd2'
}

const testBlog1 = {
  title: 'test title 1',
  author: 'test author 1',
  url: 'http://testblogurl1.com'
}
const testBlog2 = {
  title: 'test title 2',
  author: 'test author 2',
  url: 'http://testblogurl2.com'
}
const testBlog3 = {
  title: 'test title 3',
  author: 'test author 3',
  url: 'http://testblogurl3.com',
}


const initBlogTest = async (request) => {
  await request.post('/api/testing/reset')
  await request.post('/api/users', {
    data: testuser1
  })
  await request.post('/api/users', {
    data: testuser2
  })
}

const exitingBlogs = () => [testBlog1, testBlog2, testBlog3]

const logout = async (page) => {
  await page.getByRole('button', { name: 'Logout' }).click()
  await page.getByRole('button', { name: 'login' }).waitFor()
}

const loginWith = async (page, username, password, isSuccess = true) => {
  await page.getByRole('button', { name: 'login' }).click()
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
  if (isSuccess) {
    await page.getByRole('button', { name: 'logout' }).waitFor()
  }
}

const createBlogs = async (page, blogs) => {
  page.getByRole('button', { name: 'create new blog' }).click()
  for (let b of blogs) {
    await page.getByLabel('title:').fill(b.title)
    await page.getByLabel('author:').fill(b.author)
    await page.getByLabel('url').fill(b.url)

    await page.getByRole('button', { name: 'create' }).click()
    await page.getByText(b.title + ' ' + b.author).waitFor()
  }
}
export { initBlogTest, loginWith, createBlogs, exitingBlogs, logout }