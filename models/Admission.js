import mongoose from 'mongoose';

const admissionSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    course: String,
  },
  { timestamps: true },
);

export default mongoose.model('Admission', admissionSchema);
