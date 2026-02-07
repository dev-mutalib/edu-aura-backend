import Gallery from '../models/gallery.model.js';

// ✅ GET ALL IMAGES (Public)
export const getAllGalleryImages = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};

    // category filter apply only if category exists & not "all"
    if (category && category !== 'all') {
      filter.category = category;
    }

    const images = await Gallery.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Gallery images fetched successfully',
      data: images,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching gallery images',
      error: error.message,
    });
  }
};

// ✅ GET SINGLE IMAGE BY ID (Public)
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
      message: 'Gallery image fetched successfully',
      data: image,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching gallery image',
      error: error.message,
    });
  }
};

// ✅ CREATE IMAGE (Admin)
export const createGalleryImage = async (req, res) => {
  try {
    const { image, title, description, category } = req.body;

    if (!image || !title || !description || !category) {
      return res.status(400).json({
        success: false,
        message:
          'All fields are required (image, title, description, category)',
      });
    }

    const newImage = await Gallery.create({
      image,
      title,
      description,
      category,
    });

    res.status(201).json({
      success: true,
      message: 'Gallery image created successfully',
      data: newImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating gallery image',
      error: error.message,
    });
  }
};

// ✅ UPDATE IMAGE (Admin)
export const updateGalleryImage = async (req, res) => {
  try {
    const { image, title, description, category } = req.body;

    const updatedImage = await Gallery.findByIdAndUpdate(
      req.params.id,
      {
        image,
        title,
        description,
        category,
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
    res.status(500).json({
      success: false,
      message: 'Error updating gallery image',
      error: error.message,
    });
  }
};

// ✅ DELETE IMAGE (Admin)
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
    res.status(500).json({
      success: false,
      message: 'Error deleting gallery image',
      error: error.message,
    });
  }
};
