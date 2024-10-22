const commentService = require('../services/comment');

// Controller for creating a comment
const createComment = async (req, res) => {
  // console.log('Comment controller post with data: ', req.body);
  try {
    const comment = await commentService.createComment(req.body);
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller for getting all comments for a post
const getComments = async (req, res) => {
  try {
    const comments = await commentService.getComments(req.params.postId);
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createComment,
  getComments,
};