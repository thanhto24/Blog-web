const userService = require("../services/user");

const likePost = async (req, res) => {
  const { email, postId } = req.body; // Get email and postId from req.body
  if (!email || !postId) {
    return res.status(400).json({ error: "Email and postId are required" });
  }

  try {
    const user = await userService.likePost(email, postId); // Call the service function
    res.json(user); // Return the updated user
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const checkLiked = async (req, res) => {
  const { email, postId } = req.body;
  console.log("Checking like status for:", email, postId);
  // Validate input
  if (!email || !postId) {
    return res.status(400).json({ error: "Email and postId are required" });
  }

  try {
    // Call service function to check if the user has liked the post
    const isLiked = await userService.checkLiked(email, postId);

    // Respond with a boolean indicating the like status
    res.json({ liked: isLiked });
  } catch (error) {
    console.error("Error checking like status:", error);

    // Return a 500 response if something goes wrong
    res.status(500).json({ error: "Internal server error" });
  }
};

const unlikePost = async (req, res) => {
  const { email, postId } = req.body; // Get email and postId from req.body
  console.log("Unliking post:", email, postId);
  if (!email || !postId) {
    return res.status(400).json({ error: "Email and postId are required" });
  }

  try {
    const user = await userService.unlikePost(email, postId); // Call the service function
    res.json(user); // Return the updated user
  } catch (error) {
    console.error("Error unliking post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  likePost,
  checkLiked,
  unlikePost,
};
