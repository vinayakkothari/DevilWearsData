import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Sun, TrendingUp, Calendar, User } from 'lucide-react'; // Necessary icons
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import VerticalNavbar from '../components/NavBar';
import introJs from 'intro.js';
import 'intro.js/introjs.css';

// Function to fetch weather data
const fetchWeather = async () => {
    const apiKey = '00eb636dc8f3517f196f5647f4aa8fe3'; // Replace with your OpenWeather API key
    const city = 'Manipal'
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    const data = await response.json();
    return {
        temperature: data.main.temp,
        weather: data.weather[0].description
    };
};

export default function Dashboard() {
    const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);
    const [weather, setWeather] = useState({ temperature: null, weather: null });

    const handleNavbarToggle = () => {
        setIsNavbarExpanded(!isNavbarExpanded);
    };

    useEffect(() => {
        introJs().start();

        // Fetch weather data when the component loads
        const loadWeather = async () => {
            const weatherData = await fetchWeather();
            setWeather(weatherData);
        };
        loadWeather();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen flex">
            {/* Vertical Navbar */}
            <VerticalNavbar isExpanded={isNavbarExpanded} onToggle={handleNavbarToggle} />

            {/* Main Content */}
            <div
                className={`flex-grow p-8 transition-all duration-300 ease-in-out ${isNavbarExpanded ? '-ml-64' : 'ml-16'}`}
                style={{ marginLeft: isNavbarExpanded ? '16rem' : '14rem' }} // Ensure spacing from the navbar
            >
                {/* 2x2 Grid for Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Weather Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-matte-red rounded-xl shadow-md p-4"
                    >
                        <Card className="p-5">
                            <CardHeader className="flex items-center">
                                <Sun className="w-6 h-6 mr-2" />
                                <CardTitle>Today's Weather</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {weather.temperature !== null && weather.weather !== null ? (
                                    <>
                                        <p>{weather.weather} in Manipal</p>
                                        <p>Temperature: {weather.temperature}°C</p>
                                    </>
                                ) : (
                                    <p>Loading weather...</p>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Upcoming Events Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="bg-matte-blue rounded-xl shadow-md p-4"
                    >
                        <Card className="p-5">
                            <CardHeader className="flex items-center">
                                <Calendar className="w-6 h-6 mr-2" />
                                <CardTitle>Upcoming Events</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Event: Fashion Week</p>
                                <p>Date: October 25, 2024</p>
                                <p>Location: New York</p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Leaderboard Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="bg-matte-green rounded-xl shadow-md p-4"
                    >
                        <Card className="p-5">
                            <CardHeader className="flex items-center">
                                <TrendingUp className="w-6 h-6 mr-2" />
                                <CardTitle>Leaderboard</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>1. User123 - 1450 points</p>
                                <p>2. Fashionista45 - 1380 points</p>
                                <p>3. TrendSetter - 1200 points</p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Profile Overview Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="bg-matte-purple rounded-xl shadow-md p-4"
                    >
                        <Card className="p-5">
                            <CardHeader className="flex items-center">
                                <User className="w-6 h-6 mr-2" />
                                <CardTitle>Profile Overview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Username: devilwearsdata</p>
                                <p>Posts: 35</p>
                                <p>Comments: 87</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
