import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'edu-aura-notes',
    resource_type: 'raw', // PDF ke liye MUST
    allowed_formats: ['pdf'],
  },
});

const pdfUpload = multer({
  storage,
  fileFilter: (_, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files allowed'), false);
    }
  },
});

export default pdfUpload;
