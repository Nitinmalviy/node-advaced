const isAuthenticate = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized request" });
};

module.exports = isAuthenticate;
