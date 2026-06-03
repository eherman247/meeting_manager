require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");
const logger = require("./utils/logger");

const requiredEnv = ["MONGO_URI", "PORT", "SECRET"];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);
if (missingEnv.length) {
  logger.error(
    `Missing required environment variables: ${missingEnv.join(", ")}`,
  );
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      logger.info("connected to db and listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    logger.error("Database connection failed:", error);
  });
