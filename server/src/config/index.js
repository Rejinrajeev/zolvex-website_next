const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

module.exports = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT, 10) || 5000,
  mongoose: {
    url: process.env.MONGODB_URI || "mongodb://localhost:27017/zolvex_deepclean",
    options: {}
  },
  jwt: {
    secret: process.env.JWT_SECRET || "zolvex_default_secret_key_change_in_prod",
    accessExpiration: process.env.JWT_ACCESS_EXPIRATION || "15m",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "zolvex_default_refresh_secret",
    refreshExpiration: process.env.JWT_REFRESH_EXPIRATION || "7d"
  },
  cors: {
    origin: process.env.CORS_ORIGIN || "*"
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100
  },
  logging: {
    level: process.env.LOG_LEVEL || "info"
  }
};
