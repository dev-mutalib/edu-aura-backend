import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getCourses, getCourseById, enrollInCourse } from '../controllers/courseController.js';

const courseRoutes = Router();

courseRoutes.get('/', getCourses);
courseRoutes.get('/:id', getCourseById);
courseRoutes.post('/:id/enroll', authMiddleware(['student']), enrollInCourse);

export default courseRoutes;