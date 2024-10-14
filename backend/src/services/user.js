const User = require("../models/User");

const likePost = (email, postId) => {
  // Find the user by email and update the likedPosts array
  return User.findOneAndUpdate(
    { email }, // Find by email
    { $addToSet: { likedPosts: postId } }, // Use $addToSet to avoid duplicates
    { new: true, upsert: true } // Corrected typo: 'upsert'
  );
};

const checkLiked = async (email, postId) => {
  // Find the user and check if postId is in the likedPosts array
  const user = await User.findOne({ email });

  if (user && user.likedPosts.includes(postId)) {
    return true; // Post is liked
  }

  return false; // Post is not liked
};

const unlikePost = (email, postId) => {
  // Find the user by email and update the likedPosts array
  return User.findOneAndUpdate(
    { email }, // Find by email
    { $pull: { likedPosts: postId } }, // Use $pull to remove postId
    { new: true, upsert: true } // Corrected typo: 'upsert'
  );
};

module.exports = {
  likePost,
  checkLiked,
  unlikePost,
};
