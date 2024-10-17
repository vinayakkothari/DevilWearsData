import React from 'react';
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from "../components/ui/Button.jsx";
import {Link} from "react-router-dom";

const MoodBoard = () => {
    const boards = [
        {
            id: 1,
            title: 'Casual Men\'s' ,
            embedId: '930204498029462219', // Replace with your board's embed ID
        },
        {
            id: 2,
            title: 'Indian Men\'s' ,
            embedId: '930204498029462226', // Replace with your board's embed ID
        },
        {
            id: 3,
            title: 'Indian Women\'s',
            embedId: '930204498029462208', // Replace with your board's embed ID
        },
        {
            id: 4,
            title: ' ',
            embedId: '1043427807402442780', // Replace with your board's embed ID
        },
    ];

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="flex justify-between items-center p-4 bg-white shadow">
                <h1 className="text-3xl font-bold">Mood boards</h1>
                <Link to="/dashboard">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
                        Back to Dashboard
                    </button>
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {boards.map(board => (
                    <motion.div
                        key={board.id}
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: 0.5}}
                        className="bg-white rounded-xl shadow-md p-4 overflow-hidden" // Added overflow-hidden
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
                                    }} // Ensuring the container handles overflow
                                >
                                    <iframe
                                        src={`https://assets.pinterest.com/ext/embed.html?id=${board.embedId}`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            border: 'none'
                                        }} // Make iframe responsive
                                        scrolling="no"
                                    ></iframe>
                                </div>

                                {/*<Button*/}
                                {/*    variant="secondary"*/}
                                {/*    size="sm"*/}
                                {/*    onClick={() => window.open(`https://www.pinterest.com/YOUR_USERNAME/BOARD_NAME`, '_blank')}*/}
                                {/*>*/}
                                {/*    Open Board*/}
                                {/*</Button>*/}
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default MoodBoard;
