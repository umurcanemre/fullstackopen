const jwt = require('jsonwebtoken')
const { SIGNING_SECRET } = require('./config')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

const getIdOfToken = async (request) => {
  return jwt.verify(getTokenFrom(request), SIGNING_SECRET).id
}

module.exports = { getIdOfToken }