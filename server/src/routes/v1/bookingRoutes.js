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
const { authorize } = require("../../middleware/rbac");
const validate = require("../../middleware/validate");
const { createBookingSchema } = require("../../validators/bookingValidators");

const router = express.Router();

// Public / User Booking Endpoints
router.post("/bookings", optionalAuth, validate(createBookingSchema), createBooking);
router.get("/bookings/search/:query", searchBookings);
router.get("/bookings/track/:ref", getTrackingByRef);
router.put("/bookings/:id/cancel", cancelBooking);

// Protected Admin Booking Management Endpoints (RBAC Secured: admin, super_admin)
router.get("/admin/bookings", authenticate, authorize("admin", "super_admin"), getAllBookings);
router.patch("/admin/bookings/:id/status", authenticate, authorize("admin", "super_admin"), updateBookingStatus);
router.post("/admin/bookings/:id/assign", authenticate, authorize("admin", "super_admin"), assignTechnician);

module.exports = router;
