const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('hotel_management', 'username', 'password', {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  schema: 'hotel_management',
  logging: false, // Set to true for detailed query logs
});

// Import models
const Room = require('./Room')(sequelize, Sequelize.DataTypes);
const Booking = require('./Booking')(sequelize, Sequelize.DataTypes);

// Export models
module.exports = { sequelize, Room, Booking };
