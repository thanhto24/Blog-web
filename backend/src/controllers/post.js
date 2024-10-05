// controllers/postController.js

const postService = require("../services/post");

// Controller for creating a post
const createPost = async (req, res) => {
  console.log("Post controller post with data: ", req.body);
  try {
    const post = await postService.createPost(req.body);
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller for getting all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Controller for getting related posts
const getRelatedPosts = async (req, res) => {
  try {
    const posts = await postService.getRelatedPosts();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Controller for getting a single post by ID or slug
const getPostById = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller for updating a post
const updatePost = async (req, res) => {
  try {
    const post = await postService.updatePost(req.params.id, req.body);
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller for deleting a post
const deletePost = async (req, res) => {
  try {
    const post = await postService.deletePost(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getRelatedPosts,
  getPostById,
  updatePost,
  deletePost,
};
