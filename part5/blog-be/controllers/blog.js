const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})
blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
  response.json(blog)
})

blogRouter.post('/', async (request, response) => {
  console.log("request received ", request.userId)
  const user = await User.findById(request.userId)
  console.log("user found ", user)
  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }
  
  const blog = new Blog({ ...request.body, user: user._id, likes: request.body.likes ? request.body.likes : 0 })

  const saved = await blog.save()
  response.status(201).json(saved)
})

blogRouter.delete('/:id', async (request, response) => {
  console.log(`deleting blog ${request.params.id}, for user ${request.userId}`)
  const blog = await Blog.find({ _id:request.params.id,  user: request.userId })
  
  if(!blog) {
    return response.status(403).end()
  }
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/', async (request, response) => {
  const found = await Blog.findOneAndUpdate({_id:request.body.id, user: request.userId}, request.body)
  if (found) {
    response.status(200).json(found)
  }
  else {
    response.status(403).end()
  }
})
module.exports = blogRouter