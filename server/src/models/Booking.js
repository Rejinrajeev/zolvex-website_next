const mongoose = require("mongoose");

const bookingAddonBreakdownSchema = new mongoose.Schema({
  addonId: { type: String, required: true },
  name: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  unitPrice: { type: Number, required: true },
  total: { type: Number, required: true }
});

const technicianSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  photo: { type: String, default: "/images/work_img_1.jpeg" },
  rating: { type: Number, default: 4.9 },
  assignedAt: { type: Date, default: Date.now }
});

const statusHistorySchema = new mongoose.Schema({
  status: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  note: { type: String, default: "" }
});

const bookingSchema = new mongoose.Schema(
  {
    bookingNumber: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true
    },
    serviceId: {
      type: String,
      required: [true, "serviceId is required"],
      index: true
    },
    variationId: {
      type: String,
      required: [true, "variationId is required"]
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "assigned", "in_progress", "completed", "cancelled"],
      default: "pending",
      index: true
    },
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true
    },
    customerPhone: {
      type: String,
      required: [true, "Customer phone is required"],
      trim: true,
      index: true
    },
    customerEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: ""
    },
    customerAddress: {
      type: String,
      required: [true, "Customer address is required"]
    },
    additionalInfo: {
      type: String,
      default: ""
    },
    preferredDate: {
      type: String,
      required: [true, "Preferred date is required"]
    },
    preferredTime: {
      type: String,
      required: [true, "Preferred time is required"]
    },
    basePrice: {
      type: Number,
      required: true
    },
    addonsTotal: {
      type: Number,
      default: 0
    },
    totalPrice: {
      type: Number,
      required: true
    },
    addonsBreakdown: [bookingAddonBreakdownSchema],
    assignedTechnician: technicianSchema,
    statusHistory: [statusHistorySchema],
    isDeleted: {
      type: Boolean,
      default: false,
      index: true
    },
    deletedAt: Date,
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

// Compound index for quick phone & status query
bookingSchema.index({ customerPhone: 1, status: 1 });

module.exports = mongoose.model("Booking", bookingSchema);
