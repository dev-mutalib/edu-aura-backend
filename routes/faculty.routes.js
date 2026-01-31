import express from 'express';
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
router.post(
  '/',
  // protect,
  // admin,
  createFaculty,
);

router.put(
  '/:id',
  // protect,
  // admin,
  updateFaculty,
);

router.delete(
  '/:id',
  // protect,
  // admin,
  deleteFaculty,
);

export default router;
