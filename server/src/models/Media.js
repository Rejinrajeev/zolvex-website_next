const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    publicId: {
      type: String,
      required: [true, "Cloudinary publicId is required"],
      unique: true,
      index: true
    },
    secureUrl: {
      type: String,
      required: [true, "Cloudinary secureUrl is required"]
    },
    folder: {
      type: String,
      required: true,
      enum: ["zolvex/website", "zolvex/services", "zolvex/blog", "zolvex/users", "zolvex/uploads"],
      default: "zolvex/uploads",
      index: true
    },
    category: {
      type: String,
      enum: ["website", "services", "blog", "users", "uploads"],
      default: "uploads",
      index: true
    },
    resourceType: {
      type: String,
      default: "image"
    },
    format: {
      type: String,
      default: "jpeg"
    },
    originalFilename: {
      type: String,
      default: "image"
    },
    bytes: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    altText: {
      type: String,
      default: "",
      trim: true
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    isOrphaned: {
      type: Boolean,
      default: false,
      index: true
    }
  },
  {
    timestamps: true
  }
);

mediaSchema.methods.toPublicJSON = function () {
  const obj = this.toObject();
  return obj;
};

module.exports = mongoose.model("Media", mediaSchema);
