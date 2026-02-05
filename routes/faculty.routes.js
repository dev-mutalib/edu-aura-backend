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

/* ================= PUBLIC ROUTES ================= */
router.get('/', getAllFaculty);
router.get('/:id', getFacultyById);

/* ================= ADMIN ROUTES ================= */
router.post('/', authMiddleware(['admin']), createFaculty);
router.put('/:id', authMiddleware(['admin']), updateFaculty);
router.delete('/:id', authMiddleware(['admin']), deleteFaculty);

export default router;
