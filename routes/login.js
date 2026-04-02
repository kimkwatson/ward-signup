const express = require('express');
const router = express.Router();
const passport = require('passport');

// Start Google OAuth
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    res.redirect('/auth/success');
  }
);

// Simple success/failure pages
router.get('/success', (req, res) => {
  res.send('Logged in with Google!');
});

router.get('/failure', (req, res) => {
  res.status(401).send('Google login failed.');
});

module.exports = router;