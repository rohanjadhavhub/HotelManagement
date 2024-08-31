const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Adjust the path if necessary


if (!(sequelize instanceof sequelize)) {
  throw new Error('The sequelize instance is not valid.');
}

const Room = sequelize.define('Room', { // Use 'Room' for the model name
  room_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
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
    type: DataTypes.ENUM('available', 'occupied', 'maintenance'),
    defaultValue: 'available',
  }
});


module.exports = Room;
