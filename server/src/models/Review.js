const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    customerLocation: String,
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    serviceName: String,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true
    },
    isFeatured: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Review", reviewSchema);
