const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog({ ...request.body, likes: request.body.likes ? request.body.likes : 0 })

  const saved = await blog.save()
  response.status(201).json(saved)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/', async (request, response) => {
  const found = await Blog.findByIdAndUpdate(request.body.id, request.body)
  if (found) {
    response.status(200).json(found)
  }
  else {
    response.status(404).end()
  }
})
module.exports = blogRouter