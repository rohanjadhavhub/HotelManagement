const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Booking = sequelize.define('Booking', {
  room_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  room_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('booked', 'cancelled'),
    defaultValue: 'booked',
  }
});

module.exports = Booking;
