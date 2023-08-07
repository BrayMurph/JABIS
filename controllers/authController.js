// Import the necessary modules and the User model
const passport = require('passport');

// Define the login function to handle the login form submission
exports.login = passport.authenticate('local', {
  successRedirect: '/', // Redirect to the homepage on successful login
  failureRedirect: '/login', // Redirect back to the login page on failed login
});

exports.logout = (req, res) => {
  req.logout();

  // destroy session to clear user data
  req.session.destroy((err) => {
    if (err) {
      console.error('error logging out', err);
    }
  })
}
