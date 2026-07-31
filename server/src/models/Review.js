const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true
    },
    customerLocation: {
      type: String,
      trim: true,
      default: "Kerala"
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      select: false // Do not expose email on public endpoints
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5,
      index: true
    },
    comment: {
      type: String,
      required: [true, "Testimonial comment is required"],
      trim: true
    },
    serviceName: {
      type: String,
      default: "General Deep Cleaning",
      trim: true
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true
    },
    adminNote: String,
    approvedAt: Date,
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

reviewSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Review", reviewSchema);
