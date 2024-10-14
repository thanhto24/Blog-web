const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// Like a post
router.post('/like', userController.likePost);
router.post('/check-like', userController.checkLiked);
router.post('/unlike', userController.unlikePost);

module.exports = router;