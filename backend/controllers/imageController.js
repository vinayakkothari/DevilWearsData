import { removeBackground } from '../services/removeBgService.js';
import { uploadToS3 } from '../services/s3UploadService.js';
import mongoose from "mongoose";

export async function handleImageUpload(req, res) {

  // Access the file and form data
  const file = req.file; // multer populates req.file
  const { type, color, season } = req.body; // Access other fields from req.body

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const ext = file.mimetype.split("/")[1]; // Get file extension
  const newFileName = `${Date.now()}.${ext}`; // Create a unique filename

  try {
    // Remove background from the image
    const imageWithoutBg = await removeBackground(file.buffer); // Assuming this function processes the file correctly

    // Upload the processed image to S3 and get the image URL
    const imageUrl = await uploadToS3(imageWithoutBg, newFileName, file.mimetype);

    // Access MongoDB collection
    const db = mongoose.connection.db;
    const collection = db.collection('clothings');

    // Get tags from the body or split them from a comma-separated string
    const tags = req.body.tags?.split(',') || []; // Assuming tags are sent as a string

    // Insert the image details into the MongoDB collection
    await collection.insertOne({
      imageUrl,
      type,
      color,
      season,
      tags,
      uploadedAt: new Date(),
    });

    // Send success response
    return res.status(200).json({ imageUrl });
    
  } catch (error) {
    console.error("Error in handleImageUpload:", error);
    return res.status(500).json({ message: error.message });
  }
}
