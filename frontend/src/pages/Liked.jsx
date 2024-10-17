import React, { useState } from 'react';
import VerticalNavbar from '../components/NavBar'; // Importing the navbar
import BackGround from "../assets/Dashboard_bg1.jpg";


const LikedImagesPage = () => {
    // Sample liked images
    const likedImages = [
        Img1, // Replace with real image URLs
        Img2,
        Img3,
        Img4,
        Img5,
        Img6,
    ];

    return (
        <div
            className="flex min-h-screen"
            style={{
            backgroundImage: `url(${BackGround})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            }}
        >
        {/* <div className="bg-gray-100 min-h-screen flex"> */}
            {/* Left-side Navbar */}
            <VerticalNavbar />

            {/* Right-side Liked Images */}
            <div className="w-3/4 p-8 ml-64"> {/* Adjust the right content to leave space for the navbar */}
                <h1 className="text-3xl font-bold mb-6">Liked Images</h1>
                <div className="grid grid-cols-3 gap-4">
                    {likedImages.map((image, index) => (
                        <div key={index} className="bg-white p-2 rounded shadow">
                            <img src={image} alt={`Liked ${index + 1}`} className="w-full h-auto rounded"/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LikedImagesPage;
