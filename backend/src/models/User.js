// models/User.js
const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,  // Ensure unique Google IDs
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensure unique email addresses
  },
  profilePicture: {
    type: String,  // URL to the profile picture
  },
  likedPosts: {
    type: [String],  // Array of post IDs that the user has liked
  },
  following: {
    type: [String],  // Array of user IDs that the user is following
  },
  followers: {
    type: [String],  // Array of user IDs that are following the user
  },
  comments: {
    type: [String],  // Array of comment IDs that the user has made
  },
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;  // Export the User model
