const logger = require("../config/logger");
const config = require("../config");
const ApiResponse = require("../utils/apiResponse");

function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = err.errors || [];

  // Log error
  logger.error(`[${req.method}] ${req.originalUrl} - ${statusCode}: ${message}`, {
    stack: err.stack,
    ip: req.ip
  });

  // Mongoose CastError (invalid ObjectId)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid format for field: ${err.path}`;
  }

  // Mongoose ValidationError
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Database Validation Failed";
    errors = Object.values(err.errors).map(e => ({ field: e.path, message: e.message }));
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate field value entered: ${field}. Please use another value.`;
  }

  // JWT Errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token signature";
  }
  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token has expired";
  }

  // Do not expose stack traces in production
  if (config.env === "production" && statusCode === 500) {
    message = "Something went wrong on our servers. Please try again later.";
  }

  return ApiResponse.error(res, message, statusCode, errors);
}

module.exports = errorHandler;
