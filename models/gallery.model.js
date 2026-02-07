import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
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

    image: {
      url: {
        type: String,
        default: null, // ✅ full URL only
      },
    },
  },
  { timestamps: true },
);

const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;
