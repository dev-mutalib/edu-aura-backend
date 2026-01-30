import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import courseRoutes from './routes/course.routes.js';
import admissionRoutes from './routes/admission.routes.js';
import contactRoutes from './routes/contact.routes.js';
import facultyRoutes from './routes/faculty.routes.js';
import libraryRoutes from './routes/library.routes.js';
import aiRoutes from './routes/ai.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* -------------------- MIDDLEWARES -------------------- */
app.use(cors());
app.use(express.json());

// STATIC FILES (MOST IMPORTANT LINE)
app.use('/assets', express.static(path.join(__dirname, 'assets')));

/* -------------------- ROUTES -------------------- */
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/ai', aiRoutes);

/* -------------------- ROOT -------------------- */
app.get('/', (req, res) => {
  res.send('API is running');
});

/* -------------------- SERVER -------------------- */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/* -------------------- MONGODB -------------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection failed:', err.message));
