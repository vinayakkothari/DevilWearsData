// import React, { useEffect, useState } from 'react';
// import { motion } from "framer-motion";
// import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
// import {Link} from "react-router-dom";
// import VerticalNavbar from '../components/NavBar'; // Importing the navbar

// const [isNavbarExpanded, setIsNavbarExpanded] = useState(false); // State for navbar expansion

// const Profile = () => {
//     const [userProfile, setUserProfile] = useState({
//         avatar: '',
//         swipes: 0,
//         dateJoined: '',
//         points: 0,
//     });

//     // Function to generate a random avatar image token
//     const generateAvatar = () => {
//         const randomId = Math.floor(Math.random() * 1000); // Change the range as needed
//         return `https://randomuser.me/api/portraits/men/${randomId}.jpg`; // Change to 'women' for female avatars
//     };

//     useEffect(() => {
//         // Simulate fetching user profile data
//         const fetchUserProfile = () => {
//             setUserProfile({
//                 avatar: generateAvatar(),
//                 swipes: Math.floor(Math.random() * 100), // Random swipes count
//                 dateJoined: new Date().toLocaleDateString(), // Current date as join date
//                 points: Math.floor(Math.random() * 500), // Random points
//             });
//         };
//         fetchUserProfile();
//     }, []);

//     return (
//         <div className="bg-gray-100 min-h-screen p-8">
//             <div className="flex justify-between items-center p-4 bg-white shadow">
//             <VerticalNavbar isExpanded={isNavbarExpanded} onToggle={() => setIsNavbarExpanded(!isNavbarExpanded)} />

//                 <h1 className="text-2xl font-bold">Community Forum</h1>
//                 <Link to="/dashboard">
//                     <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
//                         Back to Dashboard
//                     </button>
//                 </Link>
//             </div>
//             <motion.div
//                 initial={{opacity: 0, y: 50}}
//                 whileInView={{opacity: 1, y: 0}}
//                 transition={{duration: 0.5, delay: 0.5}}
//                 className="bg-white rounded-xl shadow-md p-6"
//             >
//                 <Card>
//                     <CardHeader className="flex items-center">
//                         <img src={userProfile.avatar} alt="Avatar" className="w-20 h-20 rounded-full mr-4"/>
//                         <CardTitle className="text-2xl">User Profile</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <p><strong>Number of Swipes:</strong> {userProfile.swipes}</p>
//                         <p><strong>Date Joined:</strong> {userProfile.dateJoined}</p>
//                         <p><strong>Points:</strong> {userProfile.points}</p>
//                     </CardContent>
//                 </Card>
//             </motion.div>
//         </div>
//     );
// };

// export default Profile;

import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Link } from "react-router-dom";
import VerticalNavbar from '../components/NavBar'; // Importing the navbar

const Profile = () => {
    const [isNavbarExpanded, setIsNavbarExpanded] = useState(false); // State for navbar expansion
    const [userProfile, setUserProfile] = useState({
        avatar: '',
        swipes: 0,
        dateJoined: '',
        points: 0,
    });

    // Function to generate a random avatar image token
    const generateAvatar = () => {
        const randomId = Math.floor(Math.random() * 1000); // Change the range as needed
        return `https://randomuser.me/api/portraits/men/${randomId}.jpg`; // Change to 'women' for female avatars
    };

    useEffect(() => {
        // Simulate fetching user profile data
        const fetchUserProfile = () => {
            setUserProfile({
                avatar: generateAvatar(),
                swipes: Math.floor(Math.random() * 100), // Random swipes count
                dateJoined: new Date().toLocaleDateString(), // Current date as join date
                points: Math.floor(Math.random() * 500), // Random points
            });
        };
        fetchUserProfile();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen p-8 flex">
            {/* Left-side Navbar */}
            <div className="w-1/4">
                <VerticalNavbar isExpanded={isNavbarExpanded} onToggle={() => setIsNavbarExpanded(!isNavbarExpanded)} />
            </div>

            {/* Right-side Profile */}
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
                    <Card>
                        <CardHeader className="flex items-center">
                            <img src={userProfile.avatar} alt="Avatar" className="w-20 h-20 rounded-full mr-4" />
                            <CardTitle className="text-2xl">User Profile</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p><strong>Number of Swipes:</strong> {userProfile.swipes}</p>
                            <p><strong>Date Joined:</strong> {userProfile.dateJoined}</p>
                            <p><strong>Points:</strong> {userProfile.points}</p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;

