const mongoose = require("mongoose");
const ApiResponse = require("../utils/apiResponse");

const getHealth = (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatusMap = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting"
  };

  const memoryUsage = process.memoryUsage();

  return ApiResponse.success(res, "Server is healthy", {
    status: "up",
    service: "Zolvex Express + MongoDB Backend API",
    version: "1.0.0",
    database: {
      status: dbStatusMap[dbState] || "unknown",
      readyState: dbState
    },
    system: {
      uptimeSeconds: Math.floor(process.uptime()),
      memoryUsageMB: {
        rss: Math.round(memoryUsage.rss / 1024 / 1024),
        heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024),
        heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024)
      }
    },
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  getHealth
};
