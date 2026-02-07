import express from 'express';
import upload from '../middleware/upload.middleware.js';
import {
  uploadImage,
  uploadMultipleImages,
} from '../controllers/upload.controller.js';

const router = express.Router();

router.post('/single', upload.single('image'), uploadImage);
router.post('/multiple', upload.array('images', 5), uploadMultipleImages);

export default router;
