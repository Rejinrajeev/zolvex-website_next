const rateLimit = require("express-rate-limit");
const config = require("../config");
const ApiResponse = require("../utils/apiResponse");

const globalRateLimiter = rateLimit({
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

const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 10, // 10 login/register attempts per IP per 15 min
  message: "Too many authentication attempts, please try again after 15 minutes."
});

module.exports = {
  globalRateLimiter,
  authRateLimiter
};
