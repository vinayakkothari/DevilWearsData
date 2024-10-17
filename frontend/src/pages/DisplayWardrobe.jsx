import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique IDs
import VerticalNavbar from '../components/NavBar'; // Importing the navbar
import BackGround from "../assets/Dashboard_bg1.jpg";

const DisplayWardrobe = () => {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [canvasItems, setCanvasItems] = useState([]);
  const [userId, setUserId] = useState('');

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

  // Handle drop event on canvas
  const handleDrop = (event) => {
    event.preventDefault();
    const image = JSON.parse(event.dataTransfer.getData("image"));
    const canvasRect = event.target.getBoundingClientRect();
    const x = event.clientX - canvasRect.left;
    const y = event.clientY - canvasRect.top;

    // Add the dragged image to the canvasItems with coordinates
    setCanvasItems((prevItems) => [
      ...prevItems,
      { ...image, x, y, id: uuidv4() }, // Use a unique ID for each canvas item
    ]);
  };

  // Allow dragging over the canvas
  const handleDragOver = (event) => {
    event.preventDefault();
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
      <div style={{ width: '250px', flexShrink: 0 }}>
        <VerticalNavbar />
      </div>
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <h1>Wardrobe</h1>
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

        <div
          className="image-gallery flex"
          style={{ display: 'flex', flexWrap: 'wrap', margin: '10px 0' }}
        >
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
                style={{
                  margin: "10px",
                  cursor: "pointer",
                  width: '100px',
                  height: '100px',
                }} // Adjust size if needed
              />
            ))}
        </div>

        <div
          className="canvas"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          style={{
            width: "100%",
            height: "500px",
            border: "1px solid black",
            marginTop: "20px",
            position: "relative",
            backgroundColor: "white",
          }}
        >
          {canvasItems.map((item) => (
            <img
              key={item.id}
              src={item.preSignedUrl || item.imageUrl}
              alt={item.name || "Clothing item"}
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
    </div>
  );
};

export default DisplayWardrobe;
