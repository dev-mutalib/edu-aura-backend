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
      url: String,
      public_id: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model('LibraryBook', libraryBookSchema);
