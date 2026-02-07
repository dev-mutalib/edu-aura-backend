import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: ['campus', 'academics', 'events'],
      default: 'campus',
    },
  },
  { timestamps: true },
);

const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;
