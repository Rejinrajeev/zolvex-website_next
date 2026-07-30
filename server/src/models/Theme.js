const mongoose = require("mongoose");

const themeSchema = new mongoose.Schema(
  {
    primaryColor: { type: String, default: "#E6C15A" },
    primaryHover: { type: String, default: "#D4AF37" },
    secondaryColor: { type: String, default: "#F4D35E" },
    backgroundColor: { type: String, default: "#F7F6F2" },
    foregroundColor: { type: String, default: "#2B2B2B" },
    mutedColor: { type: String, default: "#6B6B6B" },
    borderRadius: { type: String, default: "0.75rem" },
    fontFamily: { type: String, default: "Inter" },
    isDarkMode: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Theme", themeSchema);
