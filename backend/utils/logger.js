const isProduction = process.env.NODE_ENV === "production";
const shouldDebug = process.env.DEBUG === "true" || !isProduction;
const shouldLogErrors = process.env.LOG_ERRORS !== "false";

const info = (...args) => {
  if (shouldDebug) {
    console.log(...args);
  }
};

const warn = (...args) => {
  if (shouldDebug) {
    console.warn(...args);
  }
};

const error = (...args) => {
  if (shouldLogErrors) {
    console.error(...args);
  }
};

module.exports = {
  info,
  warn,
  error,
};
