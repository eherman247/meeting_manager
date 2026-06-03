const express = require("express");
const cors = require("cors");
const timeRoutes = require("./routes/times");
const userRoutes = require("./routes/users");
const timeSessionRoutes = require("./routes/timeSession");
const logger = require("./utils/logger");

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
  logger.info(req.path, req.method);
  next();
});

app.use("/times", timeRoutes);
app.use("/api/auth/users", userRoutes);
app.use("/timeSessions", timeSessionRoutes);
app.use("/timeSession", timeSessionRoutes);

// Return JSON for unknown routes instead of the default HTML 404
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

module.exports = app;
