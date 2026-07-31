const mongoose = require("mongoose");

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      lowercase: true,
      trim: true,
      index: true
    },
    phone: {
      type: String,
      trim: true
    },
    subject: {
      type: String,
      trim: true,
      default: "General Inquiry"
    },
    service: {
      type: String,
      trim: true,
      default: "general"
    },
    message: {
      type: String,
      required: [true, "Message content is required"],
      trim: true
    },
    status: {
      type: String,
      enum: ["unread", "read", "replied", "archived", "spam"],
      default: "unread",
      index: true
    },
    priority: {
      type: String,
      enum: ["low", "normal", "high"],
      default: "normal",
      index: true
    },
    ipAddress: String,
    adminReply: String,
    repliedAt: Date,
    repliedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

contactMessageSchema.index({ createdAt: -1 });

module.exports = mongoose.model("ContactMessage", contactMessageSchema);
