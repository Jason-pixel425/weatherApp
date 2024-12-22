import styles from '../styles/CurrentWeatherStyles/WeatherForecastDay.module.css'
import WeatherCard from './WeatherCard'
export default function WeatherCurrentForecast({forecastDay}) {
    console.log(`This is the ${forecastDay}`)
    const hourForcast = forecastDay.hour.map((hour, index) => {
        return(
            <WeatherCard key={index} 
            valueName={hour.time} 
            value={`${hour.temp_c}°C`}
            valueImg={hour.condition.icon}
            >

            </WeatherCard>
        )
    })
    return (
        <>
        <div className={styles['forecast-day-container']}>
            {hourForcast}
        </div>
        </>
    )
}