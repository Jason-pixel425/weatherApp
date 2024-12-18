import { useState, useEffect } from 'react'


// IPGEO
// WeatherAPI
export default function HomePage() {
  const [geolocation, setGeolocation] = useState({})
  const [weatherCurrent, setWeatherCurrent] = useState(null)
  const [weatherForecast, setWeatherForecast] = useState(null)
  
  // This does **NOT** ask for permission from user.
  // Remember to implement asking user for permission to geolocate.
  // Also handle if permission is not granted.
  useEffect(() => {
    fetch('/api/getData')
    .then(resp => resp.json())
    .then(data => {
      setGeolocation(data.geolocation)
      setWeatherCurrent(data.weatherCurrent)
      setWeatherForecast(data.weatherForecast)
    })
    
  }, [])
  console.log(geolocation) 
  console.log(weatherCurrent)
  console.log(weatherForecast)

 

  return (
    <>
        <h1>Home Page</h1>
    </>
  )
}