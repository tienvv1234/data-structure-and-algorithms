// authMiddleware.js
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
// const { jwtSecret } = require('./config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'jwtSecret',
};

passport.use(
  new JwtStrategy(options, (payload, done) => {
    console.log('payload', payload);
    // Here, you can verify the user's identity based on the payload
    // In a real application, you might check the user's existence in the database
    // and call the `done` callback accordingly.
    // For simplicity, we'll assume the payload contains a user object with an ID field.
    const user = { id: payload.id, email: payload.email }; // Replace with your user data from the JWT
    return done(null, user);
  })
);

// This middleware function checks if the user is authenticated using the JWT strategy
function authMiddleware(req, res, next) {
    console.log('authMiddleware');
  passport.authenticate('jwt', { session: false }, (err, user) => {
    console.log('user', user);
    if (err || !user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // If the user is authenticated, store the user object in the request for future use
    req.user = user;
    return next();
  })(req, res, next);
}


module.exports = authMiddleware;
