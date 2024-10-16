import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Card, CardContent } from "./ui/card"

const fetchFashionItems = async () => {
    // This would typically be an API call. For this example, we'll return mock data.
    return [
        { id: '1', image: '/placeholder.svg?height=400&width=300', name: 'Summer Dress', category: 'Dresses' },
        { id: '2', image: '/placeholder.svg?height=400&width=300', name: 'Leather Jacket', category: 'Outerwear' },
        { id: '3', image: '/placeholder.svg?height=400&width=300', name: 'Slim Fit Jeans', category: 'Pants' },
        { id: '4', image: '/placeholder.svg?height=400&width=300', name: 'Floral Blouse', category: 'Tops' },
        { id: '5', image: '/placeholder.svg?height=400&width=300', name: 'Sneakers', category: 'Shoes' },
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

    useEffect(() => {
        if (swipeCount > 0 && swipeCount % 10 === 0) {
            console.log('Preferences after 10 swipes:', {
                likes: likes.slice(-10),
                dislikes: dislikes.slice(-10)
            })
        }
    }, [swipeCount, likes, dislikes])

    const handleSwipe = (direction) => {
        const currentItem = items[currentIndex]
        if (direction === 'right') {
            setLikes([...likes, currentItem.id])
        } else {
            setDislikes([...dislikes, currentItem.id])
        }
        setSwipeCount(swipeCount + 1)
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
        setSwipeDirection(null)
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
        const threshold = 100 // Increased threshold for more deliberate swipes
        if (info.offset.x > threshold) {
            controls.start({ x: '100%', opacity: 0, rotate: 10 })
            handleSwipe('right')
        } else if (info.offset.x < -threshold) {
            controls.start({ x: '-100%', opacity: 0, rotate: -10 })
            handleSwipe('left')
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
            <Card className="w-full max-w-sm h-full overflow-hidden relative">
                <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                    animate={controls}
                    className="cursor-grab active:cursor-grabbing h-full"
                    whileTap={{ scale: 0.95 }}
                    style={{ x: 0, rotate: 0 }}
                >
                    <CardContent className="p-0 relative h-full">
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
            </Card>
            <p className="mt-4 text-white">Swipe Count: {swipeCount}</p>
            <p className="mt-2 text-white text-sm">Swipe right to like, left to dislike</p>
        </div>
    )
}
