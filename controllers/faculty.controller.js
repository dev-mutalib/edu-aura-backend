import Faculty from '../models/faculty.model.js';

/**
 * @desc    Get all active faculty (FIFO order)
 * @route   GET /api/faculty
 * @access  Public
 */
export const getAllFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find({ isActive: true }).sort({
      createdAt: 1,
      _id: 1, // ✅ tie-breaker
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
 * @desc    Get faculty by ID
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
 * @desc    Create faculty
 * @route   POST /api/faculty
 * @access  Admin
 */
export const createFaculty = async (req, res) => {
  try {
    const { name, designation, subject, experience, image } = req.body;

    const faculty = new Faculty({
      name,
      designation,
      subject,
      experience,
      image: image || null,
      isActive: true,
    });

    await faculty.save();

    res.status(201).json({
      success: true,
      message: 'Faculty created successfully',
      data: faculty,
    });
  } catch (error) {
    console.error('Create Faculty Error:', error.message);
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

    const updatedFaculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true },
    );

    res.status(200).json({
      success: true,
      message: 'Faculty updated successfully',
      data: updatedFaculty,
    });
  } catch (error) {
    console.error('Update Faculty Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to update faculty',
    });
  }
};

/**
 * @desc    Delete faculty (Soft delete)
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

    faculty.isActive = false;
    await faculty.save();

    res.status(200).json({
      success: true,
      message: 'Faculty deleted successfully',
    });
  } catch (error) {
    console.error('Delete Faculty Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to delete faculty',
    });
  }
};
