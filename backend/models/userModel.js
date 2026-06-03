const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const crypto = require("crypto");

const Schema = mongoose.Schema;
const userScheme = new Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  verificationToken: String,
  verificationTokenExpires: Date,
});

// signup method to create a new user
userScheme.statics.signup = async function (fname, lname, email, password) {
  // validation
  // normalize and sanitize inputs
  const cleanFname = typeof fname === "string" ? fname.trim() : "";
  const cleanLname = typeof lname === "string" ? lname.trim() : "";
  const cleanEmail =
    typeof email === "string" ? email.trim().toLowerCase() : "";

  if (!cleanFname || !cleanLname || !cleanEmail || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(cleanEmail)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }
  const exists = await this.findOne({ email: cleanEmail });
  if (exists) {
    throw Error("Email already in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const verificationToken = crypto.randomBytes(32).toString("hex"); // generate a random token for email verification
  const verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // token expires in 24 hours

  const user = await this.create({
    fname: cleanFname,
    lname: cleanLname,
    email: cleanEmail,
    password: hash,
    verificationToken: verificationToken,
    verificationTokenExpires: verificationTokenExpires,
  });
  return user;
};

userScheme.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  if (!user.isVerified) {
    throw Error("Please verify your email before logging in");
  }

  return user;
};

module.exports = mongoose.model("User", userScheme);
