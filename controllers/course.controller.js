import Course from '../models/Course.js';

/* ================= HELPERS ================= */
const isValidImageURL = (url) =>
  typeof url === 'string' &&
  (url.startsWith('http://') || url.startsWith('https://'));

/**
 * @desc    Get all active courses
 * @route   GET /api/courses
 * @access  Public
 */
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true }).sort({
      createdAt: 1,
      _id: 1,
    });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    console.error('Get Courses Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch courses',
    });
  }
};

/**
 * @desc    Get course by ID
 */
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findOne({
      _id: req.params.id,
      isActive: true,
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch course' });
  }
};

/**
 * @desc    Create course
 */
export const createCourse = async (req, res) => {
  try {
    const { image } = req.body;

    if (image?.url && !isValidImageURL(image.url)) {
      return res.status(400).json({
        success: false,
        message: 'Image URL must be a full absolute URL',
      });
    }

    const course = await Course.create({
      ...req.body,
      image: image?.url ? { url: image.url } : null,
      isActive: true,
    });

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course,
    });
  } catch (error) {
    console.error('Create Course Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to create course',
    });
  }
};

/**
 * @desc    Update course
 */
export const updateCourse = async (req, res) => {
  try {
    const { image } = req.body;

    if (image?.url && !isValidImageURL(image.url)) {
      return res.status(400).json({
        success: false,
        message: 'Image URL must be a full absolute URL',
      });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        image: image?.url ? { url: image.url } : null,
      },
      { new: true, runValidators: true },
    );

    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      data: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update course',
    });
  }
};

/**
 * @desc    Soft delete course
 */
export const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndUpdate(req.params.id, { isActive: false });
    res.status(200).json({ success: true, message: 'Course deleted' });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to delete course' });
  }
};
