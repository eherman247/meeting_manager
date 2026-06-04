const express = require("express");
const rateLimit = require("express-rate-limit");
const logger = require("../utils/logger");
let RedisStore;
let redisClient;
try {
  RedisStore = require("rate-limit-redis");
  const Redis = require("redis");
  if (process.env.REDIS_URL) {
    redisClient = Redis.createClient({ url: process.env.REDIS_URL });
    redisClient
      .connect()
      .catch((err) => logger.error("Redis connect error:", err));
  }
} catch (e) {
  // optional redis not installed; fall back to in-memory store
}
const {
  createAccount,
  loginUser,
  verifyUser,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// rate limiters
const baseAuthOptions = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
};

const baseCreateAccountOptions = {
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit account creations per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many accounts created from this IP, please try later.",
  },
};

if (redisClient && RedisStore) {
  baseAuthOptions.store = new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  });
  baseCreateAccountOptions.store = new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  });
}

const authLimiter = rateLimit(baseAuthOptions);
const createAccountLimiter = rateLimit(baseCreateAccountOptions);

// auth routes with rate limiting
router.post("/login", authLimiter, loginUser);
router.post("/createUser", createAccountLimiter, createAccount);

// verify JWT and keep user logged in on page load
router.get("/verify", requireAuth, verifyUser);

router.patch("/verify-email", authLimiter, verifyEmail);
router.post("/resend-verification", authLimiter, resendVerification);

router.post("/forgot-password", authLimiter, forgotPassword);

router.patch("/reset-password/:token", authLimiter, resetPassword);

module.exports = router;
