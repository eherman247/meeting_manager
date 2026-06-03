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

module.exports = app;
