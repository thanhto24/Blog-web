// services/postService.js

const Post = require("../models/Post");
const mongoose = require("mongoose");

// Create a new post
const createPost = async (data) => {
  console.log("Post service post with data: ", data);
  const {
    title,
    slug,
    body,
    tags,
    category,
    author,
    thumbnail_url,
    description,
    status,
  } = data;
  const newPost = new Post({
    title,
    slug,
    body,
    tags,
    category,
    author,
    thumbnail_url,
    description,
    status: status || "draft",
  });
  return await newPost.save();
};

// Fetch all posts
const getAllPosts = async () => {
  console.log("Getting all posts");
  return await Post.find().sort({ createdAt: -1 }); // Sort by createdAt in descending order
};

const getRelatedPosts = async (relatedData) => {
  try {
    console.log("Getting related posts");

    // Initialize an array to hold all the unique related posts
    const allRelatedPosts = new Set();

    // Iterate over each tag in relatedData
    for (const tag of relatedData) {
      // Create regex patterns to find both starts with and contains matches
      const regex = new RegExp(tag, 'i'); // Case-insensitive match

      // Find posts for the current tag
      const posts = await Post.find({
        $or: [
          { tags: { $regex: `^${regex.source}`, $options: 'i' } }, // Start with
          { tags: { $regex: regex.source, $options: 'i' } }       // Contains
        ]
      });

      // Add the found posts to the set (to avoid duplicates)
      posts.forEach(post => allRelatedPosts.add(post._id.toString())); // Assuming post._id is a unique identifier
    }

    // Convert the Set back to an array of related posts
    return await Post.find({ _id: { $in: [...allRelatedPosts] } });

  } catch (error) {
    console.error("Error fetching related posts:", error);
    throw error; // Handle the error as needed
  }
};


// Fetch a single post by ID
const getPostById = async (id) => {
  console.log("Getting post by ID: ", id);
  return await Post.findById(id);
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
