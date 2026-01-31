import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

/* ================= ROUTES ================= */
import authRoutes from './routes/auth.routes.js';
import courseRoutes from './routes/course.routes.js';
import admissionRoutes from './routes/admission.routes.js';
import contactRoutes from './routes/contact.routes.js';
import facultyRoutes from './routes/faculty.routes.js';
import libraryRoutes from './routes/library.routes.js';
import aiRoutes from './routes/ai.routes.js';

/* ================= UTILS ================= */
import { seedFirstAdmin } from './utils/seedAdmin.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ================= PATH SETUP ================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================= MIDDLEWARES ================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= STATIC FILES ================= */
// http://localhost:5000/assets/filename.jpg
app.use('/assets', express.static(path.join(__dirname, 'assets')));

/* ================= ROUTES ================= */
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/ai', aiRoutes);

/* ================= ROOT ================= */
app.get('/', (req, res) => {
  res.send('🚀 API is running');
});

/* ================= 404 HANDLER ================= */
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

/* ================= DB + SERVER ================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB Connected');

    // 🔥 AUTO CREATE FIRST ADMIN (ENV BASED)
    await seedFirstAdmin();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
  });
