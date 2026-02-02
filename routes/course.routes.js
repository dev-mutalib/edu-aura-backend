import express from 'express';
import upload from '../middleware/upload.middleware.js';
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/course.controller.js';

const router = express.Router();

/**
 * =========================
 * Public Routes
 * =========================
 */

// Get all active courses
router.get('/', getAllCourses);

// Get single course by ID
router.get('/:id', getCourseById);

/**
 * =========================
 * Admin Routes
 * =========================
 */

// Create a new course (Cloudinary upload)
router.post('/', upload.single('image'), createCourse);

// Update course (Cloudinary replace old image)
router.put('/:id', upload.single('image'), updateCourse);

// Delete course (Soft Delete + Cloudinary delete)
router.delete('/:id', deleteCourse);

export default router;
