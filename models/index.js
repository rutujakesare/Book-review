const sequelize = require('../config/database');
const User = require('./user');
const Book = require('./book');
const Review = require('./review');

// Associations
User.hasMany(Review);
Review.belongsTo(User);

Book.hasMany(Review);
Review.belongsTo(Book);

sequelize.sync();

module.exports = { sequelize, User, Book, Review };
