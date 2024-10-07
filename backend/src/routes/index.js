// routes/index.js

const express = require('express');
const router = express.Router();

// Manually import all your route files
const postRoutes = require('./post');
const imageRoutes = require('./image');

// Manually add each set of routes
router.use('/posts', postRoutes);
router.use('/images', imageRoutes);

//Add middle where here like this
// router.use('/posts', MiddlewareFunction[SchemaOfPost], postRoutes);


module.exports = router;
