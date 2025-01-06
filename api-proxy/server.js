
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Ensure consistent environment variable usage
const WEATHERAPI_API_KEY = process.env.WEATHERAPI_API_KEY;
const GEOAPIFY_API_KEY = process.env.GEOAPIFY_API_KEY;

app.use(cors({
    origin: '*', // Allows all origins. Replace with specific domains in production.
    methods: ['GET'],
    allowedHeaders: ['Content-Type']
}));
// Ensure the API keys are defined
if (!WEATHERAPI_API_KEY || !GEOAPIFY_API_KEY) {
    console.error('API keys are missing in the .env file');
    process.exit(1);
}

// Cache setup (15 mins)
const cache = new NodeCache({ stdTTL: 900 });



app.get('/api/getData', async (req, res) => {
    const cacheKey = 'combinedData';

    if (cache.has(cacheKey)) {
        console.log('Returning cached data');
        return res.json(cache.get(cacheKey));
    }

    try {
        const geoResponse = await fetch('https://api.techniknews.net/ipgeo');
        const geoData = await geoResponse.json();

        const weatherResponse = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${WEATHERAPI_API_KEY}&q=${geoData.lat},${geoData.lon}&days=4&aqi=no`
        );
        const weatherData = await weatherResponse.json();

        const combinedData = {
            geolocation: weatherData.location,
            weatherCurrent: weatherData.current,
            weatherForecast: weatherData.forecast,
        };

        cache.set(cacheKey, combinedData);
        res.json(combinedData);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
});

app.get('/api/search', async (req, res) => {
    const { query } = req.query;

    if (!query || query.length <= 3) {
        return res.status(400).json({ error: 'Query must be at least 4 characters long.' });
    }
    try {
        const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${GEOAPIFY_API_KEY}`);
        const data = await response.json();
        res.json(data.features || []);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch geolocation data.' });
    }
});

app.get('/api/searchweather', async (req, res) => {
    const { lat, lon } = req.query;
    const cacheKey = `searchData_${lat}_${lon}`;

    if (cache.has(cacheKey)) {
        console.log('Returning cached search data');
        return res.json(cache.get(cacheKey));
    }

    try {
        const weatherResponse = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${WEATHERAPI_API_KEY}&q=${lat},${lon}&days=4&aqi=no`
        );
        const weatherData = await weatherResponse.json();

        const combinedData = {
            geolocation: weatherData.location,
            weatherCurrent: weatherData.current,
            weatherForecast: weatherData.forecast,
        };

        cache.set(cacheKey, combinedData);
        res.json(combinedData);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
