const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('dummy', () => {
  test('dummy returns one for empty list', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
  test('dummy returns one for undefined', () => {
    let blogs

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
  test('dummy returns one for any list', () => {
    const blogs = [1,2,3]

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})