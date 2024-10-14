// routes/index.js

const express = require('express');
const router = express.Router();

// Manually import all your route files
const postRoutes = require('./post');
const imageRoutes = require('./image');
const authRoutes = require('./auth');
const userRoutes = require('./user');
const emailRoutes = require('./email');

// Manually add each set of routes
router.use('/posts', postRoutes);
router.use('/images', imageRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/email', emailRoutes);

//Add middle where here like this
// router.use('/posts', MiddlewareFunction[SchemaOfPost], postRoutes);


module.exports = router;
