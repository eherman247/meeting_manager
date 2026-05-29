const User = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const sendVerificationEmail = require("../resend/email").sendVerificationEmail;
const sendResetPasswordEmail =
  require("../resend/email").sendResetPasswordEmail;

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

    console.log("About to send verification email to:", email);
    // Send verification email
    await sendVerificationEmail(email, user.verificationToken);

    console.log("Verification email sent to:", email);

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

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "No user found with that email" });
    }
    const resetPasswordToken = await bcrypt.genSalt(20);
    const resetPasswordExpires = Date.now() + 60 * 60 * 1000;
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = resetPasswordExpires;
    await user.save();
    // Send password reset email
    await sendResetPasswordEmail(user.email, resetPasswordToken);
    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(400).json({ error: error.message });
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
    user.password = hash;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createAccount,
  loginUser,
  verifyUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
