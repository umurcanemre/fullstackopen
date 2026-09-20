require('dotenv').config()

const PORT = process.env.PORT || 3003
const MONGODB_URI = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI
const SIGNING_SECRET = process.env.NODE_ENV === 'test' ? process.env.TEST_SIGNING_KEY : process.env.SIGNING_KEY

module.exports = { MONGODB_URI, PORT, SIGNING_SECRET }