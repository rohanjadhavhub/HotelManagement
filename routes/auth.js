const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const session = require('express-session');

// Route for user registration
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { name, username, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      role
    });

    res.redirect('/auth/login');
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Route for user login
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid credentials');
    }

    req.session.userId = user.id;
    req.session.role = user.role;
    res.redirect('/');
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Route for user logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
