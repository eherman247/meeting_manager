const User = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const validator = require("validator");
const logger = require("../utils/logger");
const sendVerificationEmail = require("../resend/email").sendVerificationEmail;
const sendResetPasswordEmail =
  require("../resend/email").sendResetPasswordEmail;

const createToken = (_id) => {
  const token = jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
  return token;
};

// get a single user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const cleanEmail =
    typeof email === "string" ? email.trim().toLowerCase() : "";
  if (!cleanEmail || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  try {
    const user = await User.login(cleanEmail, password);
    const token = createToken(user._id);
    // return the cleaned email used for authentication
    res
      .status(200)
      .json({ email: cleanEmail, token, isVerified: user.isVerified });
  } catch (error) {
    res.status(400).json({ error: "Unable to login" });
  }
};

// create a new user
const createAccount = async (req, res) => {
  const { fname, lname, email, password } = req.body;
  const cleanFname = typeof fname === "string" ? fname.trim() : "";
  const cleanLname = typeof lname === "string" ? lname.trim() : "";
  const cleanEmail =
    typeof email === "string" ? email.trim().toLowerCase() : "";

  if (!cleanFname || !cleanLname || !cleanEmail || !password) {
    return res.status(400).json({ error: "All fields must be provided" });
  }
  if (!validator.isEmail(cleanEmail)) {
    return res.status(400).json({ error: "Invalid email address" });
  }
  try {
    const user = await User.signup(
      cleanFname,
      cleanLname,
      cleanEmail,
      password,
    );

    const token = createToken(user._id);

    logger.info("Sending verification email for new signup");
    await sendVerificationEmail(email, user.verificationToken);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: "Unable to create account" });
  }
};

const verifyUser = async (req, res) => {
  // requireAuth already validated the token and attached req.user
  res.status(200).json({ valid: true });
};

const verifyEmail = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });
    if (!user) {
      logger.error("Invalid or expired verification token");
      return res
        .status(400)
        .json({ error: "Invalid verification token", isVerified: false });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();
    res
      .status(200)
      .json({ isVerified: true, message: "Email verified successfully" });
  } catch (error) {
    logger.error("Error verifying email:", error);
    res
      .status(400)
      .json({ error: "Unable to verify email", isVerified: false });
  }
};

const resendVerification = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: "Verification token is required" });
  }

  try {
    const user = await User.findOne({ verificationToken: token });
    if (!user || user.isVerified) {
      return res
        .status(400)
        .json({ error: "Unable to resend verification email" });
    }

    const newToken = crypto.randomBytes(32).toString("hex");
    user.verificationToken = newToken;
    user.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    await sendVerificationEmail(user.email, newToken);
    res.status(200).json({ message: "Verification email resent" });
  } catch (error) {
    logger.error("Error resending verification email:", error);
    res.status(400).json({ error: "Unable to resend verification email" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  logger.info("Received forgot password request");
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "No user found with that email" });
    }
    const resetPasswordToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordExpires = Date.now() + 60 * 60 * 1000;
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = resetPasswordExpires;
    await user.save();
    // Send password reset email
    await sendResetPasswordEmail(user.email, resetPasswordToken);
    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(400).json({ error: "Unable to process request" });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    logger.info("Resetting password for a verified user");
    user.password = hash;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(400).json({ error: "Unable to reset password" });
  }
};

module.exports = {
  createAccount,
  loginUser,
  verifyUser,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword,
};
