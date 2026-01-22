import express from 'express';
import {
  getAllFaculty,
  seedFaculty,
} from '../controllers/faculty.controller.js';

const router = express.Router();

router.get('/', getAllFaculty);    
router.post('/seed', seedFaculty);

export default router;
