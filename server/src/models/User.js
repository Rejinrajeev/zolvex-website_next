const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      index: true
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false
    },
    role: {
      type: String,
      enum: ["user", "technician", "admin", "super_admin"],
      default: "user",
      index: true
    },
    permissions: [
      {
        type: String // e.g., 'manage_cms', 'manage_bookings', 'manage_offers', 'manage_users', 'manage_theme'
      }
    ],
    mfaEnabled: {
      type: Boolean,
      default: false
    },
    mfaSecret: {
      type: String,
      select: false
    },
    mfaBackupCodes: [
      {
        type: String,
        select: false
      }
    ],
    failedLoginAttempts: {
      type: Number,
      default: 0
    },
    lockUntil: Date,
    lastLoginIp: String,
    lastLoginUserAgent: String,
    lastLoginAt: Date,
    isVerified: {
      type: Boolean,
      default: true
    },
    loginHistory: [
      {
        ip: String,
        userAgent: String,
        timestamp: { type: Date, default: Date.now }
      }
    ],
    isDeleted: {
      type: Boolean,
      default: false,
      index: true
    },
    deletedAt: Date
  },
  {
    timestamps: true
  }
);

userSchema.methods.toPublicJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.mfaSecret;
  delete obj.mfaBackupCodes;
  return obj;
};

module.exports = mongoose.model("User", userSchema);
