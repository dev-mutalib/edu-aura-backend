export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    res.status(200).json({
      message: 'Image uploaded successfully',
      imageUrl: req.file.path,
      public_id: req.file.filename,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadMultipleImages = async (req, res) => {
  try {
    const images = req.files.map((file) => ({
      imageUrl: file.path,
      public_id: file.filename,
    }));

    res.status(200).json({
      message: 'Images uploaded successfully',
      images,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
