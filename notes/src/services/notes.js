import axios from 'axios'
const baseUrl = '/api/notes'

let token = null
const setToken = newToken => {
    token = `Bearer ${newToken}`
}
const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(resp => resp.data)
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token }
    }
    const req = axios.post(baseUrl, newObject, config)
    return await  req.then(resp => resp.data)
}

const update = (newObject) => {
    const config = {
        headers: { Authorization: token }
    }
    const req = axios.put(`${baseUrl}/${newObject.id}`, newObject, config)
    return req.then(resp => resp.data)
}

export default { getAll, create, update, setToken }