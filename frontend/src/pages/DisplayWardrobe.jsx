import React, { useState, useEffect } from "react";

const DisplayWardrobe = () => {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [canvasItems, setCanvasItems] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.log("No userId found in localStorage.");
    }
  }, []);

  useEffect(() => {
    const fetchClothingItems = async () => {
      if (!userId) return; // Don't fetch if userId is not set
      
      const token = localStorage.getItem('token'); // Get the token from localStorage
  
      if (!token) {
        console.error("No token found in localStorage.");
        return;
      }
  
      console.log("Token being used:", token); // Log the token to check if it's present
  
      try {
        const response = await fetch(`http://localhost:3000/api/images/images?userId=${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Ensure token is in correct format
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
  
        setImages(data);
        setCategories([...new Set(data.map((item) => item.category))]);
      } catch (error) {
        console.error("Error fetching clothing items:", error);
      }
    };
  
    fetchClothingItems();
    console.log("Fetching clothing items for user:", userId);
  }, [userId]);
  

  const handleDragStart = (event, image) => {
    event.dataTransfer.setData("image", JSON.stringify(image));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const image = JSON.parse(event.dataTransfer.getData("image"));
    const canvasRect = event.target.getBoundingClientRect();
    const x = event.clientX - canvasRect.left;
    const y = event.clientY - canvasRect.top;

    setCanvasItems((prevItems) => [...prevItems, { ...image, x, y }]);
  };

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
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="image-gallery flex">
        {Array.isArray(images) && images
          .filter((image) => !selectedCategory || image.category === selectedCategory)
          .map((image) => (
            <img
              key={image._id}
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
        {canvasItems.map((item, index) => (
          <img
            key={index}
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
  );
};

export default DisplayWardrobe;
