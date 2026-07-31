const express = require("express");
const {
  submitReview,
  getPublicReviews,
  getAdminReviews,
  approveReview,
  rejectReview,
  updateReview,
  deleteReview
} = require("../../controllers/reviewController");
const { authenticate, authorize } = require("../../middleware/auth");
const { authRateLimiter } = require("../../middleware/rateLimiter");

const router = express.Router();

// Public endpoints
router.post("/", authRateLimiter, submitReview);
router.get("/", getPublicReviews);

// Protected Admin Testimonial Moderation endpoints
router.get("/admin/reviews", authenticate, authorize("admin", "super_admin"), getAdminReviews);
router.patch("/admin/reviews/:id/approve", authenticate, authorize("admin", "super_admin"), approveReview);
router.patch("/admin/reviews/:id/reject", authenticate, authorize("admin", "super_admin"), rejectReview);
router.put("/admin/reviews/:id", authenticate, authorize("admin", "super_admin"), updateReview);
router.delete("/admin/reviews/:id", authenticate, authorize("admin", "super_admin"), deleteReview);

module.exports = router;
