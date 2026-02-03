import express from 'express';
import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  downloadNote,
} from '../controllers/notes.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import pdfUpload from '../middleware/pdfUpload.middleware.js';

const router = express.Router();

/* ================= ROUTES ================= */


// public
router.get('/', getNotes);
router.get('/:id', getNoteById);
router.get('/download/:id', downloadNote);

// admin
router.post(
  '/',
  authMiddleware(['admin']),
  pdfUpload.single('pdf'),
  createNote,
);

// 🔥 MERGED UPDATE (TEXT + OPTIONAL PDF)
router.put(
  '/:id',
  authMiddleware(['admin']),
  pdfUpload.single('pdf'), // IMPORTANT
  updateNote,
);

router.delete('/:id', authMiddleware(['admin']), deleteNote);

export default router;
