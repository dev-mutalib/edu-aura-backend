import LibraryBook from '../models/LibraryBook.js';

/* GET ALL BOOKS */
export const getAllBooks = async (req, res) => {
  try {
    const books = await LibraryBook.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch books' });
  }
};

/* ADD BOOK (Admin only – future ready) */
export const addBook = async (req, res) => {
  try {
    const book = await LibraryBook.create(req.body);
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: 'Failed to add book' });
  }
};
