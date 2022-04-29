const _ = require("lodash");

const dummy = (blogs) => {
   return 1
}

const totalLikes = (blogs) => {
    return blogs.length === 0 ? 0 : blogs.reduce((likes, blog) => likes + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.length === 0 ? {} : blogs.reduce((mostLikes, blog) => mostLikes < blog.likes ? blog.likes : mostLikes, blogs[0].likes)
}

const mostBlogs = (blogs) => {
    const authorList = _(blogs)
        .groupBy('author')
        .map((blogs, author) => ({author: author, blogs: blogs.length}))
        .value()

    return blogs.length === 0 ? {} : _.maxBy(authorList, (author) => author.blogs)
}

const mostLikes = (blogsArray) => {
    const authorList = _(blogsArray)
        .groupBy('author')
        .map((blogs, author) => ({author: author, likes: _.sumBy(blogs, 'likes')}))
        .value()

    return blogsArray.length === 0 ? {} : _.maxBy(authorList, (author) => author.likes)
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}