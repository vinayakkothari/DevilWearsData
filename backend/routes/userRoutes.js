import express from 'express';
import { updateUserPoints,getUserInfo } from '../controllers/userController.js';

const router = express.Router();

// Route to update user points
router.post('/updatePoints', updateUserPoints);
router.get('/getUserInfo',getUserInfo)

export default router;
