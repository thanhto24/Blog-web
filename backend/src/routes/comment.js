const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');

// Create a comment
router.post('/', commentController.createComment);

// Get all comments for a post
router.get('/:postId', commentController.getComments);

module.exports = router;