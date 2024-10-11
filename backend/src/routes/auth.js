// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// Google OAuth
router.get('/google', authController.googleAuth);
router.get('/google/callback', authController.googleCallback);

// Facebook OAuth
router.get('/facebook', authController.facebookAuth);
router.get('/facebook/callback', authController.facebookCallback);

router.post('/decodeToken', authController.decodeToken);
module.exports = router;
