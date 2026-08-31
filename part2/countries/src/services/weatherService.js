import axios from 'axios'

const baseUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=en`
const api_key = import.meta.env.VITE_WEATHER_KEY

const getCurrentWeather = (lat, long) => {
    console.log(`retrieving weather for ${lat}-${long}, with key ${api_key}`)
    return axios
    .get(baseUrl + `&lat=${lat}&lon=${long}&appid=${api_key}`)
    .then(resp => {
        console.log("wheather service responded with ", resp)
        return resp.data
    })
}

export default {getCurrentWeather}