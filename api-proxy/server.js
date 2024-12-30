import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import NodeCache from 'node-cache'

dotenv.config()

const app = express();
const PORT = 3001;

const WEATHERAPI_API_KEY = process.env.WEATHERAPI_API_Key;


// Initialze cache 
//  data lives for 15 mins
const cache = new NodeCache({ stdTTL: 900 })


// Fetch data
app.get('/api/getData', async(req, res) => {
    const cacheKey = 'combinedData'
    

    // Returned cached data if exists
    if (cache.has(cacheKey)) {
        console.log('returning cached combined data')
        return res.json(cache.get(cacheKey))
    }

    // Fetch data if not cached
    try {
        const geoResponse = await fetch('https://api.techniknews.net/ipgeo')
        const geoData = await geoResponse.json()

        const weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHERAPI_API_KEY}&q=${geoData.lat},${geoData.lon}&days=4&aqi=no`)
        const weatherData = await weatherResponse.json();

        // This is needed as the weather current does not include astro data for the current day.
        // const weatherAstroResponse = await fetch('https//api.weather.com/v1')
        console.log(weatherData)
        const combinedData = {
            geolocation: weatherData.location, 
            weatherCurrent: weatherData.current,
            weatherForecast: weatherData.forecast
        }

        // cache data before returning
        cache.set(cacheKey, combinedData)
        console.log("returning new Data")
        res.json(combinedData)
    } catch(error){
        res.status(500).json({error: 'Error'})
    }
})

// Fetch weather data using weatherapi
// app.get('/api/weatherdata', async(req, res) => {
//     try {
//         const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=&aqi=no`)
//         const data = await response.json();
//         res.json(data)
//     } catch(err) {
//         res.status(500).json({error: 'Server error'})
//         console.log(err)
//     }
// })


// app.get('/api/data', async (req, res) => {
//     try {
//       res.json({ message: "API data response works!" }); // Test response
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to fetch data' });
//     }
//   });

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
