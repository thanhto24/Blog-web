// routes/posts.js

const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');

// Create a post
router.post('/', postController.createPost);

// Get all posts
router.get('/', postController.getAllPosts);

// Get related posts
router.get('/related', postController.getRelatedPosts);

// Get a single post by ID
router.get('/id/:id', postController.getPostById);

// Get posts by search term
router.get('/search/:searchTerm', postController.getPostsBySearchTerm);

// Update a post
router.put('/:id', postController.updatePost);

// Delete a post
router.delete('/:id', postController.deletePost);

module.exports = router;
