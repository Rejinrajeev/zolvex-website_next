const app = require("./app");
const config = require("./config");
const logger = require("./config/logger");
const { connectDB, disconnectDB } = require("./database/connect");

let server;

async function startServer() {
  // Connect to MongoDB
  await connectDB();

  server = app.listen(config.port, "0.0.0.0", () => {
    logger.info(`🚀 Zolvex Enterprise Backend running in [${config.env}] on http://0.0.0.0:${config.port}`);
    logger.info(`📡 Health Check: http://localhost:${config.port}/api/v1/health`);
    logger.info(`📚 Swagger Docs: http://localhost:${config.port}/api/v1/docs`);
  });
}

// Graceful Shutdown Handler
async function gracefulShutdown(signal) {
  logger.info(`Received ${signal}. Shutting down gracefully...`);
  if (server) {
    server.close(async () => {
      logger.info("HTTP Server closed.");
      await disconnectDB();
      process.exit(0);
    });
  } else {
    await disconnectDB();
    process.exit(0);
  }
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

process.on("unhandledRejection", (err) => {
  logger.error("UNHANDLED REJECTION! Shutting down...", err);
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

startServer();
