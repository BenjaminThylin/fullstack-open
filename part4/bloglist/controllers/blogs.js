const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

    blog.likes = !blog.likes ? 0 : blog.likes
    if (blog.title && blog.url) {
        const newBlog = await blog.save()
        response.json(newBlog)
    } else {
        response.status(404).end()
    }
})

module.exports = blogsRouter