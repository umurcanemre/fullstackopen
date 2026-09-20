const L = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  console.log(blogs)
  if (!blogs || blogs.length === 0) {
    console.log("empty zero")
    return 0
  }

  return blogs.reduce((acc, b) => acc + b.likes, 0)
}

const favorite = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return undefined
  }

  return blogs.reduce((sel, b) => b.likes > sel.likes ? b : sel, blogs[0])
}

const mostBlogs = (blogs) => {

  if (!blogs || blogs.length === 0) {
    return undefined
  }
  const authorGroups = L.groupBy(blogs, 'author')
  const mostBloggedAuthor = Object.keys(authorGroups).reduce((sel, a) => authorGroups[a].length > authorGroups[sel].length ? a : sel, Object.keys(authorGroups)[0])

  return { author: mostBloggedAuthor, blogs: authorGroups[mostBloggedAuthor].length }
}


const favoriteAuthor = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return undefined
  }
  const authorGroups = L.groupBy(blogs, 'author')

  const favAuthor = Object.keys(authorGroups).reduce((sel, a) => totalLikes(authorGroups[a]) > totalLikes(authorGroups[sel]) ? a : sel, '')
  console.log("fav author", favAuthor)

  return { author: favAuthor, likes: totalLikes(authorGroups[favAuthor]) }
}

module.exports = { dummy, totalLikes, favorite, mostBlogs, favoriteAuthor }