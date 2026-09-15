const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  console.log('cleared')

  const userObjs = helper.initialUsers
    .map(u => new User(u))
  const promiseUserArray = userObjs.map(u => u.save())
  await Promise.all(promiseUserArray)
  const usersInDb = await helper.usersInDb()

  const blogObjs = helper.initialBlogs
    .map(b => new Blog({ ...b, user: usersInDb[0].id }))
  const promiseArray = blogObjs.map(b => b.save())
  await Promise.all(promiseArray)
  console.log('done')
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('a specific blog can be viewed with user', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const usersAtStart = await helper.usersInDb()
  const blogToView = { ...blogsAtStart[0], user: usersAtStart[0] }

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  console.log('specific blog result', resultBlog.body)
  assert.deepStrictEqual(resultBlog.body, blogToView)
})


test('a valid blog can be added ', async () => {
  const usersAtStart = await helper.usersInDb()
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: "umurcan emre",
    url: "https://myblog.com/async",
    likes: 1,
    userId: usersAtStart[0].id
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  const titles = blogsAtEnd.map(n => n.title)
  assert(titles.includes('async/await simplifies making async calls'))
})

test('blog without title is not added', async () => {
  const usersAtStart = await helper.usersInDb()
  const newBlog = {
    author: "umurcan emre",
    url: "https://myblog.com/async",
    likes: 1,
    userId: usersAtStart[0].id
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})


test('blog without author is not added', async () => {
  const usersAtStart = await helper.usersInDb()
  const newBlog = {
    title: 'async/await simplifies making async calls',
    url: "https://myblog.com/async",
    likes: 1,
    userId: usersAtStart[0].id
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})


test('blog without url is not added', async () => {
  const usersAtStart = await helper.usersInDb()
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: "umurcan emre",
    likes: 1,
    userId: usersAtStart[0].id
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})


test('blog without user is not added', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: "umurcan emre",
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('blog likes is defaulted to 0 likes', async () => {
  const usersAtStart = await helper.usersInDb()
  const newBlog = {
    title: 'async/await simplifies making async calls no likes',
    author: "umurcan emre",
    url: 'https://myblog/blog',
    userId: usersAtStart[0].id
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect(res => {
      console.log("response ", res.body)
      assert.strictEqual(res.body.title, newBlog.title)
      assert.strictEqual(res.body.likes, 0)
      assert.ok(res.body.id);
    })

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
})

test('blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
  await api
    .delete('/api/blogs/' + blogToDelete.id)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  assert.strictEqual(blogsAtEnd.some(b => b.id === blogToDelete.id), false)
})

test('existing blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  const updatedBlog = { ...blogToUpdate, author: "someone else", title: "something else", likes: blogToUpdate.likes + 10 }

  await api
    .put('/api/blogs')
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  assert.deepStrictEqual(blogsAtEnd.find(b => b.id === updatedBlog.id), updatedBlog)
})

test('non existent blog cant be updated', async () => {
  const nonExistentBlog = { id: "6a9c84b913ab6ff38d999999", author: "someone", title: "something", url: "any url" }

  await api
    .put('/api/blogs')
    .send(nonExistentBlog)
    .expect(404)
})

after(async () => {
  await mongoose.connection.close()
})