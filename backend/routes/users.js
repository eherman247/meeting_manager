const express = require("express");
const {
  createAccount,
  loginUser,
  verifyUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// get a single user
router.post("/login", loginUser);

// create an account
router.post("/createUser", createAccount);

// verify JWT and keep user logged in on page load
router.get("/verify", requireAuth, verifyUser);

router.patch("/verify-email", verifyEmail);

router.post("/forgot-password", forgotPassword);

router.patch("/reset-password/:token", resetPassword);

module.exports = router;
