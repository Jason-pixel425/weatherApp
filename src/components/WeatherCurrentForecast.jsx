import { useEffect } from 'react'
import styles from '../styles/CurrentWeatherStyles/WeatherForecastDay.module.css'
import WeatherCard from './WeatherCard'
export default function WeatherCurrentForecast({forecastDay, style={border: '1px solid rgba(255, 255, 255, 0.5)', flexDirection : 'column', borderRadius: '5px', alignItems: 'center', fontWeight: '600'}}) {
    
    console.log(`This is the ${forecastDay}`)
    useEffect(() => {
        // Get the current hour in 12 hour
        const now = new Date();
        const hour24 = now.getHours();
        const hour12 = hour24 % 12 || 12;
        const period = hour24 >= 12 ? "PM" : "AM";
        const currentHourId = `${hour12}:00 ${period}`;
    
        // Scroll to the element
        const currentHourElement = document.getElementById(currentHourId);
        if (currentHourElement) {
            currentHourElement.style.borderColor = 'green'
          currentHourElement.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        }
      }, [forecastDay]);

    const hourForcast = forecastDay.hour.map((hour, index) => {
        const time = hour.time.split(" ")[1]
        const hour24 = parseInt(time.split(":")[0], 10); 
        const hour12 = hour24 % 12 || 12; 
        const period = hour24 >= 12 ? "PM" : "AM";
        return(
            <WeatherCard key={index}
            id={`${hour12}:00 ${period}`} // This is used to highlight the current hour
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