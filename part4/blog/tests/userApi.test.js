const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const User = require('../models/user')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  console.log('cleared users blogs')

  const userObjs = helper.initialUsers.map(u => new User(u))
  const promiseArray = userObjs.map(u => u.save())
  await Promise.all(promiseArray)
  const users = await helper.usersInDb()

  const blogObjs = helper.initialBlogs
    .map(b => new Blog({ ...b, user: users[0].id }))
  const promiseBlogArray = blogObjs.map(b => b.save())
  await Promise.all(promiseBlogArray)
  const blogIds = (await Blog.find({})).map(b => b.id)

  const user = await User.findById(users[0].id)
  user.blogs = user.blogs.concat(blogIds)
  await user.save()
  console.log('done')
})


test('users are returned as json', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all users are returned', async () => {
  const response = await api.get('/api/users')

  assert.strictEqual(response.body.length, helper.initialUsers.length)
})

test('a specific user can be viewed', async () => {
  const usersAtStart = await helper.usersInDb()
  const userToView = usersAtStart[0]
  const blogsObjInDb = (await Blog.find({})).map(b => b.toJSON()).map(({ user, likes, ...b }) => b)

  const resultUser = await api
    .get(`/api/users/${userToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  // console.log('result user', resultUser.body)
  // console.log('expected user blogs', blogsObjInDb)

  assert.strictEqual(resultUser.body.name, userToView.name)
  assert.strictEqual(resultUser.body.username, userToView.username)
  assert.deepStrictEqual(resultUser.body.blogs, blogsObjInDb)
  //without password
  assert.strictEqual(resultUser.body.password, undefined)
  assert.strictEqual(resultUser.body.passwordHash, undefined)
})


test('a valid user can be added ', async () => {
  const newUser = {
    name: 'testuser name',
    username: 'testuser',
    password: "password",
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const userAtEnd = await helper.usersInDb()
  assert.strictEqual(userAtEnd.length, helper.initialUsers.length + 1)
  const usernames = userAtEnd.map(n => n.username)
  assert(usernames.includes('testuser'))
  const names = userAtEnd.map(n => n.name)
  assert(names.includes('testuser name'))
})

test('user without password is not added', async () => {
  const newUser = {
    name: 'invalid testuser name',
    userName: 'testuser',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  const userAtEnd = await helper.usersInDb()
  assert.strictEqual(userAtEnd.length, helper.initialUsers.length)
})

test('user without username is not added', async () => {
  const newUser = {
    name: 'invalid testuser name',
    password: 'password',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  const userAtEnd = await helper.usersInDb()
  assert.strictEqual(userAtEnd.length, helper.initialUsers.length)
})

test('username must be unique', async () => {
  const usersAtStart = await helper.usersInDb()
  const newUser = { ...usersAtStart[0], name: 'sth else', password: 'sth else' }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  const userAtEnd = await helper.usersInDb()
  assert.strictEqual(userAtEnd.length, helper.initialUsers.length)
})

test('user with 2 char username is not added', async () => {
  const newUser = {
    name: 'testuser name',
    password: 'password',
    username: 'ra'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  const userAtEnd = await helper.usersInDb()
  assert.strictEqual(userAtEnd.length, helper.initialUsers.length)
})

test('user with 2 char pwd is not added', async () => {
  const newUser = {
    name: 'testuser name',
    password: 'pa',
    username: 'ra the god'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  const userAtEnd = await helper.usersInDb()
  assert.strictEqual(userAtEnd.length, helper.initialUsers.length)
})

test('user can login', async () => {
  const loginRequest = {
    password: 'password',
    username: helper.initialUsers[0].username
  }

  const resp = await api
    .post('/api/login')
    .send(loginRequest)
    .expect(200)

  assert.notStrictEqual(resp.body.token, undefined);
  assert.strictEqual(typeof resp.body.token, 'string');
  const parts = resp.body.token.split('.');
  assert.strictEqual(parts.length, 3, 'Token must have 3 parts');
})


test('user cant login with wrong password', async () => {

  const loginRequest = {
    password: 'pazzword',
    username: helper.initialUsers[0].username
  }

  const resp = await api
    .post('/api/login')
    .send(loginRequest)
    .expect(401)
})


test('user cant login with wrong username', async () => {

  const loginRequest = {
    password: 'password',
    username: helper.initialUsers[0].username + 'gsdjns'
  }

  const resp = await api
    .post('/api/login')
    .send(loginRequest)
    .expect(401)
})



after(async () => {
  await mongoose.connection.close()
})