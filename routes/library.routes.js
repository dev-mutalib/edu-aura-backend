import express from 'express';
import { getAllBooks, addBook, borrowBook, returnBook } from '../controllers/library.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

/* Student + Admin can view */
router.get('/', authMiddleware(['student', 'admin']), getAllBooks);

/* Admin only – optional */
router.post('/', authMiddleware(['admin']), addBook);

/* Borrow & Return */
router.put(
  '/borrow/:id',
  authMiddleware(['student', 'admin']),
  borrowBook,
);

router.put(
  '/return/:id',
  authMiddleware(['student', 'admin']),
  returnBook,
);

export default router;
