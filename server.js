const express = require('express');
const session = require('express-session');
const path = require('path');
const { sequelize } = require('./models'); // Destructure to get the sequelize instance
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Session management
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
}));

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

// Sync Sequelize Models and Start Server
sequelize.sync().then(() => { // Use the correct sequelize instance
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => console.log('Error connecting to the database:', err));
