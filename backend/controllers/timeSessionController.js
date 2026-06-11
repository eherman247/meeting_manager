const TimeSession = require("../models/timeSessionModel");
const mongoose = require("mongoose");

// get all time sessions
const getTimeSessions = async (req, res) => {
  const user_id = req.user._id;
  const timeSessions = await TimeSession.find({ user_id }).sort({ _id: -1 });
  res.status(200).json(timeSessions);
};

// get a single time session
const getTimeSession = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such time session data" });
  }
  const timeSession = await TimeSession.findById(id);

  if (!timeSession) {
    return res.status(404).json({ error: "No such time session data" });
  }

  res.status(200).json(timeSession);
};

// get a single time session by session code
const getTimeSessionByCode = async (req, res) => {
  const { sessionCode } = req.params;
  const timeSession = await TimeSession.findOne({ sessionCode });

  if (!timeSession) {
    return res.status(404).json({ error: "No such time session data" });
  }

  // Do not expose password hash to clients
  const { title, sessionCode: code, createdAt } = timeSession;
  res.status(200).json({ title, sessionCode: code, createdAt });
};

// create a new time session
const createTimeSession = async (req, res) => {
  const { title, password, sessionCode } = req.body;
  if (!req.user || !req.user._id) {
    return res.status(401).json({ error: "Authentication required" });
  }
  const user_id = req.user._id;

  if (!title || typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ error: "Title is required" });
  }
  if (
    !sessionCode ||
    typeof sessionCode !== "string" ||
    sessionCode.trim().length !== 6
  ) {
    return res.status(400).json({ error: "Invalid session code" });
  }

  try {
    const timeSession = await TimeSession.create({
      title: title.trim(),
      password: password || null,
      sessionCode: sessionCode.trim().toLowerCase(),
      user_id,
    });
    const { title: t, sessionCode: code, createdAt } = timeSession;
    return res.status(200).json({ title: t, sessionCode: code, createdAt });
  } catch (error) {
    // Handle duplicate sessionCode (unique index) explicitly
    if (
      error &&
      (error.code === 11000 || error.code === 11001) &&
      error.keyPattern &&
      error.keyPattern.sessionCode
    ) {
      return res.status(409).json({ error: "Session code already exists" });
    }
    return res.status(400).json({ error: "Unable to create time session" });
  }
};

// join a time session by code + optional password
const joinTimeSession = async (req, res) => {
  const { sessionCode, password } = req.body;
  if (!sessionCode || typeof sessionCode !== "string") {
    return res.status(400).json({ error: "sessionCode is required" });
  }
  const code = sessionCode.trim().toLowerCase();
  const timeSession = await TimeSession.findOne({ sessionCode: code });
  if (!timeSession) {
    return res.status(404).json({ error: "No such time session data" });
  }
  const ok = await timeSession.comparePassword(password || "");
  if (!ok) {
    return res.status(401).json({ error: "Incorrect password" });
  }
  const { title, sessionCode: session, createdAt } = timeSession;
  return res.status(200).json({ title, sessionCode: session, createdAt });
};

// delete a time session
const deleteTimeSession = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such time session data" });
  }
  const timeSession = await TimeSession.findOneAndDelete({ _id: id });

  if (!timeSession) {
    return res.status(400).json({ error: "No such time session data" });
  }
  res.status(200).json(timeSession);
};

module.exports = {
  createTimeSession,
  getTimeSession,
  getTimeSessionByCode,
  joinTimeSession,
  getTimeSessions,
  deleteTimeSession,
};
