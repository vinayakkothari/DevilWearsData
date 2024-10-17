import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Award } from 'lucide-react'; // Icons for better design
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/Button.jsx';
import VerticalNavbar from '../components/NavBar'; // Importing the navbar
import BackGround from "../assets/Dashboard_bg1.jpg";

const challengesData = [
    { id: 1, title: 'Complete 5 Swipes', points: 50, description: 'Swipe through 5 fashion items to complete this challenge!' },
    { id: 2, title: 'Attend Fashion Week', points: 100, description: 'Join the Fashion Week and be a part of the trending events.' },
    { id: 3, title: 'Share Your Favorite Outfit', points: 75, description: 'Post your favorite outfit and inspire others!' },
    { id: 4, title: 'Share your thoughts', points: 80, description: 'Post your thoughts in the community.' },
    { id: 5, title: 'Get Started', points: 50, description: 'Take the tutorial on how to use the app.' },
];

export default function Challenges() {
    const [completedChallenges, setCompletedChallenges] = useState([]);
    const [isNavbarExpanded, setIsNavbarExpanded] = useState(false); // State to toggle navbar

    const handleNavbarToggle = () => {
        setIsNavbarExpanded(!isNavbarExpanded);
    };

    const completeChallenge = (challengeId) => {
        if (!completedChallenges.includes(challengeId)) {
            setCompletedChallenges(prevChallenges => [...prevChallenges, challengeId]);
            // Logic to add points goes here
        }
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
            {/* Vertical Navbar */}
            <VerticalNavbar isExpanded={isNavbarExpanded} onToggle={handleNavbarToggle} />

            <div
                className={`flex-grow transition-all duration-300 ease-in-out ${isNavbarExpanded ? 'ml-16' : 'ml-64'}`}
            >
                <div className="flex justify-between items-center p-4 bg-white shadow">
                    <h1 className="text-2xl font-bold">Community Forum</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                    {challengesData.map((challenge) => (
                        <motion.div
                            key={challenge.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="bg-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
                        >
                            <Card className="p-6">
                                <CardHeader className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <Award className="w-8 h-8 text-purple-600" />
                                        <CardTitle className="text-xl font-semibold text-gray-700">
                                            {challenge.title}
                                        </CardTitle>
                                    </div>
                                    {completedChallenges.includes(challenge.id) && (
                                        <CheckCircle className="w-8 h-8 text-green-500" />
                                    )}
                                </CardHeader>
                                <CardContent className="mt-4 text-gray-600">
                                    <p>{challenge.description}</p>
                                    <div className="mt-4">
                                        <span className="inline-block text-sm font-medium text-purple-500">
                                            Points: {challenge.points}
                                        </span>
                                    </div>
                                    <div className="mt-6">
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            className={`w-full py-2 ${completedChallenges.includes(challenge.id) ? 'bg-green-500' : 'bg-purple-600'}`}
                                            disabled={completedChallenges.includes(challenge.id)}
                                            onClick={() => completeChallenge(challenge.id)}
                                        >
                                            {completedChallenges.includes(challenge.id) ? 'Completed' : 'Complete Challenge'}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

