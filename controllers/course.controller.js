import Course from '../models/Course.js';

/**
 * @desc    Get all active courses
 * @route   GET /api/courses
 * @access  Public
 */
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true }).sort({
      createdAt: -1,
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
 * @desc    Get single course by ID
 * @route   GET /api/courses/:id
 * @access  Public
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

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error('Get Course Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch course',
    });
  }
};

/**
 * @desc    Create a new course
 * @route   POST /api/courses
 * @access  Admin
 */
export const createCourse = async (req, res) => {
  try {
    const { title, description, duration, level, category, image, price } =
      req.body;

    const course = await Course.create({
      title,
      description,
      duration,
      level,
      category,
      image,
      price,
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
 * @route   PUT /api/courses/:id
 * @access  Admin
 */
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      data: updatedCourse,
    });
  } catch (error) {
    console.error('Update Course Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to update course',
    });
  }
};

/**
 * @desc    Delete course (Soft Delete)
 * @route   DELETE /api/courses/:id
 * @access  Admin
 */
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    course.isActive = false;
    await course.save();

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully',
    });
  } catch (error) {
    console.error('Delete Course Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to delete course',
    });
  }
};
