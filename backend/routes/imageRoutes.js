import express from 'express';
import { handleImageUpload, getAllImages } from '../controllers/imageController.js';
import multer from 'multer';
import authMiddleware from '../middleware/authMiddleware.js'; // Make sure this path is correct
import { login, signup } from '../controllers/authController.js'; // Assuming these functions are in authController

const router = express.Router();
const upload = multer();

// Public routes
router.post('/login', login);
router.post('/signup', signup);

// Protected routes
router.get('/dashboard', authMiddleware, (req, res) => {
    // Logic for dashboard
    res.json({ message: 'Welcome to the dashboard' });
});

// Image upload route (if you still need it)
router.post('/upload', upload.single('file'), handleImageUpload);

router.get('/', getAllImages);

export default router; // Use ES6 export
