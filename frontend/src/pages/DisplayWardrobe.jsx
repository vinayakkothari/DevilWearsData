import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique IDs

const DisplayWardrobe = () => {
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [shirtItems, setShirtItems] = useState([]); // State for shirt items
    const [pantItems, setPantItems] = useState([]); // State for pant items
    const [userId, setUserId] = useState('');
    const [userImage, setUserImage] = useState(null); // State for user image

    // Get user ID from local storage
    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            console.log("No userId found in localStorage.");
        }
    }, []);

    // Fetch clothing items based on user ID
    useEffect(() => {
        const fetchClothingItems = async () => {
            if (!userId) return; // Don't fetch if userId is not set

            try {
                const response = await fetch(`http://localhost:3000/api/images/getImages?userId=${userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                // Ensure the fetched data is an array
                if (!Array.isArray(data)) {
                    throw new Error('Fetched data is not an array');
                }

                console.log(data);
                setImages(data);
                setCategories([...new Set(data.map((item) => item.category))]);
            } catch (error) {
                console.error("Error fetching clothing items:", error);
            }
        };

        fetchClothingItems();
        console.log("Fetching clothing items for user:", userId);
    }, [userId]);

    // Handle drag start event
    const handleDragStart = (event, image) => {
        event.dataTransfer.setData("image", JSON.stringify(image));
    };

    // Handle drop event on shirt area
    const handleDropShirt = (event) => {
        event.preventDefault();
        const image = JSON.parse(event.dataTransfer.getData("image"));
        const shirtArea = event.target.getBoundingClientRect();
        const x = event.clientX - shirtArea.left;
        const y = event.clientY - shirtArea.top;

        setShirtItems((prevItems) => [
            ...prevItems,
            { ...image, x, y, id: uuidv4() },
        ]);
    };

    // Handle drop event on pant area
    const handleDropPant = (event) => {
        event.preventDefault();
        const image = JSON.parse(event.dataTransfer.getData("image"));
        const pantArea = event.target.getBoundingClientRect();
        const x = event.clientX - pantArea.left;
        const y = event.clientY - pantArea.top;

        setPantItems((prevItems) => [
            ...prevItems,
            { ...image, x, y, id: uuidv4() },
        ]);
    };

    // Allow dragging over the drop zones
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    // Function to open the camera and capture a photo
    const captureImage = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.createElement("video");
        video.srcObject = stream;
        video.play();

        // Create a canvas to capture the image
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        // Wait for the video to load
        video.onloadedmetadata = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0);
            const imageData = canvas.toDataURL("image/png");
            setUserImage(imageData); // Store the captured image in state
            stream.getTracks().forEach(track => track.stop()); // Stop the video stream
        };
    };

    return (
        <div>
            <h1>Wardrobe</h1>

            {/* Button to capture user image */}
            <button onClick={captureImage}>Capture Image</button>

            {/* Display the captured user image */}
            {userImage && (
                <div>
                    <h2>Your Image</h2>
                    <img src={userImage} alt="User" style={{ width: "150px", height: "150px", borderRadius: "50%" }} />
                </div>
            )}

            <div>
                <label htmlFor="category">Select Category: </label>
                <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All</option>
                    {categories.map((category, index) => (
                        <option key={`${category}-${index}`} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="image-gallery flex">
                {images
                    .filter((image) => !selectedCategory || image.category === selectedCategory)
                    .map((image) => (
                        <img
                            key={image._id}
                            src={image.preSignedUrl || image.imageUrl}
                            alt={image.name || "Clothing item"}
                            draggable
                            onDragStart={(event) => handleDragStart(event, image)}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "fallback-image-url"; // Replace with a placeholder image
                            }}
                            style={{ margin: "10px", cursor: "pointer" }}
                        />
                    ))}
            </div>

            <div
                className="drop-zone"
                onDrop={handleDropShirt}
                onDragOver={handleDragOver}
                style={{
                    width: "80%", // Adjust width
                    height: "100px", // Adjust height
                    border: "2px dashed blue",
                    marginTop: "20px",
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "10%", // Centering the drop zone
                }}
            >
                <h3>Drop Shirt Here</h3>
            </div>

            <div
                className="drop-zone"
                onDrop={handleDropPant}
                onDragOver={handleDragOver}
                style={{
                    width: "80%", // Adjust width
                    height: "100px", // Adjust height
                    border: "2px dashed green",
                    marginTop: "20px",
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "10%", // Centering the drop zone
                }}
            >
                <h3>Drop Pant Here</h3>
            </div>

            <div
                className="canvas"
                style={{
                    width: "100%",
                    height: "500px",
                    border: "1px solid black",
                    marginTop: "20px",
                    position: "relative",
                }}
            >
                {/* Display the user image on the canvas */}
                {userImage && (
                    <img
                        src={userImage}
                        alt="User"
                        style={{
                            position: "absolute",
                            top: "0",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "150px", // Adjust size as needed
                            height: "150px", // Adjust size as needed
                            borderRadius: "50%",
                        }}
                    />
                )}

                {/* Render shirt items */}
                {shirtItems.map((item) => (
                    <img
                        key={item.id}
                        src={item.preSignedUrl || item.imageUrl}
                        alt={item.name || "Shirt"}
                        style={{
                            position: "absolute",
                            top: `${item.y}px`,
                            left: `${item.x}px`,
                            cursor: "move",
                        }}
                    />
                ))}

                {/* Render pant items */}
                {pantItems.map((item) => (
                    <img
                        key={item.id}
                        src={item.preSignedUrl || item.imageUrl}
                        alt={item.name || "Pant"}
                        style={{
                            position: "absolute",
                            top: `${item.y}px`,
                            left: `${item.x}px`,
                            cursor: "move",
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default DisplayWardrobe;
