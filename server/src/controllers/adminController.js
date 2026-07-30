const adminService = require("../services/adminService");
const ApiResponse = require("../utils/apiResponse");
const catchAsync = require("../utils/catchAsync");

const getAnalytics = catchAsync(async (req, res) => {
  const analytics = await adminService.getAnalytics();
  return ApiResponse.success(res, "Analytics metrics retrieved", analytics);
});

const getContent = catchAsync(async (req, res) => {
  const content = await adminService.getAllContent();
  return ApiResponse.success(res, "Website CMS content retrieved", content);
});

const updateContent = catchAsync(async (req, res) => {
  const updated = await adminService.updateContent(req.body);
  return ApiResponse.success(res, "CMS Content updated successfully", updated);
});

const getOffers = catchAsync(async (req, res) => {
  const offers = await adminService.getOffers();
  return ApiResponse.success(res, "Promotional offers retrieved", offers);
});

const createOffer = catchAsync(async (req, res) => {
  const newOffer = await adminService.createOffer(req.body);
  return ApiResponse.success(res, "Promotional offer created", newOffer, 201);
});

const getTheme = catchAsync(async (req, res) => {
  const theme = await adminService.getTheme();
  return ApiResponse.success(res, "Theme tokens retrieved", theme);
});

const updateTheme = catchAsync(async (req, res) => {
  const updated = await adminService.updateTheme(req.body);
  return ApiResponse.success(res, "Theme updated successfully", updated);
});

const getMessages = catchAsync(async (req, res) => {
  const messages = await adminService.getMessages();
  return ApiResponse.success(res, "Contact messages retrieved", messages);
});

const getReviews = catchAsync(async (req, res) => {
  const reviews = await adminService.getReviews();
  return ApiResponse.success(res, "Reviews retrieved", reviews);
});

module.exports = {
  getAnalytics,
  getContent,
  updateContent,
  getOffers,
  createOffer,
  getTheme,
  updateTheme,
  getMessages,
  getReviews
};
