import LibraryBook from '../models/LibraryBook.js';
import cloudinary from '../config/cloudinary.js';

/* ================= GET ALL BOOKS ================= */
export const getAllBooks = async (req, res) => {
  try {
    const books = await LibraryBook.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch books',
      error: error.message,
    });
  }
};

/* ================= ADD BOOK (ADMIN ONLY) ================= */
export const addBook = async (req, res) => {
  try {
    const { title, author, quantity } = req.body;

    // 🔒 Validation
    if (!title || !author) {
      return res.status(400).json({
        success: false,
        message: 'Title and author are required',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Book image is required',
      });
    }

    const book = new LibraryBook({
      title,
      author,
      quantity: quantity ?? 1,
      image: {
        url: req.file.path, // Cloudinary URL
        public_id: req.file.filename,
      },
    });

    await book.save();

    res.status(201).json({
      success: true,
      message: 'Book added successfully',
      data: book,
    });
  } catch (error) {
    console.error('Add Book Error:', error.message);
    res.status(400).json({
      success: false,
      message: 'Failed to add book',
      error: error.message,
    });
  }
};

/* ================= BORROW BOOK ================= */
export const borrowBook = async (req, res) => {
  try {
    const book = await LibraryBook.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    if (book.quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Book out of stock',
      });
    }

    book.quantity -= 1;
    await book.save();

    res.status(200).json({
      success: true,
      message: 'Book borrowed successfully',
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to borrow book',
      error: error.message,
    });
  }
};

/* ================= RETURN BOOK ================= */
export const returnBook = async (req, res) => {
  try {
    const book = await LibraryBook.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    book.quantity += 1;
    await book.save();

    res.status(200).json({
      success: true,
      message: 'Book returned successfully',
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to return book',
      error: error.message,
    });
  }
};
