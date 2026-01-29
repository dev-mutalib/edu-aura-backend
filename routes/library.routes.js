import express from 'express';
import { getAllBooks, addBook } from '../controllers/library.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

/* Student + Admin can view */
router.get('/', authMiddleware(['student', 'admin']), getAllBooks);

/* Admin only – optional */
router.post('/', authMiddleware(['admin']), addBook);

export default router;
