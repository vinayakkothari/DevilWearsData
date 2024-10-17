import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique IDs

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
    <div>
      <h1>Wardrobe</h1>
      <div>
        <label htmlFor="category">Select Category: </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((category, index) => ( // Added index as a fallback key
            <option key={`${category}-${index}`} value={category}> {/* Ensure each option has a unique key */}
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
              key={image._id} // Use a stable unique key like _id
              src={image.preSignedUrl || image.imageUrl} // Use pre-signed URL if available
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
        className="canvas"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          width: "100%",
          height: "500px",
          border: "1px solid black",
          marginTop: "20px",
          position: "relative",
        }}
      >
        {canvasItems.map((item) => (
          <img
            key={item.id} // Use the unique ID for the canvas item
            src={item.preSignedUrl || item.imageUrl} // Use pre-signed URL if available
            alt={item.name || "Clothing item"}
            style={{
              position: "absolute",
              top: `${item.y}px`, // Position based on the drop coordinates
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
