const logger = require("../utils/logger");

const getFrontendUrl = () => {
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

  if (process.env.NODE_ENV === "production" && !process.env.FRONTEND_URL) {
    logger.warn(
      "FRONTEND_URL not set in production; falling back to http://localhost:3000.",
    );
  }

  return frontendUrl;
};

module.exports = getFrontendUrl;
