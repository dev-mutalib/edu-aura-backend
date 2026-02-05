import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    designation: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },

    image: {
      url: {
        type: String,
        default: null,
      },
      filename: {
        type: String,
        default: null,
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Faculty = mongoose.model('Faculty', facultySchema);
export default Faculty;
