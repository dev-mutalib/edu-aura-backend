import express from 'express';
import {
  getAllFaculty,
  getFacultyById,
  createFaculty,
  updateFaculty,
  deleteFaculty,
} from '../controllers/faculty.controller.js';

import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

/* =========================
   PUBLIC ROUTES
   ========================= */

// Get all active faculty
router.get('/', getAllFaculty);

// Get faculty by ID
router.get('/:id', getFacultyById);

/* =========================
   ADMIN ROUTES (PROTECTED)
   ========================= */

// Create faculty → Admin only
router.post('/', authMiddleware(['admin']), createFaculty);

// Update faculty → Admin only
router.put('/:id', authMiddleware(['admin']), updateFaculty);

// Delete faculty → Admin only
router.delete('/:id', authMiddleware(['admin']), deleteFaculty);

export default router;
