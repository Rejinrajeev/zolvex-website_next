const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    section: {
      type: String,
      required: true,
      index: true // e.g. 'hero', 'about', 'services', 'footer', 'faq'
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Content", contentSchema);
