const mongoose = require("mongoose");

const securityEventSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    userEmail: {
      type: String,
      required: true
    },
    action: {
      type: String,
      required: true,
      index: true
    },
    resource: {
      type: String,
      default: "/api/v1/auth"
    },
    ipAddress: {
      type: String,
      default: "127.0.0.1"
    },
    userAgent: {
      type: String,
      default: "Unknown"
    },
    status: {
      type: String,
      enum: ["SUCCESS", "FAILED", "WARNING"],
      default: "SUCCESS"
    },
    details: {
      type: mongoose.Schema.Types.Mixed
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("SecurityEvent", securityEventSchema);
