const Media = require("../models/Media");
const cloudinaryService = require("../services/cloudinaryService");
const authService = require("../services/authService");
const ApiResponse = require("../utils/apiResponse");
const catchAsync = require("../utils/catchAsync");
const { ValidationError, NotFoundError } = require("../utils/appError");
const { getIsConnected } = require("../database/connect");

// Folder mapping by category
const CATEGORY_FOLDER_MAP = {
  website: "zolvex/website",
  services: "zolvex/services",
  blog: "zolvex/blog",
  users: "zolvex/users",
  uploads: "zolvex/uploads"
};

const uploadMedia = catchAsync(async (req, res) => {
  if (!req.file) {
    throw new ValidationError("Please select an image file to upload");
  }

  const category = req.body.category || "uploads";
  const folder = CATEGORY_FOLDER_MAP[category] || "zolvex/uploads";
  const altText = req.body.altText || "";

  // Upload file buffer to Cloudinary
  const result = await cloudinaryService.uploadImage(req.file.buffer, {
    folder,
    originalFilename: req.file.originalname
  });

  let mediaDoc = {
    ...result,
    category,
    altText,
    uploadedBy: req.user ? req.user._id : null
  };

  if (getIsConnected()) {
    try {
      mediaDoc = await Media.create(mediaDoc);
    } catch (err) {
      console.warn("Failed to persist media document to DB:", err.message);
    }
  }

  if (req.user) {
    await authService.logSecurityEvent(
      req.user._id,
      req.user.email,
      "MEDIA_UPLOADED",
      req,
      "SUCCESS",
      { publicId: result.publicId }
    );
  }

  return ApiResponse.success(res, "Image uploaded successfully to Cloudinary", mediaDoc, 201);
});

const getMediaList = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const skip = (page - 1) * limit;
  const category = req.query.category;
  const search = req.query.search;

  const query = {};
  if (category && category !== "all") {
    query.category = category;
  }
  if (search) {
    query.$or = [
      { originalFilename: { $regex: search, $options: "i" } },
      { altText: { $regex: search, $options: "i" } },
      { publicId: { $regex: search, $options: "i" } }
    ];
  }

  let items = [];
  let total = 0;

  if (getIsConnected()) {
    items = await Media.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
    total = await Media.countDocuments(query);
  } else {
    // Fallback seed images catalog
    items = [
      {
        _id: "m1",
        publicId: "zolvex/website/hero_img",
        secureUrl: "/images/hero_img.jpeg",
        folder: "zolvex/website",
        category: "website",
        format: "jpeg",
        width: 1920,
        height: 1080,
        bytes: 70626,
        originalFilename: "hero_img.jpeg",
        altText: "Hero Banner",
        createdAt: new Date().toISOString()
      },
      {
        _id: "m2",
        publicId: "zolvex/services/work_img_1",
        secureUrl: "/images/work_img_1.jpeg",
        folder: "zolvex/services",
        category: "services",
        format: "jpeg",
        width: 1200,
        height: 800,
        bytes: 103839,
        originalFilename: "work_img_1.jpeg",
        altText: "Deep Cleaning Service",
        createdAt: new Date().toISOString()
      }
    ];
    total = items.length;
  }

  return ApiResponse.success(res, "Media library retrieved", {
    items,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit) || 1
    }
  });
});

const getMediaById = catchAsync(async (req, res) => {
  let media = null;
  if (getIsConnected()) {
    media = await Media.findById(req.params.id);
  }
  if (!media) {
    throw new NotFoundError("Media asset not found");
  }
  return ApiResponse.success(res, "Media details retrieved", media);
});

const updateMedia = catchAsync(async (req, res) => {
  const { altText, category } = req.body;
  let media = null;

  if (getIsConnected()) {
    media = await Media.findById(req.params.id);
    if (!media) {
      throw new NotFoundError("Media asset not found");
    }
    if (altText !== undefined) media.altText = altText;
    if (category && CATEGORY_FOLDER_MAP[category]) media.category = category;
    await media.save();
  }

  return ApiResponse.success(res, "Media metadata updated", media);
});

const replaceMedia = catchAsync(async (req, res) => {
  if (!req.file) {
    throw new ValidationError("Please select a new image file to replace");
  }

  let media = null;
  if (getIsConnected()) {
    media = await Media.findById(req.params.id);
  }

  const oldPublicId = media ? media.publicId : null;
  const category = media ? media.category : (req.body.category || "uploads");
  const folder = CATEGORY_FOLDER_MAP[category] || "zolvex/uploads";

  // Safe Replace: Upload new first -> Delete old -> Update DB
  const newMediaData = await cloudinaryService.replaceImage(oldPublicId, req.file.buffer, {
    folder,
    originalFilename: req.file.originalname
  });

  if (media && getIsConnected()) {
    media.publicId = newMediaData.publicId;
    media.secureUrl = newMediaData.secureUrl;
    media.format = newMediaData.format;
    media.bytes = newMediaData.bytes;
    media.width = newMediaData.width;
    media.height = newMediaData.height;
    media.originalFilename = newMediaData.originalFilename;
    await media.save();
  }

  if (req.user) {
    await authService.logSecurityEvent(
      req.user._id,
      req.user.email,
      "MEDIA_REPLACED",
      req,
      "SUCCESS",
      { oldPublicId, newPublicId: newMediaData.publicId }
    );
  }

  return ApiResponse.success(res, "Image replaced successfully", media || newMediaData);
});

const deleteMedia = catchAsync(async (req, res) => {
  let media = null;
  if (getIsConnected()) {
    media = await Media.findById(req.params.id);
  }

  const targetPublicId = media ? media.publicId : req.params.id;

  // Delete asset from Cloudinary CDN
  await cloudinaryService.deleteImage(targetPublicId);

  // Delete metadata document from MongoDB
  if (media && getIsConnected()) {
    await Media.deleteOne({ _id: media._id });
  }

  if (req.user) {
    await authService.logSecurityEvent(
      req.user._id,
      req.user.email,
      "MEDIA_DELETED",
      req,
      "SUCCESS",
      { publicId: targetPublicId }
    );
  }

  return ApiResponse.success(res, "Media asset deleted successfully");
});

module.exports = {
  uploadMedia,
  getMediaList,
  getMediaById,
  updateMedia,
  replaceMedia,
  deleteMedia
};
