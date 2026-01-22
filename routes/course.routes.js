import express from 'express';
import {
  getAllCourses,
  seedCourses,
} from '../controllers/course.controller.js';

const router = express.Router();

// Get all courses
router.get('/', getAllCourses);

// Seed courses (run once only)
router.post('/seed', seedCourses);

export default router;
