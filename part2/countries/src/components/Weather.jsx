import { useState, useEffect } from "react"
import weatherService from '../services/weatherService'

const Weather = ({country}) => {
    const [weather, setWeather] = useState({"main":{"temp":0}, "wind":{"speed": 0}, "weather":[{"icon":"01d"}]})
    console.log("rendering weather with ", weather)
    const iconSrc = `https://openweathermap.org/payload/api/media/file/${weather.weather[0].icon}.png` 
    useEffect(() => {
        console.log("weather effect")
        weatherService
        .getCurrentWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
        .then( resp => {
            console.log("setting weather to ", weather)
            setWeather(resp)
        })
    }, [country])

    return (
        <div>
            <h2>Weather in {country.capital[0]}</h2>
            <div>Temperature {weather.main.temp} Celsius</div>
            <img src={iconSrc} alt={weather.weather[0].description} />
            <div>Wind {weather.wind.speed} m/s</div>
        </div>
    )
}

export default Weather
