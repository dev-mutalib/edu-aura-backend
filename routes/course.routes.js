import express from 'express';
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

// Create a new course
router.post(
  '/',
  // protect,
  // admin,
  createCourse,
);

// Update course
router.put(
  '/:id',
  // protect,
  // admin,
  updateCourse,
);

// Delete course (Soft Delete)
router.delete(
  '/:id',
  // protect,
  // admin,
  deleteCourse,
);

export default router;
