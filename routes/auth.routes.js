import express from 'express';
import {
  register,
  login,
  createAdmin,
  registerAdminDev,
} from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

/* DEV ONLY */
router.post('/register-admin', registerAdminDev);

/* PROD ADMIN */
router.post('/create-admin', authMiddleware(['admin']), createAdmin);

export default router;
