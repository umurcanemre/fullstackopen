const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('total likes', () => {

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


  test('returns zero for undefined', () => {
    let blogs

    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 0)
  })
  test('returns zero for empty list', () => {
    const blogs = []

    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 0)
  })
  test('returns no of likes for list with single blog', () => {
    const blogs = [{...blogExample, likes: 4}]

    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 4)
  })
  test('returns total likes for list with blogs', () => {
    const blogs = [{...blogExample, likes: 1},{...blogExample, likes: 2},{...blogExample, likes: 3},{...blogExample, likes: 4}]

    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 10)
  })

  
})