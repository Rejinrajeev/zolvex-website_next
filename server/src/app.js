const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const config = require("./config");
const logger = require("./config/logger");
const v1Router = require("./routes/v1");
const { globalRateLimiter } = require("./middleware/rateLimiter");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");
const setupSwagger = require("./docs/swagger");

const app = express();

// Trust proxy for X-Forwarded-For headers from Next.js rewrites
app.set("trust proxy", 1);

// Security HTTP Headers
app.use(helmet());

// CORS Configuration
app.use(cors({
  origin: config.cors.origin,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Request Body Parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Data Sanitization against NoSQL Query Injection
app.use(mongoSanitize());

// HTTP Request Logging
if (config.env === "development") {
  app.use(morgan("dev"));
} else {
  app.use(
    morgan("combined", {
      stream: { write: (message) => logger.info(message.trim()) }
    })
  );
}

// Global Rate Limiting
app.use("/api", globalRateLimiter);

// API Documentation (Swagger)
setupSwagger(app);

// API v1 Routes
app.use("/api/v1", v1Router);
// Fallback compatibility route for legacy frontend calls
app.use("/api", v1Router);

// 404 Handler
app.use(notFound);

// Global Error Handler Middleware
app.use(errorHandler);

module.exports = app;
