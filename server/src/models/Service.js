const mongoose = require("mongoose");

const serviceVariationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  displayOrder: { type: Number, default: 0 }
});

const serviceInclusionSchema = new mongoose.Schema({
  description: { type: String, required: true },
  displayOrder: { type: Number, default: 0 }
});

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Service name is required"],
      trim: true
    },
    slug: {
      type: String,
      required: [true, "Service slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    description: {
      type: String,
      trim: true
    },
    category: {
      type: String,
      default: "deep_cleaning",
      index: true
    },
    basePrice: {
      type: Number,
      default: 0
    },
    durationMinutes: {
      type: Number,
      default: 90
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true
    },
    displayOrder: {
      type: Number,
      default: 0,
      index: true
    },
    image: {
      type: String,
      default: "/images/work_img_1.jpeg"
    },
    imagePublicId: String,
    rating: {
      type: Number,
      default: 4.8
    },
    reviews: {
      type: Number,
      default: 120
    },
    seoTitle: String,
    seoDescription: String,
    variations: [serviceVariationSchema],
    inclusions: [serviceInclusionSchema]
  },
  {
    timestamps: true
  }
);

// Search index
serviceSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Service", serviceSchema);
