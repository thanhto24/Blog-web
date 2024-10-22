const Comment = require("../models/Comment");
const mongoose = require("mongoose");

// Create a new comment
const createComment = async (data) => {
  // console.log("Comment service post with data: ", data);
  const {
    comment_ava_url,
    comment_text,
    comment_owner,
    comment_post,
    comment_root,
  } = data;
  const newComment = new Comment({
    comment_ava_url,
    comment_text,
    comment_owner,
    comment_post,
    comment_root,
  });
  return await newComment.save();
};

// Fetch all comments for a post
const getComments = async (postId) => {
  return await Comment.find({ comment_post: postId }).sort({ updatedAt: 1 });
};

module.exports = {
  createComment,
  getComments,
};
