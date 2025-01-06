import WeatherCard from "./WeatherCard"
import '../styles/CurrentWeatherStyles/forcastWeather.css'

export default function ForecastWeather({forecastData}){
    function formatDate(dateString) {
        const [year, month, day] = dateString.split('-');
        return `${day} / ${month} / ${year}`
    }

    const forcastDaysArr = forecastData.map((dayObj, index) => {
     
        return (
            <div className="forecast-container">
            <h4>{formatDate(dayObj.date)}</h4>
            <div className="forecast-center">

            <img src={dayObj.day.condition.icon} alt={`${dayObj.day.condition.text} Weather Icon`}/>
            <p className="forecast-temperature">{dayObj.day.maxtemp_c}°C</p>
            </div>
          
                <p>{dayObj.day.condition.text}</p>
           
            </div>
        )
    })

    return (
        <>
        <h3 className="three-day-forecast-title">Two-day forecast...</h3>
        <div className="forecast-outer-container">
            {forcastDaysArr}
        </div>
        </>
    )
}
