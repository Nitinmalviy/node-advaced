const { configDotenv } = require("dotenv");
const jwt = require("jsonwebtoken");
configDotenv();
const key = process.env.ACCESS_TOKEN_SECRET;


const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];


  if (!authHeader) {
    return res.status(401).json({ message: "Access denied" });
  }

  // Extract token from "Bearer <token>"
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, key);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Error in verifyToken", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
