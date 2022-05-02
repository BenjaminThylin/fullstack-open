const listHelper = require('../utils/list_helper')

const blogs = [
    {
        id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const blog = blogs[0]
        const result = listHelper.totalLikes([blog])
        expect(result).toBe(7)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })
})

describe('favorite blog', () => {

    test('of empty list is {}', () => {
        const favorite = listHelper.favoriteBlog([])
        expect(favorite).toEqual({})
    })

    test('when list has only one blog, equals that blog', () => {
        const blog = blogs[0]
        const favorite = blogs.find(blog => blog.likes === listHelper.favoriteBlog([blog]))
        expect(favorite).toEqual(blog)
    })

    test('of a bigger list is calculated right', () => {
        const favorite = blogs.find(blog => blog.likes === listHelper.favoriteBlog(blogs))
        expect(favorite).toEqual(
            {
                id: "5a422b3a1b54a676234d17f9",
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
                likes: 12,
                __v: 0
            }
        )
    })
})

describe('most blogs', () => {

    test('of empty list is {}', () => {
        const author = listHelper.mostBlogs([])
        expect(author).toEqual({})
    })

    test('when list has only one blog, equals that blogs author', () => {
        const blog = blogs[0]
        const author = listHelper.mostBlogs([blog])
        expect(author).toEqual({author: blog.author, blogs: 1})
    })

    test('of a bigger list is calculated right', () => {
        const author = listHelper.mostBlogs(blogs)
        expect(author).toEqual(
            {
                author: "Robert C. Martin",
                blogs: 3
            }
        )
    })
})

describe('most likes', () => {

    test('of empty list is {}', () => {
        const author = listHelper.mostLikes([])
        expect(author).toEqual({})
    })

    test('when list has only one blog, equals that blogs author', () => {
        const blog = blogs[0]
        const author = listHelper.mostLikes([blog])
        expect(author).toEqual({author: blog.author, likes: 7})
    })

    test('of a bigger list is calculated right', () => {
        const author = listHelper.mostLikes(blogs)
        expect(author).toEqual(
            {
                author: "Edsger W. Dijkstra",
                likes: 17
              }
        )
    })
})
