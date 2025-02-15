const express = require("express");
const passport = require("passport");
const {
  register,
  login,
  logout,
  authStatus,
  setup2FA,
  verify2FA,
  reset2FA,
} = require("../controllers/auth.controller");
const isAuthenticate = require("../config/authenticate");

const router = express.Router();

// register user route
router.post("/register", register);

// login register routes
router.post("/login", passport.authenticate("local"), login);

// logout register routes
router.post("/logout", logout);

// get auth status routes
router.get("/status", authStatus);

//  mfa routes here start

// 2fa setup
router.post("/2fa/setup", isAuthenticate, setup2FA);

// verify token 2fa

router.post("/2fa/verify", isAuthenticate, verify2FA);

//Reset route

router.post("/2fa/reset", isAuthenticate, reset2FA);

module.exports = router;
