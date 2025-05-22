const { Review } = require('../models');

exports.addReview = async (req, res) => {
  const { id: bookId } = req.params;
  const { rating, comment } = req.body;
  const existing = await Review.findOne({ where: { userId: req.userId, bookId } });
  if (existing) return res.status(400).json({ error: 'You already reviewed this book' });

  const review = await Review.create({ rating, comment, userId: req.userId, bookId });
  res.json(review);
};

exports.updateReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findByPk(id);
  if (!review || review.userId !== req.userId) return res.status(403).json({ error: 'Unauthorized' });

  const { rating, comment } = req.body;
  review.rating = rating;
  review.comment = comment;
  await review.save();
  res.json(review);
};

exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  const review = await Review.findByPk(id);
  if (!review || review.userId !== req.userId) return res.status(403).json({ error: 'Unauthorized' });

  await review.destroy();
  res.json({ message: 'Review deleted' });
};
