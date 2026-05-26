const User = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const createToken = (res, _id) => {
  const token = jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
  res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
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

module.exports = {
  createAccount,
  loginUser,
  verifyUser,
};
