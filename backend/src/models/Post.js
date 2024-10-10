const mongoose = require("mongoose");

// Define the Post schema
const PostSchema = new mongoose.Schema(
  {
    title: { type: String },
    slug: { type: String },
    body: { type: String },
    tags: [String],
    category: { type: String },
    author: { type: String },
    thumbnail_url: { type: String },
    description: { type: String },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true }
);

// Export the Post model
module.exports = mongoose.model("Post", PostSchema);
