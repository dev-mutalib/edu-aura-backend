import { verifyToken } from '../utils/jwt.js';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleware = (allowedRoles = ['student', 'admin']) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Access denied: No token provided' });
      }

      const decoded = verifyToken(token);
      if (!decoded || !decoded.id || !decoded.role) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
      }

      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({
        message: 'Unauthorized',
        error: err.message || 'Invalid token or session expired',
      });
    }
  };
};