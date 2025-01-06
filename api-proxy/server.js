import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Ensure consistent environment variable usage
const WEATHERAPI_API_KEY = process.env.WEATHERAPI_API_KEY;
const GEOAPIFY_API_KEY = process.env.GEOAPIFY_API_KEY;

// Ensure the API keys are defined
if (!WEATHERAPI_API_KEY || !GEOAPIFY_API_KEY) {
    console.error('API keys are missing in the .env file');
    process.exit(1);
}

// Cache setup (15 mins)
const cache = new NodeCache({ stdTTL: 900 });

// Path setup for static file serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve React build files for production
app.use(express.static(path.join(__dirname, 'dist')));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


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
