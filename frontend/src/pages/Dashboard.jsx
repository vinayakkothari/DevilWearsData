import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, TrendingUp, Calendar, HandIcon } from 'lucide-react'; // Necessary icons
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import VerticalNavbar from '../components/NavBar';
import introJs from 'intro.js';
import 'intro.js/introjs.css';
import { Button } from "../components/ui/Button.jsx";
import { Player } from '@lottiefiles/react-lottie-player'; // Import Lottie Player
import BackGround from "../assets/Dashboard_bg1.jpg";


// Import Lottie animations
import sunnyAnimation from '../assets/animations/sunny.json';
import cloudyAnimation from '../assets/animations/cloudy.json';
import rainAnimation from '../assets/animations/rainy.json';

// Function to fetch weather data
const fetchWeather = async () => {
    const apiKey = '00eb636dc8f3517f196f5647f4aa8fe3'; // Replace with your OpenWeather API key
    const city = 'Manipal';
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    const data = await response.json();
    return {
        temperature: data.main.temp,
        weather: data.weather[0].main.toLowerCase() // 'Clear', 'Clouds', 'Rain', etc.
    };
};

export default function Dashboard() {
    const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);
    const [weather, setWeather] = useState({ temperature: null, weather: null });
    const [points, setPoints] = useState(0); // Points state for leaderboard
    const [leaderboard, setLeaderboard] = useState([
        { user: 'User123', points: 1450 },
        { user: 'Fashionista45', points: 1380 },
        { user: 'TrendSetter', points: 1200 }
    ]); // Dummy leaderboard data

    const handleNavbarToggle = () => {
        setIsNavbarExpanded(!isNavbarExpanded);
    };

    const startTutorial = () => {
        introJs().start();
    };

    const navigate = useNavigate();

    // Fetch weather data when the component loads
    useEffect(() => {
        const loadWeather = async () => {
            const weatherData = await fetchWeather();
            setWeather(weatherData);
        };
        loadWeather();
    }, []);

    // Function to render appropriate weather animation based on weather type
    const renderWeatherAnimation = () => {
        return (
            <div className="flex justify-center items-center">
                <Player
                    autoplay
                    loop
                    src={
                        weather.weather === 'clear'
                            ? sunnyAnimation
                            : weather.weather === 'clouds'
                                ? cloudyAnimation
                                : weather.weather === 'rain'
                                    ? rainAnimation
                                    : sunnyAnimation
                    }
                    className="weather-animation" // Apply sizing here
                    style={{ width: '150px', height: '150px' }} // Set specific size
                />
            </div>
        );
    };

    // Function to render the podium for the leaderboard
    const renderLeaderboardPodium = () => {
        return (
            <div className="flex justify-around items-end">
                {/* Second Place */}
                <div className="bg-gray-600 rounded-t-lg flex flex-col items-center justify-end h-12 w-20">
                    <span role="img" aria-label="second-place" className="text-3xl">🥈</span>
                    <p className="text-center text-sm font-bold mt-2">{leaderboard[1].user}</p>
                    <p className="text-center text-xs">{leaderboard[1].points} pts</p>
                </div>


                {/* First Place */}
                <div className="bg-yellow-400 rounded-t-lg flex flex-col items-center justify-end h-30 w-20">
                    <span role="img" aria-label="first-place" className="text-3xl">🥇</span>
                    <p className="text-center text-sm font-bold mt-2">{leaderboard[0].user}</p>
                    <p className="text-center text-xs">{leaderboard[0].points} pts</p>
                </div>

                {/* Third Place */}
                <div className="bg-orange-500 rounded-t-lg flex flex-col items-center justify-end h-10 w-20">
                    <span role="img" aria-label="third-place" className="text-3xl">🥉</span>
                    <p className="text-center text-sm font-bold mt-2">{leaderboard[2].user}</p>
                    <p className="text-center text-xs">{leaderboard[2].points} pts</p>
                </div>
            </div>
        );
    };

    return (
        <div
            className="flex min-h-screen"
            style={{
            backgroundImage: `url(${BackGround})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            }}
        >
        {/* <div className="bg-gray-100 min-h-screen flex">  */}
            {/* Vertical Navbar */}
            <VerticalNavbar isExpanded={isNavbarExpanded} onToggle={handleNavbarToggle}/>
            <div
                className={`flex-grow p-8 transition-all duration-300 ease-in-out ${isNavbarExpanded ? '-ml-64' : 'ml-16'}`}
                style={{marginLeft: isNavbarExpanded ? '16rem' : '14rem' }} // Ensure spacing from the navbar
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Swipe Through Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="bg-gray-400 rounded-xl shadow-md p-4 h-72" // Grey color for challenges card
                        data-intro="Click to Swipe."
                    >
                        <Card className="p-5 h-full">
                            <CardHeader className="flex items-center">
                                <HandIcon className="w-6 h-6 mr-2" />
                                <CardTitle>Swipe through!</CardTitle>
                            </CardHeader>
                            <CardContent className="flex justify-center items-center">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="mt-8 py-3 px-6 text-lg font-semibold rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white transform hover:scale-105 transition-transform duration-300 ease-in-out"
                                    onClick={() => navigate('/swipe')}
                                >
                                    Start Swiping
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Weather Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-gray-400 rounded-xl shadow-md p-4 h-72" // Grey color for challenges card
                        data-intro="This card shows today's weather in your city."
                    >
                        <Card className="p-5 h-full">
                            <CardHeader className="flex items-center">
                                <Sun className="w-6 h-6 mr-2" />
                                <CardTitle>Today's Weather</CardTitle>
                            </CardHeader>
                            <CardContent className="relative">
                                {weather.temperature !== null && weather.weather !== null ? (
                                    <>
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-50 z-0">
                                            {renderWeatherAnimation()}
                                        </div>
                                        <div className="relative z-10">
                                            <p className="text-center text-lg mt-4">
                                                {weather.weather.charAt(0).toUpperCase() + weather.weather.slice(1)} in Manipal
                                            </p>
                                            <p className="text-center text-sm">Temperature: {weather.temperature}°C</p>
                                        </div>
                                    </>
                                ) : (
                                    <p>Loading weather...</p>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Leaderboard Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="bg-gray-400 rounded-xl shadow-md p-4 h-72" // Grey color for challenges card
                        data-intro="Check the leaderboard here."
                    >
                        <Card className="p-5 h-full">
                            <CardHeader className="flex items-center">
                                <TrendingUp className="w-6 h-6 mr-2" />
                                <CardTitle>Leaderboard</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col justify-center items-center overflow-hidden">
                                {renderLeaderboardPodium()}
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Upcoming Events Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="bg-gray-400 rounded-xl shadow-md p-4 h-72" // Grey color for challenges card
                        data-intro="This card lists upcoming events."
                    >
                        <Card className="p-5 h-full">
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
                </div>

                {/* Start Tutorial Button */}
                <button
                    onClick={startTutorial}
                    className="fixed bottom-8 right-8 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-500 transition"
                    data-intro="Click here to start the tour!"
                >
                    Start Tutorial
                </button>
            </div>
        </div>
    );
}
