import express from 'express';
import upload from '../middleware/upload.middleware.js';
import {
  getAllFaculty,
  getFacultyById,
  createFaculty,
  updateFaculty,
  deleteFaculty,
} from '../controllers/faculty.controller.js';

// Optional: JWT middleware
// import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * Public Routes
 */
router.get('/', getAllFaculty);
router.get('/:id', getFacultyById);

/**
 * Admin Routes
 */
router.post('/', upload.single('image'), createFaculty);
router.put('/:id', upload.single('image'), updateFaculty);
router.delete('/:id', deleteFaculty);

export default router;
