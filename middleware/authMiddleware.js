import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleware = (allowedRoles = ['student', 'admin']) => {
  return async (req, res, next) => {
    try {
      /* ================= TOKEN CHECK ================= */
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          message: 'Access denied: No token provided',
        });
      }

      const token = authHeader.split(' ')[1];

      /* ================= VERIFY TOKEN ================= */
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        return res.status(401).json({
          message:
            err.name === 'TokenExpiredError'
              ? 'Token expired'
              : 'Invalid token',
        });
      }

      /* ================= ROLE CHECK (TOKEN) ================= */
      if (!decoded.role || !allowedRoles.includes(decoded.role)) {
        return res.status(403).json({
          message: 'Access denied: Insufficient permissions',
        });
      }

      /* ================= USER CHECK (DB) ================= */
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(401).json({
          message: 'User not found',
        });
      }

      /* ================= ROLE CHECK (DB SAFETY) ================= */
      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({
          message: 'Access denied: Role mismatch',
        });
      }

      /* ================= ATTACH USER ================= */
      req.user = user;
      next();
    } catch (error) {
      return res.status(500).json({
        message: 'Authorization failed',
        error: error.message,
      });
    }
  };
};
