const mongoose = require("mongoose");

const addonVariationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  displayOrder: { type: Number, default: 0 }
});

const addonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Addon name is required"],
      trim: true
    },
    description: { type: String, trim: true },
    basePrice: { type: Number, required: true },
    isPerUnit: { type: Boolean, default: false },
    unitName: { type: String, default: "unit" },
    category: { type: String, default: "general", index: true },
    isActive: { type: Boolean, default: true, index: true },
    displayOrder: { type: Number, default: 0 },
    variations: [addonVariationSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Addon", addonSchema);
