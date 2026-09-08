const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')


describe('favorite blog', () => {

  const blogExample = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]


  test('returns undefined for undefined', () => {
    let blogs

    const result = listHelper.favorite(blogs)
    assert.strictEqual(result, undefined)
  })
  test('returns undefined for empty list', () => {
    const blogs = []

    const result = listHelper.favorite(blogs)
    assert.strictEqual(result, undefined)
  })
  test('returns blog object for list with single blog', () => {
    const blogs = [blogExample]

    const result = listHelper.favorite(blogs)
    assert.deepStrictEqual(result, blogExample)
  })
  test('returns total likes for list with blogs', () => {
    const expectedBlog = {...blogExample, _id:4, likes: 4}
    const blogs = [{...blogExample, likes: 1},{...blogExample, _id:2, likes: 2},{...blogExample, _id:3, likes: 3}, expectedBlog]

    const result = listHelper.favorite(blogs)
    assert.deepStrictEqual(result, expectedBlog)
  })

  
})