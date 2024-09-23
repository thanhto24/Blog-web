// routes/index.js

const express = require('express');
const router = express.Router();

// Manually import all your route files
const postRoutes = require('./post');
// const userRoutes = require('./users');

// Manually add each set of routes
router.use('/posts', postRoutes);
// router.use('/users', userRoutes);

module.exports = router;
