import Faculty from '../models/faculty.model.js';

/* ================= HELPERS ================= */
const isValidImageURL = (url) =>
  typeof url === 'string' &&
  (url.startsWith('http://') || url.startsWith('https://'));

/**
 * @desc    Get all active faculty
 * @route   GET /api/faculty
 * @access  Public
 */
export const getAllFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find({ isActive: true }).sort({
      createdAt: 1,
      _id: 1,
    });

    res.status(200).json({
      success: true,
      count: faculty.length,
      data: faculty,
    });
  } catch (error) {
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
    const { image } = req.body;

    if (image?.url && !isValidImageURL(image.url)) {
      return res.status(400).json({
        success: false,
        message: 'Image URL must be a full absolute URL',
      });
    }

    const faculty = await Faculty.create({
      ...req.body,
      image: image?.url ? { url: image.url } : null,
      isActive: true,
    });

    res.status(201).json({
      success: true,
      message: 'Faculty created successfully',
      data: faculty,
    });
  } catch (error) {
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
    const { image } = req.body;

    if (image?.url && !isValidImageURL(image.url)) {
      return res.status(400).json({
        success: false,
        message: 'Image URL must be a full absolute URL',
      });
    }

    const updatedFaculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        image: image?.url ? { url: image.url } : null,
      },
      { new: true, runValidators: true },
    );

    if (!updatedFaculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Faculty updated successfully',
      data: updatedFaculty,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update faculty',
    });
  }
};

/**
 * @desc    Soft delete faculty
 * @route   DELETE /api/faculty/:id
 * @access  Admin
 */
export const deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true },
    );

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Faculty deleted',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete faculty',
    });
  }
};
