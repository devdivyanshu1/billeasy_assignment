const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createBook, getAllBooks, getBookById, searchBooks } = require('../controller/bookController');
const { addReview } = require('../controller/reviewController');

router.post('/books', auth, createBook);
router.get('/books', getAllBooks);
router.get('/books/:id', getBookById);
router.post('/books/:id/reviews', auth, addReview);
router.get('/search', searchBooks);

module.exports = router;
