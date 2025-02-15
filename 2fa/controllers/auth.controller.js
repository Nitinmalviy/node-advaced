const bcrypt = require("bcryptjs");
const authModel = require("../model/auth.model");
const speakeasy = require("speakeasy");
const qrCode = require("qrcode");
const jwt = require("jsonwebtoken");
// -------------------------- authentication api's --------------------------------------//

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    console.log("username ------- ", username, "Password ------", password);

    // apply validations here
    if (!username || !password || !role)
      return res.status(400).json({ message: "Invalid Formate" });

    const user = await authModel.findOne({ username });

    if (user) {
      return res.status(409).json({
        status: "409",
        message: "user all-ready exits with this username",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new authModel({
      username,
      password: hashedPassword,
      isMfaActive: false,
      role: role,
    });

    console.log("New-User", newUser);

    await newUser.save();

    return res.status(200).json({ message: "User Register successfully " });
  } catch (error) {
    console.error(`Error while register -------> ${error.message}`);
    return res.status(500).json({ error: "Internal server Error" });
  }
};

const login = async (req, res) => {
  try {
    console.log("The Authenticate user is  : ", req.user);

    return res.status(200).json({
      message: "User Logged In successfully",
      username: req.user.username,
      isMfaActive: req.user.isMfaActive,
    });
  } catch (error) {
    console.error(`Error while login -------> ${error.message}`);
    return res.status(500).json({ error: "Internal server Error" });
  }
};

const logout = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(200).json({ message: "User already logged out" });
    }

    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "User not logged out" });
      }
      return res.status(200).json({ message: "User Logged out Successfully" });
    });
  } catch (error) {
    console.error(`Error while logout -------> ${error.message}`);
    return res.status(500).json({ error: "Internal server Error" });
  }
};

const authStatus = async (req, res) => {
  try {
    if (req.user) {
      return res.status(200).json({
        message: "User Logged In successfully",
        username: req.user.username,
        isMfaActive: req.user.isMfaActive,
      });
    } else {
      return res.status(200).json({ message: " Unauthorized User" });
    }
  } catch (error) {
    console.error(`Error while authStatus -------> ${error.message}`);
    return res.status(500).json({ error: "Internal server Error" });
  }
};

//------------------------------------- 2fa controllers ------------------------------------------------------//

const setup2FA = async (req, res) => {
  try {
    console.log("Requested user is ", req.user);
    const user = req.user;
    let secret = speakeasy.generateSecret();
    console.log("Secret object is :", secret);
    user.twoFactorSecret = secret.base32;
    user.isMfaActive = true;
    await user.save();
    const url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: `${req.user.username}`,
      issuer: "www.ni3.dev",
      encoding: "base32",
    });
    const qrImageUrl = await qrCode.toDataURL(url);

    return res.status(200).json({ message: "2fa setup", qrCode: qrImageUrl });
  } catch (error) {
    console.error(`Error while setup2FA -------> ${error.message}`);
    return res.status(500).json({ error: "Internal server Error" });
  }
};

const verify2FA = async (req, res) => {
  try {
    const { token } = req.body;
    const user = req.user;
    console.log(token);

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
    });

    if (verified) {
      const jwtToken = jwt.sign(
        { username: user.usernmae },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "20m",
        }
      );

      return res.status(200).json({ message: "2FA Complete Successfully" });
    } else {
      return res.status(200).json({ message: "In-valid 2FA Token" });
    }
  } catch (error) {
    console.error(`Error while verify2FA -------> ${error.message}`);
    return res.status(500).json({ error: "Internal server Error" });
  }
};

const reset2FA = async (req, res) => {
  try {
    const user = req.user;
    user.twoFactorSecret = " ";
    user.isMfaActive = false;
    await user.save();
    return res.status(200).json({ message: "Reset 2FA successfully" });
  } catch (error) {
    console.error(`Error while reset2FA -------> ${error.message}`);
    return res.status(500).json({ error: " Error while reset in 2FA" });
  }
};
module.exports = {
  register,
  login,
  logout,
  authStatus,
  reset2FA,
  verify2FA,
  setup2FA,
};
