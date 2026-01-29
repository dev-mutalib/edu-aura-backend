import mongoose from 'mongoose';

const libraryBookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true },
);

export default mongoose.model('LibraryBook', libraryBookSchema);
