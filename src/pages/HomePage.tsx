import { useState, useEffect } from 'react'


// IPGEO
// WeatherAPI
// "lat":-27.7397,"lon":153.138
export default function HomePage() {
  const [geoLocation, setGeolocation] = useState(null)
  const [weatherData, setData] = useState(null)
  
  // This function does **NOT** ask for permission from user.
  // Remember to implement asking user for permission to geolocate.
  // Also handle if permission is not granted.
  // useEffect(() => {
  //   fetch('/api/geolocate')
  //   .then(resp => resp.json())
  //   .then(data => {
  //     setGeolocation({
  //       lat: data.lat,
  //       lon: data.lon
  //     })
  //   })
  // }, [])
  // geoLocation ? console.log(geoLocation) : null


  // useEffect(() => {
  //   fetch('/api/weatherdata') // Call your server's endpoint
  // .then((response) => response.json())
  // .then(data => console.log(data))
  // .catch((error) => console.error('Error:', error));
  // }, [])


  return (
    <>
        <h1>Home Page</h1>
    </>
  )
}