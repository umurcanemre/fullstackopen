import axios from 'axios'

const baseUrl = "/api/persons"

const getPeople = () => {
    const req = axios.get(baseUrl)
    return req.then( resp => resp.data )
}
const addPerson = (person) => {
    const req = axios.post(baseUrl, person)
    return req.then( resp => resp.data )
}
const deletePerson = (person) => {
    const req = axios.delete(baseUrl+`/${person.id}`)
    return req.then( resp => resp.data )
}
const updatePerson = (person) => {
    const req = axios.put(baseUrl+`/${person.id}`, person)
    return req.then( resp => resp.data )
}

export default {getPeople, addPerson, deletePerson, updatePerson}