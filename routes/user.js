import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { register, login, getProfile, updateProfile } from '../controllers/userController.js';

const userRoutes = Router();

userRoutes.post('/register', register);
userRoutes.post('/login', login);
userRoutes.get('/profile', authMiddleware(['student', 'admin']), getProfile);
userRoutes.put('/profile', authMiddleware(['student', 'admin']), updateProfile);

export default userRoutes;