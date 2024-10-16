import express from 'express';
import { login, signup } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/signup', signup); // Handle user signup
router.post('/login', login);     // Handle user login

// Protected routes (example)
router.get('/dashboard', authMiddleware, (req, res) => {
    res.json({ message: 'Welcome to the dashboard' });
});

export default router;
