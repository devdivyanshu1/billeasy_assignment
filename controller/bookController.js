const Book = require('../models/book');
const Review = require('../models/Review');

exports.createBook = async (req, res) => {
  const { title, author, genre } = req.body;
  try {
    const book = await Book.create({ title, author, genre });
    res.status(201).json(book);
  } catch {
    res.status(400).json({ message: "Book creation failed" });
  }
};

exports.getAllBooks = async (req, res) => {
  const { author, genre, page = 1, limit = 10 } = req.query;
  const query = {};
  if (author) query.author = new RegExp(author, 'i');
  if (genre) query.genre = new RegExp(genre, 'i');

  const books = await Book.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json(books);
};

exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id).populate({
    path: 'reviews',
    populate: { path: 'user', select: 'username' }
  });

  if (!book) return res.status(404).json({ message: "Not found" });

  const avgRating =
    book.reviews.reduce((acc, r) => acc + r.rating, 0) / (book.reviews.length || 1);

  res.json({ book, avgRating });
};

exports.searchBooks = async (req, res) => {
  const { q } = req.query;
  const books = await Book.find({
    $or: [
      { title: new RegExp(q, 'i') },
      { author: new RegExp(q, 'i') }
    ]
  });
  res.json(books);
};
