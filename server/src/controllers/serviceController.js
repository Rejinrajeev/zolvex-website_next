const serviceService = require("../services/serviceService");
const serviceRepository = require("../repositories/serviceRepository");
const ApiResponse = require("../utils/apiResponse");
const catchAsync = require("../utils/catchAsync");

const getServices = catchAsync(async (req, res) => {
  const services = await serviceService.getAllServices();
  return ApiResponse.success(res, "Services catalog retrieved", services);
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
  return ApiResponse.success(res, "Admin services retrieved", services);
});

const createService = catchAsync(async (req, res) => {
  const newService = await serviceRepository.create(req.body);
  return ApiResponse.success(res, "Service created successfully", newService, 201);
});

const updateService = catchAsync(async (req, res) => {
  const updated = await serviceRepository.update(req.params.id, req.body);
  return ApiResponse.success(res, "Service updated successfully", updated);
});

const deleteService = catchAsync(async (req, res) => {
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
  deleteService
};
