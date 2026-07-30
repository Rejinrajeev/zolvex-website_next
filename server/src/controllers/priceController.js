const priceService = require("../services/priceService");
const ApiResponse = require("../utils/apiResponse");
const catchAsync = require("../utils/catchAsync");

const calculatePrice = catchAsync(async (req, res) => {
  const { serviceId, variationId, addons } = req.body;
  const result = await priceService.calculatePrice(serviceId, variationId, addons);
  return ApiResponse.success(res, "Price calculated successfully", result);
});

module.exports = {
  calculatePrice
};
