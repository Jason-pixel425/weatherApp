import { useState, useEffect } from 'react'
import { fetchWeatherApi } from 'openmeteo'


// IPGEO
// open-metro
// "lat":-27.7397,"lon":153.138
export default function HomePage() {
  const [weatherData, setData] = useState(null)
  // const [count, setCount] = useState(0)
  const params = {
    "latitude": -27.7397,
    "longitude": 153.138,
    "models": "bom_access_global"
  }
  useEffect(() => {
    fetch('/api/data') // Call your server's endpoint
  .then((response) => response.json())
  .then(data => console.log(data))
  .catch((error) => console.error('Error:', error));
  }, [])


  return (
    <>
        <h1>Home Page</h1>
    </>
  )
}