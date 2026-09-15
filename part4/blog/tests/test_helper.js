const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [
  {
    username: 'initial testusername',
    name: 'test user name',
    passwordHash: '$2b$10$cHjKEV5DCsv2dxhV8CciMOPgXqOb9yPg/sCa/SEulidJ9yVYwYrU6' // password
  }
]

const initialBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5
  },{
    title: 'Go To Statement Considered Harmful 2',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 15
  },{
    title: 'Microservices',
    author: 'Martin Fowler',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 115
  },
]

const nonExistingId = async () => {
  const note = new Blog({ title: 'willremovethissoon', author: "someone", url: "", likes:0 })
  await note.save()
  await note.deleteOne()

  return note.id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  const resp = users.map(u => u.toJSON())
  // console.log("users in db", resp)
  return resp
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb, initialUsers
}