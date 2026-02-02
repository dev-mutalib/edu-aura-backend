import Faculty from '../models/faculty.model.js';
import cloudinary from '../config/cloudinary.js';

/**
 * @desc    Get all active faculty
 * @route   GET /api/faculty
 * @access  Public
 */
export const getAllFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find({ isActive: true }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: faculty.length,
      data: faculty,
    });
  } catch (error) {
    console.error('Faculty Fetch Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch faculty',
    });
  }
};

/**
 * @desc    Get single faculty by ID
 * @route   GET /api/faculty/:id
 * @access  Public
 */
export const getFacultyById = async (req, res) => {
  try {
    const faculty = await Faculty.findOne({
      _id: req.params.id,
      isActive: true,
    });

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty not found',
      });
    }

    res.status(200).json({
      success: true,
      data: faculty,
    });
  } catch (error) {
    console.error('Faculty Fetch Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch faculty',
    });
  }
};

/**
 * @desc    Create new faculty
 * @route   POST /api/faculty
 * @access  Admin
 */
export const createFaculty = async (req, res) => {
  try {
    const faculty = new Faculty({
      ...req.body,
      image: req.file
        ? {
            url: req.file.path, // Cloudinary URL
            public_id: req.file.filename,
          }
        : null,
      isActive: true,
    });

    await faculty.save();

    res.status(201).json({
      success: true,
      message: 'Faculty created successfully',
      data: faculty,
    });
  } catch (error) {
    console.error('Faculty Create Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to create faculty',
    });
  }
};

/**
 * @desc    Update faculty
 * @route   PUT /api/faculty/:id
 * @access  Admin
 */
export const updateFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty not found',
      });
    }

    // 🧨 Delete old image if new image uploaded
    if (req.file && faculty.image?.public_id) {
      await cloudinary.uploader.destroy(faculty.image.public_id);
    }

    const updatedData = {
      ...req.body,
      image: req.file
        ? {
            url: req.file.path,
            public_id: req.file.filename,
          }
        : faculty.image,
    };

    const updatedFaculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true },
    );

    res.status(200).json({
      success: true,
      message: 'Faculty updated successfully',
      data: updatedFaculty,
    });
  } catch (error) {
    console.error('Faculty Update Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to update faculty',
    });
  }
};

/**
 * @desc    Delete faculty (Soft Delete + Cloudinary Cleanup)
 * @route   DELETE /api/faculty/:id
 * @access  Admin
 */
export const deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty not found',
      });
    }

    // 🧨 Delete image from Cloudinary
    if (faculty.image?.public_id) {
      await cloudinary.uploader.destroy(faculty.image.public_id);
    }

    faculty.isActive = false;
    await faculty.save();

    res.status(200).json({
      success: true,
      message: 'Faculty deleted successfully',
    });
  } catch (error) {
    console.error('Faculty Delete Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to delete faculty',
    });
  }
};
