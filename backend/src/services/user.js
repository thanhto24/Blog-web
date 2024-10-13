const User = require('../models/User');

const likePost = (userId, postId) => {
  // Find the user by ID and update the likedPosts array
  return User.findByIdAndUpdate(userId, { $push: { likedPosts: postId } }, { new: true, upset: true });
};