const mongoose = require("mongoose");
const config = require("../config");
const logger = require("../config/logger");

let isConnected = false;

async function connectDB() {
  // In test environment, skip network MongoDB connection to prevent query delays
  if (process.env.NODE_ENV === "test" || process.env.JEST_WORKER_ID !== undefined) {
    isConnected = false;
    return null;
  }

  if (isConnected && mongoose.connection.readyState === 1) return mongoose.connection;

  try {
    mongoose.set("strictQuery", false);
    mongoose.set("bufferCommands", false);
    const conn = await mongoose.connect(config.mongoose.url, {
      serverSelectionTimeoutMS: 1000
    });
    isConnected = true;
    logger.info(`🍃 MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    logger.warn(`⚠️ MongoDB daemon not detected at ${config.mongoose.url}. Running backend with in-memory fallback mode.`);
    isConnected = false;
    return null;
  }
}

async function disconnectDB() {
  if (isConnected) {
    try {
      await mongoose.disconnect();
      isConnected = false;
      logger.info("🍃 MongoDB Disconnected Successfully");
    } catch (error) {
      logger.error("Error disconnecting MongoDB:", error);
    }
  }
}

function getIsConnected() {
  return isConnected && mongoose.connection.readyState === 1;
}

module.exports = { connectDB, disconnectDB, getIsConnected };
