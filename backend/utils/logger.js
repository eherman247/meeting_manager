const isProduction = process.env.NODE_ENV === "production";
const shouldDebug = process.env.DEBUG === "true" || !isProduction;

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
  console.error(...args);
};

module.exports = {
  info,
  warn,
  error,
};
