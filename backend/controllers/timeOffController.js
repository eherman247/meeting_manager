const TimeOff = require("../models/timeOffModel");
const mongoose = require("mongoose");

const ALLOWED_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// get all times
const getTimeOffs = async (req, res) => {
  const { sessionCode } = req.query;

  if (!sessionCode) {
    return res.status(400).json({ error: "sessionCode is required" });
  }

  const timeOffs = await TimeOff.find({ sessionCode }).sort({ day: -1 });

  res.status(200).json(timeOffs);
};

// get a single time
const getTimeOff = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such time data" });
  }

  const timeOff = await TimeOff.findById(id);

  if (!timeOff) {
    return res.status(404).json({ error: "No such time data" });
  }

  res.status(200).json(timeOff);
};

// create a new time
const createTimeOff = async (req, res) => {
  const { name, day, timeStart, timeEnd, sessionCode } = req.body;
  if (!req.user || !req.user._id) {
    return res.status(401).json({ error: "Authentication required" });
  }
  const user_id = req.user._id.toString();

  // basic validation
  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "Name is required" });
  }
  if (!day || !ALLOWED_DAYS.includes(day)) {
    return res.status(400).json({ error: "Invalid day" });
  }
  const start = Number(timeStart);
  const end = Number(timeEnd);
  if (!Number.isFinite(start) || !Number.isFinite(end)) {
    return res.status(400).json({ error: "Invalid start or end time" });
  }
  if (start < 0 || end <= 0 || start >= end || end > 24 * 60) {
    return res.status(400).json({ error: "Invalid time range" });
  }
  if (
    !sessionCode ||
    typeof sessionCode !== "string" ||
    sessionCode.trim().length !== 6
  ) {
    return res.status(400).json({ error: "Invalid session code" });
  }

  try {
    const timeOff = await TimeOff.create({
      name: name.trim(),
      day,
      timeStart: start,
      timeEnd: end,
      user_id,
      sessionCode: sessionCode.trim(),
    });
    return res.status(200).json(timeOff);
  } catch (error) {
    return res.status(400).json({ error: "Unable to create time off" });
  }
};

// delete a time
const deleteTimeOff = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such time data" });
  }

  const timeOff = await TimeOff.findById(id);
  if (!timeOff) {
    return res.status(404).json({ error: "No such time data" });
  }

  // enforce ownership if present
  if (
    timeOff.user_id &&
    (!req.user || timeOff.user_id.toString() !== req.user._id.toString())
  ) {
    return res.status(403).json({ error: "Forbidden" });
  }

  await TimeOff.findByIdAndDelete(id);
  return res.status(200).json(timeOff);
};

// update a time
const updateTimeOff = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such time data" });
  }

  const existing = await TimeOff.findById(id);
  if (!existing) {
    return res.status(404).json({ error: "No such time data" });
  }

  // enforce ownership if present
  if (
    existing.user_id &&
    (!req.user || existing.user_id.toString() !== req.user._id.toString())
  ) {
    return res.status(403).json({ error: "Forbidden" });
  }

  // validate updates
  const updates = {};
  if (req.body.name !== undefined) {
    if (
      !req.body.name ||
      typeof req.body.name !== "string" ||
      !req.body.name.trim()
    ) {
      return res.status(400).json({ error: "Invalid name" });
    }
    updates.name = req.body.name.trim();
  }
  if (req.body.day !== undefined) {
    if (!ALLOWED_DAYS.includes(req.body.day)) {
      return res.status(400).json({ error: "Invalid day" });
    }
    updates.day = req.body.day;
  }
  if (req.body.timeStart !== undefined) {
    const s = Number(req.body.timeStart);
    if (!Number.isFinite(s))
      return res.status(400).json({ error: "Invalid timeStart" });
    updates.timeStart = s;
  }
  if (req.body.timeEnd !== undefined) {
    const e = Number(req.body.timeEnd);
    if (!Number.isFinite(e))
      return res.status(400).json({ error: "Invalid timeEnd" });
    updates.timeEnd = e;
  }
  if (updates.timeStart !== undefined && updates.timeEnd !== undefined) {
    if (updates.timeStart >= updates.timeEnd)
      return res.status(400).json({ error: "Invalid time range" });
  }
  if (req.body.sessionCode !== undefined) {
    if (
      typeof req.body.sessionCode !== "string" ||
      req.body.sessionCode.trim().length !== 6
    ) {
      return res.status(400).json({ error: "Invalid session code" });
    }
    updates.sessionCode = req.body.sessionCode.trim();
  }

  const timeOff = await TimeOff.findOneAndUpdate({ _id: id }, updates, {
    new: true,
  });

  if (!timeOff) {
    return res.status(400).json({ error: "Failed to update time data" });
  }

  return res.status(200).json(timeOff);
};

module.exports = {
  createTimeOff,
  getTimeOffs,
  getTimeOff,
  deleteTimeOff,
  updateTimeOff,
};
