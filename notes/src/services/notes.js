import axios from 'axios'
const baseUrl = '/api/notes'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(resp => resp.data)
}

const create = newObject => {
    const req = axios.post(baseUrl, newObject)
    return req.then(resp => resp.data)
}

const update = (newObject) => {
    const req = axios.put(`${baseUrl}/${newObject.id}`, newObject)
    return req.then(resp => resp.data)
}

export default { getAll, create, update }