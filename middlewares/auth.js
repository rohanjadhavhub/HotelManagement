module.exports.isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next(); // User is authenticated
  }
  res.redirect('/auth/login'); // Redirect to login if not authenticated
};
