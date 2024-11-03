const { Sequelize } = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  schema: 'hotel_management',
  logging: false, // Set to true for detailed query logs
});

// Import models
const Room = require('./Room')(sequelize, Sequelize.DataTypes);
const Booking = require('./Booking')(sequelize, Sequelize.DataTypes);
const User = require('./user')(sequelize, Sequelize.DataTypes); // Import User model correctly

// Export models
module.exports = { sequelize, Room, Booking, User };
