import styles from '../styles/CurrentWeatherStyles/WeatherForecastDay.module.css'
import WeatherCard from './WeatherCard'
export default function WeatherCurrentForecast({forecastDay, style={border: '1px solid rgba(255, 255, 255, 0.5)', flexDirection : 'column', borderRadius: '5px'}}) {
    console.log(`This is the ${forecastDay}`)
    const hourForcast = forecastDay.hour.map((hour, index) => {
        const time = hour.time.split(" ")[1]
        const hour24 = parseInt(time.split(":")[0], 10); // Get the hour as an integer
        const hour12 = hour24 % 12 || 12; // Use 12 if hour24 is 0
        const period = hour24 >= 12 ? "PM" : "AM";
        return(
            <WeatherCard key={index}
            style={style} 
            valueName={`${hour12}:00 ${period}`} 
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