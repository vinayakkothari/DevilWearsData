// import { removeBackground } from '../services/removeBgService.js';
// import { uploadToS3, getSignedUrlForS3Object,fetchImagesWithUrls } from '../services/s3Service.js';
// import mongoose from "mongoose";

// export async function handleImageUpload(req, res) {

//   // Access the file and form data
//   const file = req.file; // multer populates req.file
//   const { gender, masterCat, subCat, ctype, color, season, usage, tags } = req.body; // Access other fields from req.body

//   if (!file) {
//     return res.status(400).json({ message: 'No file uploaded' });
//   }

//   const originalFileName = file.originalname;
//   const userId = req.user._id;

//   try {
//     // Remove background from the image
//     const imageWithoutBg = await removeBackground(file.buffer); // Assuming this function processes the file correctly

//     // Upload the processed image to S3 and get the image URL
//     const imageUrl = await uploadToS3(imageWithoutBg, originalFileName, file.mimetype);

//     // Access MongoDB collection
//     const db = mongoose.connection.db;
//     const collection = db.collection('clothings');

//     // Get tags from the body or split them from a comma-separated string
//     const tags = req.body.tags?.split(',') || []; // Assuming tags are sent as a string

//     // Insert the image details into the MongoDB collection
//     await collection.insertOne({
//       imageUrl,
//       userId,
//       gender,
//       masterCat,
//       subCat,
//       ctype,
//       color,
//       season,
//       usage,
//       tags,
//       uploadedAt: new Date(),
//     });

//     // Send success response
//     return res.status(200).json({ imageUrl });
    
//   } catch (error) {
//     console.error("Error in handleImageUpload:", error);
//     return res.status(500).json({ message: error.message });
//   }
// }

// export async function getAllImages(_, res) {
//   try {
//     const db = mongoose.connection.db;
//     const collection = db.collection('clothings');

//     // Fetch all images from the collection
//     const images = await collection.find({}).toArray();   

//     // Fetch pre-signed URLs using the S3 service
//     const imagesWithUrls = await fetchImagesWithUrls(images);
//     console.log("got all images")
//     return res.status(200).json(imagesWithUrls); 
    
//   } catch (error) {
//     console.error('Error in getAllImages:', error);
//     return res.status(500).json({ message: error.message });
//   }
// }

import { removeBackground } from '../services/removeBgService.js';
import { uploadToS3, getSignedUrlForS3Object, fetchImagesWithUrls } from '../services/s3Service.js';
import mongoose from "mongoose";

export async function handleImageUpload(req, res) {
  // Access the file and form data
  const file = req.file; // multer populates req.file
  const { gender, masterCat, subCat, ctype, color, season, usage, tags,userId } = req.body; // Access other fields from req.body

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const originalFileName = file.originalname;

  try {
    // Remove background from the image
    const imageWithoutBg = await removeBackground(file.buffer); // Assuming this function processes the file correctly

    // Upload the processed image to S3 and get the image URL
    const imageUrl = await uploadToS3(imageWithoutBg, originalFileName, file.mimetype);

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
    const { userId } = req.query; // Get userId from query parameter

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const db = mongoose.connection.db;
    const collection = db.collection('clothings');

    // Fetch all images for the specific user
    const images = await collection.find({ userId }).toArray(); // Match userId

    // Fetch pre-signed URLs using the S3 service
    const imagesWithUrls = await fetchImagesWithUrls(images);
    console.log("Got all images for user:", userId);
    
    return res.status(200).json(imagesWithUrls); 
    
  } catch (error) {
    console.error('Error in getAllImages:', error);
    return res.status(500).json({ message: error.message });
  }
}

