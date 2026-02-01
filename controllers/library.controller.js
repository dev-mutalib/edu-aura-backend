import LibraryBook from '../models/LibraryBook.js';

/* ================= GET ALL BOOKS ================= */
export const getAllBooks = async (req, res) => {
  try {
    const books = await LibraryBook.find().sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch books',
      error: error.message,
    });
  }
};

/* ================= ADD BOOK (ADMIN ONLY) ================= */
export const addBook = async (req, res) => {
  try {
    const { title, author, quantity, image } = req.body;

    // 🔒 Validation
    if (!title || !author || !image) {
      return res.status(400).json({
        message: 'Title, author and image are required',
      });
    }

    const book = await LibraryBook.create({
      title,
      author,
      quantity: quantity ?? 1,
      image,
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({
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
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.quantity <= 0) {
      return res.status(400).json({ message: 'Book out of stock' });
    }

    book.quantity -= 1;
    await book.save();

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({
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
      return res.status(404).json({ message: 'Book not found' });
    }

    book.quantity += 1;
    await book.save();

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to return book',
      error: error.message,
    });
  }
};
