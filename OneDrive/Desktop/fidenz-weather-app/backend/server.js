import express from 'express';
import cors from 'cors';
import axios from 'axios';
import NodeCache from 'node-cache';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const app = express();
const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes cache

// Middleware
app.use(cors());
app.use(express.json());

// Read cities from JSON file and extract CityCodes
function getCityCodes() {
  try {
    const citiesData = fs.readFileSync('./cities.json', 'utf8');
    const citiesJson = JSON.parse(citiesData);
    
    // Extract CityCode values from the List array
    const cityCodes = citiesJson.List.map(city => parseInt(city.CityCode));
    
    console.log(`Loaded ${cityCodes.length} cities from cities.json`);
    return cityCodes;
  } catch (error) {
    console.error('Error reading cities.json:', error);
    // Fallback to default cities if file not found
    return [1248991, 1850147, 2644210, 2988507, 2147714];
  }
}

// Weather API route
app.get('/api/weather', async (req, res) => {
  try {
    const weatherData = await getWeatherData();
    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

async function getWeatherData() {
  const cityCodes = getCityCodes();
  
  const weatherPromises = cityCodes.map(async (cityId) => {
    // Check cache first
    const cachedData = cache.get(cityId);
    if (cachedData) {
      console.log(`Cache hit for city ${cityId}`);
      return cachedData;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
      );
      
      const weatherData = {
        id: cityId,
        name: response.data.name,
        description: response.data.weather[0].description,
        temp: Math.round(response.data.main.temp),
        icon: response.data.weather[0].icon,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed
      };
      
      // Cache the data for 5 minutes
      cache.set(cityId, weatherData);
      console.log(`Fetched fresh data for ${response.data.name}`);
      
      return weatherData;
    } catch (error) {
      console.error(`Error fetching weather for city ${cityId}:`, error.message);
      return {
        id: cityId,
        name: 'Unknown',
        description: 'Data unavailable',
        temp: 'N/A',
        icon: '01d',
        humidity: 'N/A',
        windSpeed: 'N/A'
      };
    }
  });
  
  const results = await Promise.all(weatherPromises);
  return results.filter(city => city !== null);
}

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Weather API is running' });
});

// Original cities data route (to show the original JSON structure)
app.get('/api/cities-original', (req, res) => {
  try {
    const citiesData = fs.readFileSync('./cities.json', 'utf8');
    const cities = JSON.parse(citiesData);
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: 'Could not load cities data' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📊 Loaded cities from cities.json (exact assignment format)`);
  console.log(`🌤️  Weather API: http://localhost:${PORT}/api/weather`);
  console.log(`🏙️  Original Cities Data: http://localhost:${PORT}/api/cities-original`);
});