// services/postService.js

const Post = require("../models/Post");
const mongoose = require('mongoose');

// Create a new post
const createPost = async (data) => {
  console.log("Post service post with data: ", data);
  const { title, slug, body, tags, category, author, status } = data;
  const newPost = new Post({
    title,
    slug,
    body,
    tags,
    category,
    author,
    status: status || "draft",
  });
  return await newPost.save();
};

// Fetch all posts
const getAllPosts = async () => {
  console.log("Getting all posts");
  return await Post.find();
};

const getRelatedPosts = async () => {
  console.log("Getting related posts");
  return await Post.find();
}

// Fetch a single post by ID
const getPostById = async (id) => {
  console.log("Getting post by ID: ", id);
  return await Post.findOne({ _id: id });
};

// Update an existing post
const updatePost = async (id, data) => {
  const post = await Post.findById(id);
  if (!post) throw new Error("Post not found");
  Object.assign(post, data);
  return await post.save();
};

// Delete a post
const deletePost = async (id) => {
  const post = await Post.findById(id);
  if (!post) throw new Error("Post not found");
  await post.remove();
  return post;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  getRelatedPosts,
  updatePost,
  deletePost,
};
