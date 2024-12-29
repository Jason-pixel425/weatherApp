import { useState, useEffect, createContext } from 'react'
import CurrentWeather from '../components/CurrentWeather'

// IPGEO
// WeatherAPI
const WeatherContext = createContext(null);

export default function HomePage() {
  const [geolocation, setGeolocation] = useState({})
  const [weatherCurrent, setWeatherCurrent] = useState(null)
  const [weatherForecast, setWeatherForecast] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  

  useEffect(() => {
    setIsLoading(true)
    fetch('/api/getData')
    .then(resp => resp.json())
    .then(data => {
      setGeolocation(data.geolocation)
      setWeatherCurrent({weatherCur : {...data.weatherCurrent}, weatherCurrForecast :{...data.weatherForecast.forecastday[0]}})
      setWeatherForecast(data.weatherForecast.forecastday.slice(1))
      setIsLoading(false)
    })
    
  }, [])
  console.log(geolocation) 
  console.log(weatherCurrent)
  console.log(weatherForecast)

  return (
    <>
          {isLoading ? (
        <div>Loading...</div>
      ) : (
        <WeatherContext.Provider value={{
          geolocationData : geolocation, 
          weatherCurrentData : weatherCurrent, 
          weatherForecastData : weatherForecast
        }}>
          <CurrentWeather />
        </WeatherContext.Provider>
        )}

    </>
  )
}

export { WeatherContext }