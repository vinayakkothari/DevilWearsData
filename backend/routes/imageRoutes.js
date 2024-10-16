import express from 'express';
import { handleImageUpload, getAllImages } from '../controllers/imageController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer();

router.post('/upload',upload.single('file'), handleImageUpload);

router.get('/', getAllImages);

export default router;
