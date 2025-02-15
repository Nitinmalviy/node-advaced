const roleAccessMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "You don't have permission to access this route" });
    }

    return next();
  };
};

module.exports = roleAccessMiddleware;
