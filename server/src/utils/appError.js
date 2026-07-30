class AppError extends Error {
  constructor(message, statusCode = 500, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message = "Validation Failed", errors = []) {
    super(message, 400, errors);
  }
}

class AuthenticationError extends AppError {
  constructor(message = "Authentication Failed") {
    super(message, 401);
  }
}

class AuthorizationError extends AppError {
  constructor(message = "Forbidden: Insufficient Permissions") {
    super(message, 403);
  }
}

class NotFoundError extends AppError {
  constructor(message = "Resource Not Found") {
    super(message, 404);
  }
}

class ConflictError extends AppError {
  constructor(message = "Resource Conflict") {
    super(message, 409);
  }
}

module.exports = {
  AppError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError
};
