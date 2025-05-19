const Review = require('../models/Review');
const Book = require('../models/book');

exports.addReview = async (req, res) => {
  const { rating, comment } = req.body;
  const userId = req.user.id;
  const bookId = req.params.id;

  const existing = await Review.findOne({ user: userId, book: bookId });
  if (existing) return res.status(400).json({ message: "Already reviewed" });

  const review = await Review.create({ user: userId, book: bookId, rating, comment });
  await Book.findByIdAndUpdate(bookId, { $push: { reviews: review._id } });
  res.status(201).json(review);
};

exports.updateReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review || review.user.toString() !== req.user.id)
    return res.status(403).json({ message: "Unauthorized" });

  const { rating, comment } = req.body;
  review.rating = rating ?? review.rating;
  review.comment = comment ?? review.comment;
  await review.save();

  res.json(review);
};

exports.deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review || review.user.toString() !== req.user.id)
    return res.status(403).json({ message: "Unauthorized" });

  await Book.findByIdAndUpdate(review.book, { $pull: { reviews: review._id } });
  await review.remove();

  res.json({ message: "Review deleted" });
};
