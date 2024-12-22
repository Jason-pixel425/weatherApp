import { useContext } from 'react'
import { WeatherContext } from '../pages/HomePage'
import WeatherCard from './WeatherCard'
import styles from '../styles/currentWeather.module.css'
import WeatherCurrentForecast from './WeatherCurrentForecast'

export default function CurrentWeather({}) {
    const { weatherCurrentData, geolocationData } = useContext(WeatherContext)
    const weatherDataCurrent = weatherCurrentData.weatherCur
    const weatherDataDay = weatherCurrentData.weatherCurrForecast
    return (
        <>
        <section className={styles["current-weather-container"]}>
            <div className={styles["current-weather"]}>
                <h2 className={styles["location-city"]}>{geolocationData.name},</h2>
                <h2 className={styles["location"]}>{geolocationData.region}, {geolocationData.country}</h2>
                <div className={styles["horizontal-line"]}></div>
                <div className={styles["inline"]}>

                    <p>{weatherDataCurrent.temp_c}°C</p>
                    <img src={weatherDataCurrent.condition.icon} alt={weatherCurrentData.condition} />
                </div>

            </div>
            
            {/* This should honestly also be changed to a WeatherCard */}
            {/* <WeatherCard valueName="Current Temperature" 
                value={`${weatherDataCurrent.temp_c}°C`} 
                style={{gridColumn: 'span 2', justifySelf: 'center', width: '100%', alignItems: 'center'}}
                /> */}
            <WeatherCurrentForecast forecastDay={weatherDataDay} />
            <WeatherCard valueName="Heat index" value={`${weatherDataCurrent.heatindex_c}°C`} />
            <WeatherCard valueName="Humidity" value={`${weatherDataCurrent.humidity}%`} />
            <WeatherCard valueName="Heat index" value={`${weatherDataCurrent.heatindex_c}°C`} />
            <WeatherCard valueName="UV Index" value={weatherDataCurrent.uv} />
            <WeatherCard valueName="Cloud Coverage" value={`${weatherDataCurrent.cloud}%`} />
            <WeatherCard valueName="Humidity" value={`${weatherDataCurrent.humidity}%`} />
        </section>
        </>
    )
}

