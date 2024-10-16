import React, { useState, useEffect } from "react";

const DisplayWardrobe = () => {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [canvasItems, setCanvasItems] = useState([]);

  useEffect(() => {
    const fetchClothingItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/images/");
        const data = await response.json();
        setImages(data);
        setCategories([...new Set(data.map((item) => item.category))]);
      } catch (error) {
        console.error("Error fetching clothing items:", error);
      }
    };
    fetchClothingItems();
    console.log("Fetching clothing items...");
  }, []);

  const handleDragStart = (event, image) => {
    event.dataTransfer.setData("image", JSON.stringify(image));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const image = JSON.parse(event.dataTransfer.getData("image"));
    setCanvasItems((prevItems) => [...prevItems, image]);
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
        {images
          .filter(
            (image) => !selectedCategory || image.category === selectedCategory
          )
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
            src={item.preSignedUrl || item.imageUrl} // Use pre-signed URL if available
            alt={item.name || "Clothing item"}
            style={{
              position: "absolute",
              top: `${index * 10}px`,
              left: `${index * 10}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DisplayWardrobe;
