import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Card, CardContent } from "./ui/card"
import sunImage from '../assets/sun.png'
import leatherImage from '../assets/leather.png'
import slimImage from '../assets/slim.png'
import floralImage from '../assets/floral.png'
import shoeImage from '../assets/shoe.png'

const fetchFashionItems = async () => {
    return [
        { id: '1', image: sunImage, name: 'Summer Dress', category: 'Dresses' },
        { id: '2', image: leatherImage, name: 'Leather Jacket', category: 'Outerwear' },
        { id: '3', image: slimImage, name: 'Slim Fit Jeans', category: 'Pants' },
        { id: '4', image: floralImage, name: 'Floral Blouse', category: 'Tops' },
        { id: '5', image: shoeImage, name: 'Sneakers', category: 'Shoes' },
    ]
}

export default function FashionSwiper() {
    const [items, setItems] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [likes, setLikes] = useState([])
    const [dislikes, setDislikes] = useState([])
    const [swipeCount, setSwipeCount] = useState(0)
    const [swipeDirection, setSwipeDirection] = useState(null)

    const controls = useAnimation()

    useEffect(() => {
        fetchFashionItems().then(setItems)
    }, [])

    const handleSwipe = (direction) => {
        const currentItem = items[currentIndex]
        if (direction === 'right') {
            setLikes([...likes, currentItem.id])
        } else {
            setDislikes([...dislikes, currentItem.id])
        }
        setSwipeCount(swipeCount + 1)
        if (currentIndex < items.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1)
        } else {
            console.log('Swipe session complete. Showing preferences...')
        }
        setSwipeDirection(null)
        controls.start({ x: 0, opacity: 1, rotate: 0 })
    }

    const handleDrag = (event, info) => {
        if (info.offset.x > 50) {
            setSwipeDirection('right')
        } else if (info.offset.x < -50) {
            setSwipeDirection('left')
        } else {
            setSwipeDirection(null)
        }
    }

    const handleDragEnd = (event, info) => {
        const threshold = 100
        if (info.offset.x > threshold) {
            controls.start({ x: '100%', opacity: 0, rotate: 10 }).then(() => handleSwipe('right'))
        } else if (info.offset.x < -threshold) {
            controls.start({ x: '-100%', opacity: 0, rotate: -10 }).then(() => handleSwipe('left'))
        } else {
            controls.start({ x: 0, opacity: 1, rotate: 0 })
            setSwipeDirection(null)
        }
    }

    if (items.length === 0) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    const currentItem = items[currentIndex]

    return (
        <div className="flex flex-col items-center justify-center h-screen p-4">
            <motion.div
                className="w-full max-w-sm h-full overflow-hidden relative rounded-lg"
                style={{
                    backgroundColor: swipeDirection === 'right' ? 'rgba(34, 197, 94, 0.2)' : swipeDirection === 'left' ? 'rgba(239, 68, 68, 0.2)' : 'white'
                }}
            >
                <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                    animate={controls}
                    className="cursor-grab active:cursor-grabbing h-full rounded-lg"
                    whileTap={{ scale: 0.95 }}
                    style={{ x: 0, rotate: 0 }}
                >
                    <CardContent className="p-0 relative h-full rounded-lg">
                        <img
                            src={currentItem.image}
                            alt={currentItem.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                            <h2 className="text-white text-xl font-bold">{currentItem.name}</h2>
                            <p className="text-white text-sm">{currentItem.category}</p>
                        </div>
                    </CardContent>
                </motion.div>
                <motion.div
                    className="absolute top-4 left-4 bg-green-500 rounded-full p-2 text-white font-bold"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: swipeDirection === 'right' ? 1 : 0, scale: swipeDirection === 'right' ? 1 : 0 }}
                >
                    LIKE
                </motion.div>
                <motion.div
                    className="absolute top-4 right-4 bg-red-500 rounded-full p-2 text-white font-bold"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: swipeDirection === 'left' ? 1 : 0, scale: swipeDirection === 'left' ? 1 : 0 }}
                >
                    NOPE
                </motion.div>
            </motion.div>
            <p className="mt-4 text-white">Swipe Count: {swipeCount}</p>
            {swipeCount < 5 ? (
                <p className="mt-2 text-white text-sm">Swipe right to like, left to dislike</p>
            ) : (
                <p className="mt-2 text-white text-sm">You've swiped through all the items!</p>
            )}
        </div>
    )
}
