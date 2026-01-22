import express from 'express';
import { applyAdmission } from '../controllers/admission.controller.js';

const router = express.Router();

router.post('/apply', applyAdmission);

export default router;
