import { removeBackground } from '../services/removeBgService';
import { uploadToS3 } from '../services/s3UploadService';
import connectToMongoDb from '../database/connectToMongoDb';
import mongoose from "mongoose";

export async function handleImageUpload(req, res) {
  await connectToMongoDb(); // Connect to MongoDB

  const dataForm = await req.formData();
  
  if (dataForm.get('file')) {
    const file = dataForm.get('file');
    const ext = file.type.split("/")[1];
    const newFileName = `${Date.now()}.${ext}`;

    try {
      // 1. Remove background
      const imageWithoutBg = await removeBackground(file);

      // 2. Upload to S3
      const imageUrl = await uploadToS3(imageWithoutBg, newFileName, file.type);

      // 3. Save URL and tags to MongoDB
      const db = mongoose.connection.db;
      const collection = db.collection('images');

      const tags = dataForm.get('tags')?.split(',') || [];

      await collection.insertOne({
        imageUrl,
        tags,
        uploadedAt: new Date(),
      });

      // 4. Return response
      return res.status(200).json({ imageUrl });
      
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    return res.status(400).json({ message: 'No file uploaded' });
  }
}
