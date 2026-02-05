import express from 'express';
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/course.controller.js';

import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

/* =========================
   PUBLIC ROUTES
   ========================= */

// Get all active courses
router.get('/', getAllCourses);

// Get single course by ID
router.get('/:id', getCourseById);

/* =========================
   ADMIN ROUTES (PROTECTED)
   ========================= */

// Create course → Admin only
router.post('/', authMiddleware(['admin']), createCourse);

// Update course → Admin only
router.put('/:id', authMiddleware(['admin']), updateCourse);

// Delete course (soft delete) → Admin only
router.delete('/:id', authMiddleware(['admin']), deleteCourse);

export default router;
