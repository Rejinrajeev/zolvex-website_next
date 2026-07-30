const express = require("express");
const {
  createBooking,
  searchBookings,
  getTrackingByRef,
  assignTechnician,
  cancelBooking,
  getAllBookings,
  updateBookingStatus
} = require("../../controllers/bookingController");
const { authenticate, optionalAuth } = require("../../middleware/auth");
const validate = require("../../middleware/validate");
const { createBookingSchema } = require("../../validators/bookingValidators");

const router = express.Router();

router.post("/bookings", optionalAuth, validate(createBookingSchema), createBooking);
router.get("/bookings/search/:query", searchBookings);
router.get("/bookings/track/:ref", getTrackingByRef);
router.put("/bookings/:id/cancel", cancelBooking);

// Admin Routes
router.get("/admin/bookings", getAllBookings);
router.patch("/admin/bookings/:id/status", updateBookingStatus);
router.post("/admin/bookings/:id/assign", assignTechnician);

module.exports = router;
