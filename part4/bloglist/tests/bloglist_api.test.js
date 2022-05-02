const mongoose = require('mongoose')
const helper = require('./bloglist_api_helper')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.blogsBeforeTest.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('Bloglist DB info', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('blog identifier is id not _id', async () => {
        const blogs = await Blog.find({})
        expect(blogs[0].id).toBeDefined()
    })
})

describe('New blog', () => {
    test('a valid blog can be added', async () => {
        const newBlog = {
            title: "Testing valid blog",
            author: "Benjamin Thylin",
            url: "https://testingblog.com/",
            likes: 7,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAfterPost = await helper.dbBlogs()
        const blogTitles = blogsAfterPost.map(result => result.title)

        expect(blogsAfterPost).toHaveLength(helper.blogsBeforeTest.length + 1)
        expect(blogTitles).toContain("Testing valid blog")
    })

    test('no likes will default to 0', async () => {
        const newBlog = {
            title: "Missing likes defaults to 0",
            author: "Benjamin Thylin",
            url: "https://testingblog.com/",
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAfterPost = await helper.dbBlogs()
        const newAddedBlog = blogsAfterPost.find(blog => blog.title === "Missing likes defaults to 0")

        expect(newAddedBlog.likes).toBe(0)
    })

    test('no title or url responds with 404', async () => {
        const newBlog = {
            author: "Benjamin Thylin",
            likes: 7,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(404)

        const blogsAfterPost = await helper.dbBlogs()

        expect(blogsAfterPost).toHaveLength(helper.blogsBeforeTest.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})