const express = require("express");
const {
  createTimeOff,
  getTimeOffs,
  getTimeOff,
  deleteTimeOff,
  updateTimeOff,
} = require("../controllers/timeOffController");

const router = express.Router();

// get all times (public)
router.get("/", getTimeOffs);

// get a single time (public)
router.get("/:id", getTimeOff);

// post a time
router.post("/", createTimeOff);

// delete a time
router.delete("/:id", deleteTimeOff);

// update a time
router.patch("/:id", updateTimeOff);

module.exports = router;
