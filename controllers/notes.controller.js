import Note from '../models/Note.js';
import cloudinary from '../config/cloudinary.js';

/* ================= GET ALL NOTES ================= */
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });

    const notesWithPreview = notes.map((note) => {
      let previewImageUrl = null;

      if (note.pdfUrl) {
        const publicId = note.pdfUrl
          .split('/upload/')[1]
          .replace('.pdf', '');

        previewImageUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/f_jpg,pg_1,w_800/${publicId}.pdf`;
      }

      return {
        ...note.toObject(),
        previewImageUrl,
      };
    });

    res.status(200).json(notesWithPreview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET SINGLE NOTE ================= */
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    let previewImageUrl = null;

    if (note.pdfUrl) {
      const publicId = note.pdfUrl
        .split('/upload/')[1]
        .replace('.pdf', '');

      previewImageUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/f_jpg,pg_1,w_800/${publicId}.pdf`;
    }

    res.status(200).json({
      ...note.toObject(),
      previewImageUrl,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= CREATE NOTE ================= */
export const createNote = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'PDF file required' });
    }

    const note = await Note.create({
      title: req.body.title,
      teacher: req.body.teacher,
      course: req.body.course,
      semester: req.body.semester,
      subject: req.body.subject,
      pdfUrl: req.file.path,
      uploadedBy: req.user._id,
    });

    const publicId = req.file.path
      .split('/upload/')[1]
      .replace('.pdf', '');

    const previewImageUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/f_jpg,pg_1,w_800/${publicId}.pdf`;

    res.status(201).json({
      ...note.toObject(),
      previewImageUrl,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= UPDATE NOTE (ADMIN) ================= */
/*
  ✔ Metadata update
  ✔ Optional PDF update
  ✔ Old PDF auto delete
  ✔ Preview image auto update
*/
export const updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    /* ================= UPDATE TEXT FIELDS ================= */
    const allowedFields = [
      'title',
      'teacher',
      'course',
      'semester',
      'subject',
      'popular',
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        note[field] = req.body[field];
      }
    });

    /* ================= OPTIONAL PDF UPDATE ================= */
    if (req.file) {
      // 🔥 DELETE OLD PDF FROM CLOUDINARY
      if (note.pdfUrl) {
        const publicId = note.pdfUrl.split('/').pop().split('.')[0];

        await cloudinary.uploader.destroy(`edu-aura-notes/${publicId}`, {
          resource_type: 'raw',
        });
      }

      const newPdfUrl = req.file.path;

      // 🔥 UPDATE PDF + PREVIEW IMAGE
      note.pdfUrl = newPdfUrl;
      note.previewImageUrl = newPdfUrl
        .replace('/raw/upload/', '/image/upload/')
        .replace('.pdf', '.jpg');
    }

    await note.save();

    res.status(200).json({
      message: 'Notes updated successfully',
      note,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= DELETE NOTE (ADMIN) ================= */
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // 🔥 Delete PDF from Cloudinary
    if (note.pdfUrl) {
      const publicId = note.pdfUrl.split('/').pop().split('.')[0];

      await cloudinary.uploader.destroy(`edu-aura-notes/${publicId}`, {
        resource_type: 'raw',
      });
    }

    await note.deleteOne();

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= DOWNLOAD NOTE ================= */
export const downloadNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    note.downloads += 1;
    await note.save();

    res.redirect(note.pdfUrl);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};