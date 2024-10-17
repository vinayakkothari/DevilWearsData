import express from 'express';
import { handleImageUpload, getAllImages } from '../controllers/imageController.js';
import multer from 'multer';
const router = express.Router();
const upload = multer();

// Protected image upload route
router.post('/upload', upload.single('file'), handleImageUpload);

// Protected get all images route
router.get('/getImages', getAllImages);

export default router;
