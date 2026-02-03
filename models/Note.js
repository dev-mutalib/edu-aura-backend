import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    teacher: { type: String, required: true },
    course: { type: String, required: true },
    semester: { type: String, required: true },
    subject: { type: String, required: true },
    pdfUrl: { type: String, required: true },
    downloads: { type: Number, default: 0 },
    popular: { type: Boolean, default: false },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('Note', noteSchema);
