import mongoose from 'mongoose';

const libraryBookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 0,
    },
    image: {
      type: String,
      required: true,
      // example: "/assets/books/clean-code.jpg"
    },
  },
  { timestamps: true },
);

export default mongoose.model('LibraryBook', libraryBookSchema);
