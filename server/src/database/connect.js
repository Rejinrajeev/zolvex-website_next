const mongoose = require("mongoose");
const config = require("../config");
const logger = require("../config/logger");

let isConnected = false;

async function connectDB() {
  if (isConnected) return mongoose.connection;

  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(config.mongoose.url, {
      serverSelectionTimeoutMS: 2000 // 2 seconds fast timeout for connection check
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
  return isConnected;
}

module.exports = { connectDB, disconnectDB, getIsConnected };
