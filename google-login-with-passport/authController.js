// authController.js
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
// const { jwtSecret } = require('./config');

// Replace these values with your actual Google OAuth2 credentials
const GOOGLE_CLIENT_ID = '607424830877-u7g4b37psolbpipajpmj8b01viccicek.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
const CALLBACK_URL = '/auth/google/callback'; // e.g., http://localhost:3000/auth/google/callback

// Initialize Passport for Google OAuth2 strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // Here, you would typically check if the user exists in the database and create one if not.
      // For this example, we'll assume the user's Google profile contains an email field.
      console.log('profile', profile);
      const user = { id: profile.id, email: profile.emails[0].value };
      console.log('user', user);
      const token = jwt.sign(user, 'jwtSecret', { expiresIn: '1h' });
      console.log('token', token);
      return done(null, token);
    }
  )
);

// This middleware function initiates the Google OAuth2 authentication flow
function googleLogin(req, res, next) {
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
}

// This middleware function handles the Google OAuth2 callback
function googleCallback(req, res, next) {
  console.log('googleCallback');
  passport.authenticate('google', (err, token) => {
    console.log('token', token);
    console.log('err', err);
    if (err) {
      return res.status(500).json({ message: 'Error during Google OAuth2 authentication' });
    }
    if (!token) {
      return res.status(401).json({ message: 'Google OAuth2 authentication failed' });
    }
    // Redirect to a success route that stores the token on the client-side
    // res.redirect(`/auth/success?token=${token}`);
    res.json({ token });
  })(req, res, next);
}

module.exports = { googleLogin, googleCallback };
