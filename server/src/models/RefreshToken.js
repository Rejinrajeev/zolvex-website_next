const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    token: {
      type: String,
      required: true,
      index: true
    },
    deviceId: {
      type: String,
      index: true
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 } // TTL index for automatic cleanup
    },
    ipAddress: String,
    userAgent: String,
    browser: String,
    os: String,
    lastActiveAt: {
      type: Date,
      default: Date.now
    },
    isRevoked: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);
