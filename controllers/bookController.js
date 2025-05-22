const { Book, Review, User } = require('../models');
const { Op } = require('sequelize');

exports.addBook = async (req, res) => {
  const { title, author, genre } = req.body;
  const book = await Book.create({ title, author, genre });
  res.json(book);
};

exports.getBooks = async (req, res) => {
  const { page = 1, limit = 10, author, genre } = req.query;
  const offset = (page - 1) * limit;

  const where = {};
  if (author) where.author = { [Op.like]: `%${author}%` };
  if (genre) where.genre = { [Op.like]: `%${genre}%` };

  const books = await Book.findAndCountAll({ where, offset: +offset, limit: +limit });
  res.json(books);
};

exports.getBookById = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findByPk(id, {
    include: { model: Review, include: [User] }
  });

  if (!book) return res.status(404).json({ error: 'Book not found' });

  const avgRating =
    book.Reviews.length > 0
      ? book.Reviews.reduce((acc, r) => acc + r.rating, 0) / book.Reviews.length
      : null;

  res.json({ book, averageRating: avgRating });
};

exports.searchBooks = async (req, res) => {
  const { q } = req.query;
  const books = await Book.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.iLike]: `%${q}%` } },
        { author: { [Op.iLike]: `%${q}%` } }
      ]
    }
  });
  res.json(books);
};
