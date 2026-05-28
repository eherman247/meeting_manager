const User = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const sendVerificationEmail = require("../resend/email");

const createToken = (res, _id) => {
  const token = jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
  return token;
};

// get a single user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(res, user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create a new user
const createAccount = async (req, res) => {
  const { fname, lname, email, password } = req.body;
  try {
    const user = await User.signup(fname, lname, email, password);

    const token = createToken(user._id);

    // Send verification email
    await sendVerificationEmail(email, user.verificationToken);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const verifyUser = async (req, res) => {
  // requireAuth already validated the token and attached req.user
  res.status(200).json({ valid: true });
};

const verifyEmail = async (req, res) => {
  console.log("Received email verification request with body:", req.body);
  const { token } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });
    if (!user) {
      console.error("Invalid or expired verification token");
      return res.status(400).json({ error: "Invalid verification token" });
    }

    console.log("User found for verification:", user.email);
    console.log("Token provided:", token);
    console.log("User's verification token:", user.verificationToken);
    console.log("Token expiration time:", user.verificationTokenExpires);
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createAccount,
  loginUser,
  verifyUser,
  verifyEmail,
};
