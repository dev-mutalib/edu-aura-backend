import Gallery from '../models/gallery.model.js';

/* ================= HELPERS ================= */
const isValidImageURL = (url) =>
  typeof url === 'string' &&
  (url.startsWith('http://') || url.startsWith('https://'));

/**
 * @desc    Get all gallery images
 * @route   GET /api/gallery
 * @access  Public
 */
export const getAllGalleryImages = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};

    if (category && category !== 'all') {
      filter.category = category;
    }

    const images = await Gallery.find(filter).sort({
      createdAt: -1,
      _id: -1,
    });

    res.status(200).json({
      success: true,
      count: images.length,
      data: images,
    });
  } catch (error) {
    console.error('Get Gallery Images Error:', error.message);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch gallery images',
    });
  }
};

/**
 * @desc    Get single gallery image by ID
 * @route   GET /api/gallery/:id
 * @access  Public
 */
export const getGalleryImageById = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Gallery image not found',
      });
    }

    res.status(200).json({
      success: true,
      data: image,
    });
  } catch (error) {
    console.error('Get Gallery Image Error:', error.message);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch gallery image',
    });
  }
};

/**
 * @desc    Create gallery image
 * @route   POST /api/gallery
 * @access  Admin
 */
export const createGalleryImage = async (req, res) => {
  try {
    const { title, description, category, image } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title, description and category are required',
      });
    }

    if (image?.url && !isValidImageURL(image.url)) {
      return res.status(400).json({
        success: false,
        message: 'Image URL must be a full absolute URL',
      });
    }

    const newImage = await Gallery.create({
      title,
      description,
      category,
      image: image?.url ? { url: image.url } : null,
    });

    res.status(201).json({
      success: true,
      message: 'Gallery image created successfully',
      data: newImage,
    });
  } catch (error) {
    console.error('Create Gallery Error:', error.message);

    res.status(500).json({
      success: false,
      message: 'Failed to create gallery image',
    });
  }
};

/**
 * @desc    Update gallery image
 * @route   PUT /api/gallery/:id
 * @access  Admin
 */
export const updateGalleryImage = async (req, res) => {
  try {
    const { title, description, category, image } = req.body;

    if (image?.url && !isValidImageURL(image.url)) {
      return res.status(400).json({
        success: false,
        message: 'Image URL must be a full absolute URL',
      });
    }

    const updatedImage = await Gallery.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        image: image?.url ? { url: image.url } : null,
      },
      { new: true, runValidators: true },
    );

    if (!updatedImage) {
      return res.status(404).json({
        success: false,
        message: 'Gallery image not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Gallery image updated successfully',
      data: updatedImage,
    });
  } catch (error) {
    console.error('Update Gallery Error:', error.message);

    res.status(500).json({
      success: false,
      message: 'Failed to update gallery image',
    });
  }
};

/**
 * @desc    Delete gallery image
 * @route   DELETE /api/gallery/:id
 * @access  Admin
 */
export const deleteGalleryImage = async (req, res) => {
  try {
    const deletedImage = await Gallery.findByIdAndDelete(req.params.id);

    if (!deletedImage) {
      return res.status(404).json({
        success: false,
        message: 'Gallery image not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Gallery image deleted successfully',
    });
  } catch (error) {
    console.error('Delete Gallery Error:', error.message);

    res.status(500).json({
      success: false,
      message: 'Failed to delete gallery image',
    });
  }
};
