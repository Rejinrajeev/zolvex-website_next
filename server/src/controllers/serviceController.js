const serviceService = require("../services/serviceService");
const serviceRepository = require("../repositories/serviceRepository");
const cloudinaryService = require("../services/cloudinaryService");
const Service = require("../models/Service");
const Media = require("../models/Media");
const ApiResponse = require("../utils/apiResponse");
const catchAsync = require("../utils/catchAsync");
const { ValidationError, NotFoundError } = require("../utils/appError");
const { getIsConnected } = require("../database/connect");

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

const getServices = catchAsync(async (req, res) => {
  const services = await serviceService.getAllServices();
  return ApiResponse.success(res, "Active services catalog retrieved", services);
});

const getServiceById = catchAsync(async (req, res) => {
  const service = await serviceService.getServiceBySlugOrId(req.params.id);
  return ApiResponse.success(res, "Service details retrieved", service);
});

const getAddons = catchAsync(async (req, res) => {
  const addons = await serviceService.getAllAddons();
  return ApiResponse.success(res, "Addons catalog retrieved", addons);
});

const getAdminServices = catchAsync(async (req, res) => {
  const services = await serviceRepository.findAllAdmin();
  return ApiResponse.success(res, "Admin services catalog retrieved", services);
});

const createService = catchAsync(async (req, res) => {
  const { name, description, category, basePrice, durationMinutes, isAvailable, isActive, displayOrder, seoTitle, seoDescription } = req.body;

  if (!name || !name.trim()) {
    throw new ValidationError("Service name is required");
  }

  const slug = req.body.slug ? slugify(req.body.slug) : slugify(name);

  // Handle Cloudinary Image Upload
  let image = req.body.image || "/images/work_img_1.jpeg";
  let imagePublicId = req.body.imagePublicId || null;

  if (req.file) {
    const uploadResult = await cloudinaryService.uploadImage(req.file.buffer, {
      folder: "zolvex/services",
      originalFilename: req.file.originalname
    });
    image = uploadResult.secureUrl;
    imagePublicId = uploadResult.publicId;

    if (getIsConnected()) {
      try {
        await Media.create({
          ...uploadResult,
          category: "services",
          altText: name.trim(),
          uploadedBy: req.user ? req.user._id : null
        });
      } catch (e) {
        console.warn("Failed to create Media doc for service upload:", e.message);
      }
    }
  }

  let variations = req.body.variations ? (typeof req.body.variations === "string" ? JSON.parse(req.body.variations) : req.body.variations) : [];
  let inclusions = req.body.inclusions ? (typeof req.body.inclusions === "string" ? JSON.parse(req.body.inclusions) : req.body.inclusions) : [];

  const serviceData = {
    name: name.trim(),
    slug,
    description: description ? description.trim() : "",
    category: category || "deep_cleaning",
    basePrice: basePrice ? Number(basePrice) : 2999,
    durationMinutes: durationMinutes ? Number(durationMinutes) : 90,
    isAvailable: isAvailable !== undefined ? Boolean(isAvailable) : true,
    isActive: isActive !== undefined ? Boolean(isActive) : true,
    displayOrder: displayOrder ? Number(displayOrder) : 0,
    image,
    imagePublicId,
    seoTitle: seoTitle || name,
    seoDescription: seoDescription || description,
    variations,
    inclusions
  };

  const newService = await serviceRepository.create(serviceData);
  return ApiResponse.success(res, "Service created successfully with Cloudinary image integration", newService, 201);
});

const updateService = catchAsync(async (req, res) => {
  let existing = null;
  if (getIsConnected()) {
    existing = await Service.findById(req.params.id);
  }

  const serviceData = { ...req.body };

  if (serviceData.name && (!serviceData.slug || serviceData.name !== existing?.name)) {
    serviceData.slug = slugify(serviceData.slug || serviceData.name);
  }

  if (serviceData.variations && typeof serviceData.variations === "string") {
    serviceData.variations = JSON.parse(serviceData.variations);
  }
  if (serviceData.inclusions && typeof serviceData.inclusions === "string") {
    serviceData.inclusions = JSON.parse(serviceData.inclusions);
  }

  // Handle Safe Cloudinary Image Replacement
  if (req.file) {
    const oldPublicId = existing ? existing.imagePublicId : null;
    const replacementResult = await cloudinaryService.replaceImage(oldPublicId, req.file.buffer, {
      folder: "zolvex/services",
      originalFilename: req.file.originalname
    });
    serviceData.image = replacementResult.secureUrl;
    serviceData.imagePublicId = replacementResult.publicId;

    if (getIsConnected()) {
      try {
        await Media.create({
          ...replacementResult,
          category: "services",
          altText: serviceData.name || "Service Image",
          uploadedBy: req.user ? req.user._id : null
        });
      } catch (e) {}
    }
  }

  const updated = await serviceRepository.update(req.params.id, serviceData);
  return ApiResponse.success(res, "Service updated successfully", updated);
});

const reorderServices = catchAsync(async (req, res) => {
  const { orders } = req.body; // Array of { id, displayOrder }
  if (!Array.isArray(orders)) {
    throw new ValidationError("Orders parameter must be an array of { id, displayOrder }");
  }

  if (getIsConnected()) {
    for (const item of orders) {
      await Service.updateOne({ _id: item.id }, { displayOrder: item.displayOrder });
    }
  }

  return ApiResponse.success(res, "Service display orders updated");
});

const deleteService = catchAsync(async (req, res) => {
  let existing = null;
  if (getIsConnected()) {
    existing = await Service.findById(req.params.id);
    if (existing && existing.imagePublicId) {
      try {
        await cloudinaryService.deleteImage(existing.imagePublicId);
        await Media.deleteOne({ publicId: existing.imagePublicId });
      } catch (e) {
        console.warn("Failed to delete Cloudinary image on service removal:", e.message);
      }
    }
  }

  await serviceRepository.delete(req.params.id);
  return ApiResponse.success(res, "Service deleted successfully");
});

module.exports = {
  getServices,
  getServiceById,
  getAddons,
  getAdminServices,
  createService,
  updateService,
  reorderServices,
  deleteService
};
