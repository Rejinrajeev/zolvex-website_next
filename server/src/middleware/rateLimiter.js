const rateLimit = require("express-rate-limit");
const config = require("../config");
const ApiResponse = require("../utils/apiResponse");

const isTestEnv = () => process.env.NODE_ENV === "test" || process.env.JEST_WORKER_ID !== undefined;

const realGlobalLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return ApiResponse.error(
      res,
      "Too many requests from this IP, please try again after 15 minutes.",
      429
    );
  }
});

const realAuthLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 10, // 10 login/register attempts per IP per 15 min
  message: "Too many authentication attempts, please try again after 15 minutes."
});

const globalRateLimiter = (req, res, next) => {
  if (isTestEnv()) return next();
  return realGlobalLimiter(req, res, next);
};

const authRateLimiter = (req, res, next) => {
  if (isTestEnv()) return next();
  return realAuthLimiter(req, res, next);
};

module.exports = {
  globalRateLimiter,
  authRateLimiter
};
