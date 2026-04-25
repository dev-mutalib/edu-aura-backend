import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

/* ================= ROUTES ================= */
import galleryRoutes from './routes/gallery.routes.js';
import authRoutes from './routes/auth.routes.js';
import courseRoutes from './routes/course.routes.js';
import admissionRoutes from './routes/admission.routes.js';
import contactRoutes from './routes/contact.routes.js';
import facultyRoutes from './routes/faculty.routes.js';
import libraryRoutes from './routes/library.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import notesRoutes from './routes/notes.routes.js';
import aiRoutes from './routes/ai.routes.js';

/* ================= UTILS ================= */
import { seedFirstAdmin } from './utils/seedAdmin.js';

/* ================= CLOUDINARY INIT ================= */
import './config/cloudinary.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const isTest = process.env.NODE_ENV === "test";

/* ================= PATH SETUP ================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================= MIDDLEWARES ================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================= STATIC FILES ================= */
app.use('/assets', express.static(path.join(__dirname, 'assets')));

/* ================= ROUTES ================= */
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/ai', aiRoutes);

/* ================= ROOT ================= */
app.get('/', (req, res) => {
  res.send('🚀 API is running');
});

/* ================= MULTER ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
  next(err);
});

/* ================= GLOBAL ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.message);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

/* ================= 404 HANDLER ================= */
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

/* ================= START SERVER FUNCTION ================= */
const startServer = async () => {
  try {
    if (!isTest) {
      // 🔥 Connect to MongoDB only in non-test environments
      if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not defined");
      }

      console.log('🔌 Connecting to MongoDB...');
      await mongoose.connect(process.env.MONGO_URI);

      console.log('✅ MongoDB Connected');

      // Seed admin only when DB is connected
      await seedFirstAdmin();
    } else {
      console.log('⚡ Running in TEST mode (No DB connection)');
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error('❌ Startup Error:', err.message);

    // In CI/test, don't crash pipeline
    if (!isTest) {
      process.exit(1);
    }
  }
};

/* ================= INIT ================= */
startServer();
