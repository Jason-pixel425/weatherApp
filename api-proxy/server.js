import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config()

const app = express();
const PORT = 3001;

const API_KEY = process.env.API_Key;

app.get('/api/geolocate', async(req, res) => {
    try {
        const response = await fetch('https://api.techniknews.net/ipgeo')
        const data = await response.json()
        res.json(data)
    } catch(error){
        res.status(500).json({error: 'Error geolocating'})
    }
})

app.get('/api/weatherdata', async(req, res) => {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=-27.7397,153.138&aqi=no`)
        const data = await response.json();
        res.json(data)
    } catch(err) {
        res.status(500).json({error: 'Server error'})
        console.log(err)
    }
})

// app.get('/api/data', async (req, res) => {
//     try {
//       res.json({ message: "API data response works!" }); // Test response
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to fetch data' });
//     }
//   });

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))