import WeatherCard from "./WeatherCard"
import '../styles/CurrentWeatherStyles/forcastWeather.css'
export default function ForecastWeather({forecastData}){
    console.log(forecastData)
    
    function formatDate(dateString) {
        const [year, month, day] = dateString.split('-');
        return `${day} / ${month} / ${year}`
    }

    const forcastDaysArr = forecastData.map((dayObj, index) => {
        console.log(dayObj)
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

            // <WeatherCard key={index}
            // id={`${hour12}:00 ${period}`} // This is used to highlight the current hour
            // style={style} 
            // valueName={`${hour12}:00 ${period}`} 
            // value={`${hour.temp_c}°C`}
            // valueImg={hour.condition.icon}
            // >

            // </WeatherCard>
            /*
            avghumidity
: 
79
avgtemp_c
: 
25.4
avgtemp_f
: 
77.7
avgvis_km
: 
9.8
avgvis_miles
: 
6
condition
: 
{text: 'Moderate rain', icon: '//cdn.weatherapi.com/weather/64x64/day/302.png', code: 1189}
daily_chance_of_rain
: 
89
daily_chance_of_snow
: 
0
daily_will_it_rain
: 
1
daily_will_it_snow
: 
0
maxtemp_c
: 
29.1
maxtemp_f
: 
84.4
maxwind_kph
: 
17.3
maxwind_mph
: 
10.7
mintemp_c
: 
22.8
mintemp_f
: 
73
totalprecip_in
: 
0.31
totalprecip_mm
: 
7.94
totalsnow_cm
: 
0
uv
: 
2.3 .*/