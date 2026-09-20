const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')


describe('mostBlogs blog', () => {

  const blogExampleItem = {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }

  const mostBloggedAuthor = {
    author: 'Edsger W. Dijkstra',
    blogs: 1
  }


  test('returns undefined for undefined', () => {
    let blogs

    const result = listHelper.mostBlogs(blogs)
    assert.strictEqual(result, undefined)
  })
  test('returns undefined for empty list', () => {
    const blogs = []

    const result = listHelper.mostBlogs(blogs)
    assert.strictEqual(result, undefined)
  })
  test('returns author and one single blog for list with single blog', () => {
    const result = listHelper.mostBlogs([blogExampleItem])
    assert.deepStrictEqual(result, mostBloggedAuthor)
  })
  test('returns total likes for author for list single author', () => {
    const blogs = [{ ...blogExampleItem, likes: 1 }, { ...blogExampleItem, _id: 2, likes: 2 }, { ...blogExampleItem, _id: 3, likes: 3 }, { ...blogExampleItem, _id: 4, likes: 4 }]
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, { ...mostBloggedAuthor, blogs: 4 })
  })
  test('returns author with most total likes in large list', () => {
    const blogs = [
      { ...blogExampleItem, likes: 1 }, 
      { ...blogExampleItem, _id: 2, likes: 2 }, 
      { ...blogExampleItem, _id: 3, likes: 3 }, 
      { ...blogExampleItem, _id: 4, likes: 4 },
      { ...blogExampleItem, _id: 5 ,likes: 1, author: "Stephen King's apprentice"}, 
      { ...blogExampleItem, _id: 6, likes: 2, author: "Stephen King" }, 
      { ...blogExampleItem, _id: 7, likes: 3, author: "Stephen King" }, 
      { ...blogExampleItem, _id: 8, likes: 4, author: "Stephen King" },]

    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, { ...mostBloggedAuthor, blogs: 4 })
  })

})