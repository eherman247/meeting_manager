const express = require("express");
const {
  createTimeSession,
  getTimeSession,
  getTimeSessionByCode,
  joinTimeSession,
  getTimeSessions,
  deleteTimeSession,
} = require("../controllers/timeSessionController");
const rateLimit = require("express-rate-limit");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// get all timesessions
router.get("/", requireAuth, getTimeSessions);

// get a single timesession by session code
router.get("/code/:sessionCode", getTimeSessionByCode);

// join a timesession by code (+ optional password)
const joinLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 12, // limit each IP to 12 requests per windowMs
  message: { error: "Too many join attempts, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});
router.post("/join", joinLimiter, joinTimeSession);

// get a single timesession
router.get("/:id", getTimeSession);

// post a timesession
router.post("/", requireAuth, createTimeSession);

// delete a timesession
router.delete("/:id", requireAuth, deleteTimeSession);

module.exports = router;
