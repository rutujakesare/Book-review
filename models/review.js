const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Review = sequelize.define('Review', {
  rating: { type: DataTypes.INTEGER, allowNull: false },
  comment: { type: DataTypes.STRING }
});

module.exports = Review;
