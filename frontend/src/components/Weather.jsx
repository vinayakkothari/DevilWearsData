import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Lottie from 'react-lottie';
import sunnyAnimation from '../assets/animations/sunny.json';
import cloudyAnimation from '../assets/animations/cloudy.json';
import rainyAnimation from '../assets/animations/rainy.json';

// Replace with your OpenWeatherMap API key
const apiKey = 'YOUR_API_KEY';

const weatherAnimations = {
    Clouds: cloudyAnimation,
    Clear: sunnyAnimation,
    Rain: rainyAnimation,
};

export default function WeatherComponent() {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchWeather = async () => {
        try {
            // Fetch weather data from OpenWeatherMap API
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`
            );
            setWeatherData(response.data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather();
    }, []);

    const getWeatherAnimation = (weatherCondition) => {
        return weatherAnimations[weatherCondition] || sunnyAnimation; // Default to sunny if no match
    };

    if (loading) {
        return <div>Loading weather data...</div>;
    }

    if (error) {
        return <div>Error fetching weather data.</div>;
    }

    const weatherCondition = weatherData.weather[0].main;
    const temperature = weatherData.main.temp;
    const location = weatherData.name;

    const animationOptions = {
        loop: true,
        autoplay: true,
        animationData: getWeatherAnimation(weatherCondition),
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen p-4 bg-blue-100 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Today's Weather in {location}</h2>
            <Lottie options={animationOptions} height={300} width={300} />
            <p className="text-lg mt-4">Condition: {weatherCondition}</p>
            <p className="text-lg mt-1">Temperature: {temperature}°C</p>
        </div>
    );
}
