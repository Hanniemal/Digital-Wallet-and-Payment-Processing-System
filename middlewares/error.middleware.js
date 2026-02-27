const logger = require("../utils/logger");

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  logger.error("Request failed", {
    method: req.method,
    path: req.originalUrl,
    statusCode,
    message,
  });

  if (res.headersSent) {
    return next(err);
  }

  return res.status(statusCode).json({
    message,
  });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};

