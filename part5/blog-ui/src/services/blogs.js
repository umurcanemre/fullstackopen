import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => token = newToken

const getAll = async () => {
    const resp = await axios.get(baseUrl)
    return resp.data
}

export default { getAll, setToken }