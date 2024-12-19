import { useState, useEffect, createContext } from 'react'
import CurrentWeather from '../components/CurrentWeather'
import PermissionCheck from '../components/permissionsCheck';
import { FcInfo } from "react-icons/fc";

// IPGEO
// WeatherAPI
const WeatherContext = createContext(null);

export default function HomePage() {
  const [geolocation, setGeolocation] = useState({})
  const [weatherCurrent, setWeatherCurrent] = useState(null)
  const [weatherForecast, setWeatherForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  

  useEffect(() => {
    setLoading(true)
    fetch('/api/getData')
    .then(resp => resp.json())
    .then(data => {
      setGeolocation(data.geolocation)
      setWeatherCurrent(data.weatherCurrent)
      setWeatherForecast(data.weatherForecast)
      setLoading(false)
    })
    
  }, [])
  console.log(geolocation) 
  console.log(weatherCurrent)
  console.log(weatherForecast)

 

  return (
    <>
        <h1>Home Page</h1>
        <WeatherContext.Provider value={{
          geolocationData : geolocation, 
          weatherCurrentData : weatherCurrent, 
          weatherForecastData : weatherForecast
        }}>

        </WeatherContext.Provider>

        {/* {weatherCurrent &&
          <CurrentWeather>
              <p>{weatherCurrent.feelslike_c}</p>
          </CurrentWeather>
        } */}
    </>
  )
}