const bookingService = require("../services/bookingService");
const bookingRepository = require("../repositories/bookingRepository");
const ApiResponse = require("../utils/apiResponse");
const catchAsync = require("../utils/catchAsync");

const createBooking = catchAsync(async (req, res) => {
  const customerId = req.user ? req.user._id : null;
  const booking = await bookingService.createBooking(req.body, customerId, req);
  return ApiResponse.success(res, "Booking created successfully", booking, 201);
});

const searchBookings = catchAsync(async (req, res) => {
  const { query } = req.params;
  const bookings = await bookingService.searchBookings(query);
  return ApiResponse.success(res, "Booking search results", bookings);
});

const getTrackingByRef = catchAsync(async (req, res) => {
  const { ref } = req.params;
  const bookings = await bookingRepository.findByBookingNumberOrPhone(ref);
  if (!bookings || bookings.length === 0) {
    return ApiResponse.error(res, "Booking reference not found", 404);
  }
  return ApiResponse.success(res, "Booking tracking details", bookings[0]);
});

const assignTechnician = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updated = await bookingRepository.assignTechnician(id, req.body);
  return ApiResponse.success(res, "Technician assigned successfully", updated);
});

const cancelBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updated = await bookingRepository.updateStatus(id, "cancelled", "Cancelled by customer");
  return ApiResponse.success(res, "Booking cancelled successfully", updated);
});

const getAllBookings = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const status = req.query.status;

  const filter = status ? { status } : {};
  const result = await bookingService.getAllBookings(filter, page, limit);

  return ApiResponse.success(res, "Bookings list retrieved", result.bookings, 200, {
    page: result.page,
    limit: result.limit,
    total: result.total,
    totalPages: result.totalPages
  });
});

const updateBookingStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status, note } = req.body;

  const updated = await bookingRepository.updateStatus(id, status, note);
  return ApiResponse.success(res, `Booking status updated to ${status}`, updated);
});

module.exports = {
  createBooking,
  searchBookings,
  getTrackingByRef,
  assignTechnician,
  cancelBooking,
  getAllBookings,
  updateBookingStatus
};
