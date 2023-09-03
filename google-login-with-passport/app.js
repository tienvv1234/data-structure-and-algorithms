// app.js
const express = require('express');
const bodyParser = require('body-parser');
const authMiddleware = require('./authMiddleware');
const { googleLogin, googleCallback } = require('./authController');

const app = express();
app.use(bodyParser.json());

// The Google OAuth2 authentication route
app.get('/auth/google', googleLogin);

// The Google OAuth2 callback route
app.get('/auth/google/callback', googleCallback);

// Protected route - only accessible with a valid JWT token
app.get('/api/data', authMiddleware, (req, res) => {
  // The user object is accessible here through req.user
  const user = req.user;
  res.json({ message: `Hello, ${user.email}! This is a protected route.` });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
