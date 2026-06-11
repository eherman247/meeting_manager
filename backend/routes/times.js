const express = require("express");
const {
  createTimeOff,
  getTimeOffs,
  getTimeOff,
  deleteTimeOff,
  updateTimeOff,
} = require("../controllers/timeOffController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// get all times (public)
router.get("/", getTimeOffs);

// get a single time (public)
router.get("/:id", getTimeOff);

// post a time (requires auth)
router.post("/", requireAuth, createTimeOff);

// delete a time (requires auth, ownership enforced in controller)
router.delete("/:id", requireAuth, deleteTimeOff);

// update a time (requires auth, ownership enforced in controller)
router.patch("/:id", requireAuth, updateTimeOff);

module.exports = router;
