import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherComponent = ({ location }) => {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=71a1d54910fc34b8989358aaf59ab093`);
                setWeather(response.data);
            } catch (error) {
                console.error("Error fetching weather data", error);
            }
        };

        const fetchForecast = async () => {
            try {
                const response = await axios.get(`/https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`);
                setForecast(response.data);
            } catch (error) {
                console.error("Error fetching forecast data", error);
            }
        };

        fetchWeather();
        fetchForecast();
    }, [location]);

    if (!weather || !forecast) return <div>Loading...</div>;

    return (
        <div>
            <h1>Weather in {weather.name}</h1>
            <p>Temperature: {weather.main.temp}</p>
            <p>High: {weather.main.temp_max}</p>
            <p>Low: {weather.main.temp_min}</p>
            <p>Humidity: {weather.main.humidity}</p>

            <h2>Hourly Forecast</h2>
            {/* Render hourly forecast */}

            <h2>Weekly Forecast</h2>
            {/* Render weekly forecast */}
        </div>
    );
};

export default WeatherComponent;
