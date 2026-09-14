const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

const getIdOfToken = async (request) => {
  return jwt.verify(getTokenFrom(request), process.env.SECRET).id
}

module.exports = { getIdOfToken }