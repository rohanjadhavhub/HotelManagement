module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
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

  return Room;
};
