const express = require('express');
const router = express.Router();
const { Room, Booking } = require('../models');
const { isAuthenticated } = require('../middleware/auth');

// Middleware to check if user is authenticated
router.use((req, res, next) => {
  res.locals.user = req.session.userId;
  res.locals.role = req.session.role;
  next();
});

// Route to display available rooms
router.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.render('rooms', { rooms });
  } catch (err) {
    console.error('Error fetching rooms:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle room booking
router.post('/book', isAuthenticated, async (req, res) => {
  const roomId = req.body.room_id;

  try {
    const room = await Room.findByPk(roomId);

    if (!room) {
      return res.status(404).send('Room not found');
    }

    if (room.status !== 'available') {
      return res.status(400).send('Room is not available for booking');
    }

    await Booking.create({
      room_id: room.id,
      room_number: room.room_number,
      type: room.type,
      price: room.price,
      status: 'booked'
    });

    room.status = 'booked';
    await room.save();

    res.render('booking', { booking: room });
  } catch (err) {
    console.error('Error booking room:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
