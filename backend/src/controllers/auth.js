// controllers/authController.js
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library
const passport = require('../services/auth');

const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

const decodeToken = async (req, res) => {
  const { token } = req.body; // Get token from req.body
  if (!token) {
    return res.status(400).json({ error: 'No token provided' }); // Ensure you're returning JSON
  }

  try {
    const decoded = jwt.verify(token, '3b30c0c9b2f1ec21f3a4df191c1e836dfbc2db186d7325cf46cdb9c9b6e7b6c3'); // Verify the token
    return res.json(decoded); // Return decoded token as JSON
  } catch (error) {
    console.error('Error decoding token:', error);
    return res.status(500).json({ error: 'Internal server error' }); // Return JSON even in error
  }
};



const googleCallback = (req, res) => {
  passport.authenticate('google', async (err, user) => {
    if (err || !user) {
      return res.redirect('http://localhost:3000'); // Redirect to frontend login on failure
    }

    try {
      // Define the payload for the token
      const payload = {
        username: user.username,   // Assuming user object has a username property
        email: user.email, // Assuming user object has a googleId property
        profilePic: user.profilePicture // Assuming user object has a profilePic property
      };

      // Create the token
      const token = jwt.sign(payload, '3b30c0c9b2f1ec21f3a4df191c1e836dfbc2db186d7325cf46cdb9c9b6e7b6c3', { expiresIn: '1h' }); // Use a secure secret key

      // Redirect to the frontend with the token
      res.redirect(`http://localhost:3000?token=${token}`);
    } catch (error) {
      console.error('Error generating token:', error);
      res.redirect('http://localhost:3000'); // Handle error and redirect
    }
  })(req, res);
};

const facebookAuth = passport.authenticate('facebook', { scope: ['email'] });

const facebookCallback = (req, res) => {
  passport.authenticate('facebook', (err, user) => {
    if (err || !user) {
      return res.redirect('http://localhost:3000/login'); // Redirect to frontend login on failure
    }

    // Successful login, send user back to frontend with user data or token
    const token = 'some-jwt-token'; // Generate a token if needed
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  })(req, res);
};

module.exports = {
  googleAuth,
  googleCallback,
  decodeToken,
  facebookAuth,
  facebookCallback,
};
