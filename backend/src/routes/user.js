const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// Like a post
router.post('/like', userController.likePost);
router.post('/check-like', userController.checkLiked);
router.patch('/unlike', userController.unlikePost);
router.post('/liked-posts', userController.getAllLikedPosts);

// Follow a user
router.post('/follow', userController.followUser);
router.patch('/unfollow', userController.unfollowUser);
router.post('/following', userController.getAllFollowing);
router.post('/check-follow', userController.checkFollowed);

module.exports = router;