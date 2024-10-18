const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    comment_text: { type: String, required: true },
    comment_owner: { type: String, required: true },
    comment_post: { type: String, required: true },
    comment_likes: { type: Number, default: 0 },
    comment_root: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
