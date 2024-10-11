// services/authService.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User'); // Import the User model

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Google OAuth strategy
passport.use(new GoogleStrategy({
  // clientID: process.env.GOOGLE_CLIENT_ID,
  // clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  clientID: '627069336143-diek1h7bev2mes82cru5sm7n64t2kkob.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if the user already exists in our db
    let user = await User.findOne({ googleId: profile.id });

    // If not, create a new user
    if (!user) {
      user = await new User({
        googleId: profile.id,
        username: profile.displayName, // or profile.name
        email: profile.emails[0].value, // Get the email from the profile
        profilePicture: profile.photos[0].value, // Get the profile picture
      }).save();
    }

    done(null, user);
  } catch (err) {
    console.error(err);
    done(err, null);
  }
}));

// Facebook OAuth strategy
// passport.use(new FacebookStrategy({
//   // clientID: process.env.FACEBOOK_APP_ID,
//   // clientSecret: process.env.FACEBOOK_APP_SECRET,
//   clientID: '547187277856196',
//   clientSecret: 'f022719a38319eb0da90c8dc3454a56b',
//   callbackURL: '/auth/facebook/callback',
//   profileFields: ['id', 'displayName', 'photos', 'email'], // Specify fields to retrieve
// }, async (accessToken, refreshToken, profile, done) => {
//   try {
//     // Check if the user already exists in our db
//     let user = await User.findOne({ facebookId: profile.id });

//     // If not, create a new user
//     if (!user) {
//       user = await new User({
//         facebookId: profile.id,
//         username: profile.displayName, // or profile.name
//         email: profile.emails[0].value, // Get the email from the profile
//         profilePicture: profile.photos[0].value, // Get the profile picture
//       }).save();
//     }

//     done(null, user);
//   } catch (err) {
//     console.error(err);
//     done(err, null);
//   }
// }));

module.exports = passport;  // Export the passport instance
