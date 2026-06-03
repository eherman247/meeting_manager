const express = require("express");
const {
  createTimeSession,
  getTimeSession,
  getTimeSessionByCode,
  getTimeSessions,
  deleteTimeSession,
} = require("../controllers/timeSessionController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// get all timesessions
router.get("/", requireAuth, getTimeSessions);

// get a single timesession by session code
router.get("/code/:sessionCode", getTimeSessionByCode);

// get a single timesession
router.get("/:id", getTimeSession);

// get a single timesession by session code
router.get("/code/:sessionCode", getTimeSessionByCode);

// post a timesession
router.post("/", requireAuth, createTimeSession);

// delete a timesession
router.delete("/:id", requireAuth, deleteTimeSession);

module.exports = router;
