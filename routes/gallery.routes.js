import express from 'express';
import {
  getAllGalleryImages,
  getGalleryImageById,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
} from '../controllers/gallery.controller.js';

import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

/* =========================
   PUBLIC ROUTES
   ========================= */

// Get all gallery images
router.get('/', getAllGalleryImages);

// Get single gallery image by ID
router.get('/:id', getGalleryImageById);

/* =========================
   ADMIN ROUTES (PROTECTED)
   ========================= */

// Create gallery image → Admin only
router.post('/', authMiddleware(['admin']), createGalleryImage);

// Update gallery image → Admin only
router.put('/:id', authMiddleware(['admin']), updateGalleryImage);

// Delete gallery image → Admin only
router.delete('/:id', authMiddleware(['admin']), deleteGalleryImage);

export default router;
