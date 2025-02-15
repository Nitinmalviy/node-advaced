const { configDotenv } = require("dotenv");
const jwt = require("jsonwebtoken");
configDotenv();

const accessToken = process.env.ACCESS_TOKEN_SECRET;
console.log("accessToken ------------>", accessToken);
const RefreshToken = process.env.REFRESH_TOKEN_SECRET;
console.log("RefreshToken ------------>", RefreshToken);

const generateAccessToken = (user) => {
  return jwt.sign({ _id: user._id, role: user.role }, accessToken, {
    expiresIn: "1m",
  });
};

const generateRefreshToken = (user) => {
  return (
    jwt.sign({ _id: user._id, role: user.role }, RefreshToken),
    {
      expiresIn: "12m",
    }
  );
};

module.exports = { generateAccessToken, generateRefreshToken };
