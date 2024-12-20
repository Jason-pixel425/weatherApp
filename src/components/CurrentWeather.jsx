import { useContext } from 'react'
import { WeatherContext } from '../pages/HomePage'
import WeatherCard from './WeatherCard'

export default function CurrentWeather({}) {
    const { weatherCurrentData, geolocationData } = useContext(WeatherContext)
    const weatherDataCurrent = weatherCurrentData.weatherCur
    const weatherDataDay = weatherCurrentData.weatherCurrForecast
    return (
        <>
        <section className="current-weather-container">
            <h2>{geolocationData.name}, {geolocationData.region}, {geolocationData.country}</h2>
            <WeatherCard valueName="Heat index" value={`${weatherDataCurrent.heatindex_c}°C`} />
            <WeatherCard valueName="UV Index" value={weatherDataCurrent.uv} />
            <div>
                <h3>Current Weather</h3>
                <p>{weatherDataCurrent.temp_c}°C</p>
            </div>
            <WeatherCard valueName="Cloud Coverage" value={`${weatherDataCurrent.cloud}%`} />
            <WeatherCard valueName="humidity" value={`${weatherDataCurrent.humidity}%`} />
        </section>
        </>
    )
}