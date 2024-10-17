import React from 'react';
import VerticalNavbar from '../components/NavBar'; 
import FashionSwiper from '../components/Swiper';

export default function MainPage() {
  return (
    <div className="flex h-screen">
      <div className="w-64">
        <VerticalNavbar />
      </div>
      
      <div className="flex-grow">
        <FashionSwiper />
      </div>
    </div>
  );
}