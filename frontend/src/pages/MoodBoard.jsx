import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Link } from "react-router-dom";
import VerticalNavbar from '../components/NavBar';  // Import Vertical Navbar

const MoodBoard = () => {
    const [isNavbarExpanded, setIsNavbarExpanded] = useState(false); // State to manage navbar

    const handleNavbarToggle = () => {
        setIsNavbarExpanded(!isNavbarExpanded); // Toggle navbar expansion
    };

    const boards = [
        {
            id: 1,
            title: 'Casual Men\'s',
            embedId: '930204498029462219',
        },
        {
            id: 2,
            title: 'Indian Men\'s',
            embedId: '930204498029462226',
        },
        {
            id: 3,
            title: 'Indian Women\'s',
            embedId: '930204498029462208',
        },
        {
            id: 4,
            title: 'Evening Wear',
            embedId: '1043427807402442780',
        },
    ];

    return (
        <div className="bg-gray-100 min-h-screen flex">
            {/* Vertical Navbar */}
            <VerticalNavbar isExpanded={isNavbarExpanded} onToggle={handleNavbarToggle} />

            <div
                className={`flex-grow p-8 transition-all duration-300 ease-in-out ${isNavbarExpanded ? '-ml-64' : 'ml-16'}`}
                style={{ marginLeft: isNavbarExpanded ? '16rem' : '14rem' }} // Ensure spacing from the navbar
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 bg-white shadow">
                    <h1 className="text-3xl font-bold">Mood boards</h1>
                </div>

                {/* Mood Boards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {boards.map(board => (
                        <motion.div
                            key={board.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="bg-white rounded-xl shadow-md p-4 overflow-hidden"
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>{board.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div
                                        className="pinterest-board"
                                        style={{
                                            width: '100%',
                                            height: '400px',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <iframe
                                            src={`https://assets.pinterest.com/ext/embed.html?id=${board.embedId}`}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                border: 'none'
                                            }}
                                            scrolling="no"
                                        ></iframe>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MoodBoard;

