import express from 'express';
import { handleImageUpload } from '../controllers/imageController';

const router = express.Router();

router.post('/upload', handleImageUpload);

export default router;
