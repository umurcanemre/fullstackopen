import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
    console.log(`Retrieving all countries`)
    return axios.get(baseUrl+'/all').then(resp => 
        resp.data
    )
}
const getOne = (name) => {
    console.log(`Retrieving country ${name}`)
    return axios.get(baseUrl+`/name/${name}`).then(resp => 
        resp.data
    )
}

export default {getAll, getOne}