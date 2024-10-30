// app.js
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');  // Import index.js from routes folder
require('dotenv').config({path: 'src/config/.env'});
const session = require('express-session');
const passport = require('./services/auth'); // Load the service for Google Auth

const app = express();

// Middleware to parse JSON bodies
app.use(cors({
  origin: '*', // Allow all origins
}));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Connect to MongoDB (replace with your connection string)
const MongoDB_URI = process.env.MONGODB_URI;
// console.log(MongoDB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.connect(MongoDB_URI)
  // .then(() => console.log('Connected to MongoDB'))
  // .catch((err) => console.log(err));

// Use the routes from index.js
app.use('/', routes);

// Start the server
const PORT = process.env.PORT || 5000;

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  // console.log(`Server is running on port ${PORT}`);
});
