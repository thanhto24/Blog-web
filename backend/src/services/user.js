const User = require("../models/User");
const Post = require("../models/Post");

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

const getAllLikedPosts = async (email) => {
  const user = await User.findOne({ email }).populate("likedPosts"); // Populate likedPosts with full post documents
  
  if (user) {
    findPosts = await Post.find({ _id: { $in: user.likedPosts } }); // Find all liked posts
    return findPosts; // Return the liked posts
  }

  return []; // Return an empty array if no user is found or no liked posts
};

const followUser = (email, followEmail) => {
  // Find the user by email and update the following array
  return User.findOneAndUpdate(
    { email: email }, // Find by email
    { $addToSet: { following: followEmail } }, // Use $addToSet to avoid duplicates
    { new: true, upsert: true } // Corrected typo: 'upsert'
  );
};

const unfollowUser = (email, followEmail) => {
  // Find the user by email and update the following array
  return User.findOneAndUpdate(
    { email: email }, // Find by email
    { $pull: { following: followEmail } }, // Use $pull to remove followEmail
    { new: true, upsert: true } // Corrected typo: 'upsert'
  );
};

const getAllFollowing = async (email) => {
  const user = await User.findOne({ email }).populate("following"); // Populate following with full user documents
  
  if (user) {
    findUsers = await User.find({ _id: { $in: user.following } }); // Find all followed users
    return findUsers; // Return the followed users
  }

  return []; // Return an empty array if no user is found or no followed users
};

const checkFollowed = async (email, followEmail) => {
  // Find the user and check if followEmail is in the following array
  const user = await User.findOne({email});
  if (user && user.following.includes(followEmail)) {
    return true; // User is followed
  }
  return false; // User is not followed
};

module.exports = { 
  likePost,
  checkLiked,
  unlikePost,
  getAllLikedPosts,
  followUser,
  unfollowUser,
  getAllFollowing,
  checkFollowed
};
