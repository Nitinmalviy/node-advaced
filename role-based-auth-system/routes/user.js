const express = require("express");
const verifyToken = require("../middlewares/authMiddileware");
const roleAccessMiddleware = require("../middlewares/roleacessMiddileware");
const router = express.Router();

// admin only access this route

router.get("/admin", verifyToken, roleAccessMiddleware("admin"), (req, res) => {
  return res.status(200).json({ message: "Well-come Admin " });
});

// manager and admin access this route

router.get(
  "/manager",
  verifyToken,
  roleAccessMiddleware("admin", "manager"),
  (req, res) => {
    return res.status(200).json({ message: "Well-come Manager " });
  }
);

// any one access this route

router.get(
  "/user",
  verifyToken,
  roleAccessMiddleware("admin", "manager", "user"),
  (req, res) => {
    return res.status(200).json({ message: "Well-come User " });
  }
);

module.exports = router;
