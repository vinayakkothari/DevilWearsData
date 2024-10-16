import express from 'express';
import { handleImageUpload } from '../controllers/imageController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer();

router.post('/upload',upload.single('file'), handleImageUpload);

export default router;
