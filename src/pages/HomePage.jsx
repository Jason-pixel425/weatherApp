import { useState, useEffect, createContext } from 'react'
import CurrentWeather from '../components/CurrentWeather'
import SearchBar from '../components/Searchbar'
import { OrbitProgress } from 'react-loading-indicators'
import '../styles/HomePage.css'
// IPGEO
// WeatherAPI
const WeatherContext = createContext(null);

export default function HomePage({isPermissionGranted}) {
  const [geolocation, setGeolocation] = useState({})
  const [weatherCurrent, setWeatherCurrent] = useState(null)
  const [weatherForecast, setWeatherForecast] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasSearched, setHasSearched] = useState(false)
  
  
  useEffect(() => {
    if (isPermissionGranted){
    setIsLoading(true)
    fetch('https://weatherapp-1-lddj.onrender.com/api/getData')
    .then(resp => resp.json())
    .then(data => {
      setGeolocation(data.geolocation)
      setWeatherCurrent({weatherCur : {...data.weatherCurrent}, weatherCurrForecast :{...data.weatherForecast.forecastday[0]}})
      setWeatherForecast(data.weatherForecast.forecastday.slice(1))
      setIsLoading(false)
    })
  }
    
  }, [])

  async function handleSearchClick (lat, lon) {
    setHasSearched(true)
    setIsLoading(true)
    try {
      const response = await fetch(`https://weatherapp-1-lddj.onrender.com/api/searchweather?lat=${lat}&lon=${lon}`);
      if (!response.ok) {
        setIsLoading(false)
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setGeolocation(data.geolocation)
      setWeatherCurrent({weatherCur : {...data.weatherCurrent}, weatherCurrForecast :{...data.weatherForecast.forecastday[0]}})
      setWeatherForecast(data.weatherForecast.forecastday.slice(1))
      setIsLoading(false)
      setHasSearched(true)
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setIsLoading(false)
    }
  };

  if (!hasSearched && !isPermissionGranted){
    return (
      <div className="search-container">
        
          <SearchBar handleSearch={handleSearchClick} labelText='Search for location' id="Search-location-input"/>

      </div>
    )
  }

  return (
    <>
          {          
          isLoading ? (
        <div className="loading-container">
          <OrbitProgress />
        </div>
      ) : (
            <WeatherContext.Provider value={{
              geolocationData : geolocation, 
              weatherCurrentData : weatherCurrent, 
              weatherForecastData : weatherForecast,
              handleSearch : handleSearchClick
            }}>
              
              <CurrentWeather />
              
            </WeatherContext.Provider>
          )
        }

    </>
  )
}

export { WeatherContext }