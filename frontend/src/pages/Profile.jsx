import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import VerticalNavbar from '../components/NavBar'; 
import BackGround from "../assets/Dashboard_bg1.jpg";

const Profile = () => {
    const [isNavbarExpanded, setIsNavbarExpanded] = useState(false); // State for navbar expansion
    const [userProfile, setUserProfile] = useState(null); // State for user profile data
    const [loading, setLoading] = useState(true); // State for loading indicator

    useEffect(() => {
        const fetchUserProfile = async () => {
            const userId = localStorage.getItem('userId'); // Get userId from local storage
            if (!userId) return; // Return if no userId is found

            try {
                const response = await fetch(`http://localhost:3000/api/users/getUserInfo?userId=${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user profile');
                }

                const data = await response.json();
                setUserProfile(data.user); // Set the user profile data
            } catch (error) {
                console.error("Error fetching user profile:", error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchUserProfile();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Loading indicator while fetching data
    }

    return (
        <div
            className="flex min-h-screen"
            style={{
                backgroundImage: `url(${BackGround})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="w-1/4">
                <VerticalNavbar isExpanded={isNavbarExpanded} onToggle={() => setIsNavbarExpanded(!isNavbarExpanded)} />
            </div>

            <div className="w-3/4 pl-8">
                <div className="flex justify-between items-center p-4 bg-white shadow mb-4">
                    <h1 className="text-2xl font-bold">Community Forum</h1>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="bg-white rounded-xl shadow-md p-6"
                >
                    {userProfile && ( // Check if userProfile is available
                        <Card>
                            <CardHeader className="flex items-center">
                                <img src={userProfile.avatar || '/default-avatar.png'} alt="Avatar" className="w-20 h-20 rounded-full mr-4" />
                                <CardTitle className="text-2xl">{userProfile.username}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p><strong>UserName:</strong> {userProfile.username}</p>
                                <p><strong>Points:</strong> {userProfile.points}</p>
                            </CardContent>
                        </Card>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;
