const bookingRepository = require("../repositories/bookingRepository");
const priceService = require("./priceService");
const auditLogRepository = require("../repositories/auditLogRepository");
const { ValidationError, NotFoundError } = require("../utils/appError");

class BookingService {
  async createBooking(bookingData, customerId = null, req = null) {
    const {
      serviceId,
      variationId,
      customerName,
      customerPhone,
      customerEmail,
      customerAddress,
      preferredDate,
      preferredTime,
      additionalInfo,
      addons
    } = bookingData;

    if (!serviceId || !variationId || !customerName || !customerPhone || !customerAddress || !preferredDate || !preferredTime) {
      throw new ValidationError("Missing required booking fields");
    }

    // Calculate verified price server-side
    const priceResult = await priceService.calculatePrice(serviceId, variationId, addons);

    const bookingNumber = `ZLV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking = await bookingRepository.create({
      bookingNumber,
      customerId,
      serviceId,
      variationId,
      status: "pending",
      customerName,
      customerPhone,
      customerEmail: customerEmail || "",
      customerAddress,
      additionalInfo: additionalInfo || "",
      preferredDate,
      preferredTime,
      basePrice: priceResult.basePrice,
      addonsTotal: priceResult.addonsTotal,
      totalPrice: priceResult.totalPrice,
      addonsBreakdown: priceResult.breakdown
    });

    // Log audit event
    await auditLogRepository.log("CREATE_BOOKING", "Booking", { bookingNumber, totalPrice: priceResult.totalPrice }, customerId, req);

    return newBooking;
  }

  async searchBookings(query) {
    if (!query) {
      throw new ValidationError("Search query is required");
    }
    return bookingRepository.findByBookingNumberOrPhone(query);
  }

  async getAllBookings(filter = {}, page = 1, limit = 20) {
    return bookingRepository.findAll(filter, page, limit);
  }

  async updateBookingStatus(id, status, req = null) {
    const validStatuses = ["pending", "confirmed", "assigned", "in_progress", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      throw new ValidationError(`Invalid status. Must be one of: ${validStatuses.join(", ")}`);
    }

    const updated = await bookingRepository.updateStatus(id, status);
    if (!updated) {
      throw new NotFoundError("Booking not found");
    }

    await auditLogRepository.log("UPDATE_BOOKING_STATUS", "Booking", { bookingId: id, status }, req ? req.user?.id : null, req);
    return updated;
  }
}

module.exports = new BookingService();
