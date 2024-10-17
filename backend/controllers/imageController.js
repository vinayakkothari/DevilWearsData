import { removeBackground } from '../services/removeBgService.js';
import { uploadToS3, fetchImagesWithUrls } from '../services/s3Service.js';
import mongoose from "mongoose";

export async function handleImageUpload(req, res) {
  // Access the file and form data
  const file = req.file; // multer populates req.file
  const { gender, masterCat, subCat, ctype, color, season, usage, tags,userId } = req.body; // Access other fields from req.body

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const extension = file.originalname.split('.').pop();
  const FileName = `${Date.now()}.${extension}`;

  try {
    // Remove background from the image
    const imageWithoutBg = await removeBackground(file.buffer); // Assuming this function processes the file correctly

    // Upload the processed image to S3 and get the image URL
    const imageUrl = await uploadToS3(imageWithoutBg, FileName, file.mimetype);

    // Access MongoDB collection
    const db = mongoose.connection.db;
    const collection = db.collection('clothings');

    // Get tags from the body or split them from a comma-separated string
    const tagsArray = req.body.tags?.split(',') || []; // Assuming tags are sent as a string

    // Insert the image details into the MongoDB collection, associating the user ID
    await collection.insertOne({
      image: imageUrl, // Store the image URL
      userId,          // **Associate the image with the user**
      gender,
      masterCat,
      subCat,
      ctype,
      color,
      season,
      usage,
      tags: tagsArray,
      uploadedAt: new Date(),
    });

    // Send success response
    return res.status(200).json({ imageUrl });
    
  } catch (error) {
    console.error("Error in handleImageUpload:", error);
    return res.status(500).json({ message: error.message });
  }
}
export async function getAllImages(req, res) {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Ensure that the MongoDB connection is established
    if (!mongoose.connection.readyState) {
      return res.status(500).json({ message: "Database connection not established" });
    }

    const db = mongoose.connection.db;
    const collection = db.collection('clothings');

    
    // Fetch all images for the specific user
    const images = await collection.find({ userId }).toArray();
    
    // Ensure the images have valid data before proceeding
    if (!Array.isArray(images) || images.length === 0) {
      return res.status(404).json({ message: "No images found" });
    }

    // Fetch pre-signed URLs using the S3 service
    const imagesWithUrls = await fetchImagesWithUrls(images);
    
    return res.status(200).json(imagesWithUrls);
  } catch (error) {
    console.error('Error in getAllImages:', error.message || error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
