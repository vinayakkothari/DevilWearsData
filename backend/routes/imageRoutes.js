import express from 'express';
import { handleImageUpload, getAllImages } from '../controllers/imageController.js';
import multer from 'multer';
import authMiddleware from '../middleware/authMiddleware.js'; // Ensure correct path
import { login, signup } from '../controllers/authController.js';

const router = express.Router();
const upload = multer();

// Public routes
router.post('/login', login);
router.post('/signup', signup);

// Protected routes
router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ message: 'Welcome to the dashboard' });
});

// Protected image upload route
router.post('/upload', authMiddleware, upload.single('file'), handleImageUpload);

// Protected get all images route
router.get('/images', authMiddleware, getAllImages);

export default router;
