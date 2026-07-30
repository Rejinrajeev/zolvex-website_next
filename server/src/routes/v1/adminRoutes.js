const express = require("express");
const {
  getAnalytics,
  getContent,
  updateContent,
  getOffers,
  createOffer,
  getTheme,
  updateTheme,
  getMessages,
  getReviews
} = require("../../controllers/adminController");

const router = express.Router();

// Public / Client read endpoints
router.get("/content", getContent);
router.get("/theme", getTheme);

// Admin dashboard endpoints
router.get("/admin/analytics", getAnalytics);
router.put("/admin/content", updateContent);

router.get("/admin/offers", getOffers);
router.post("/admin/offers", createOffer);

router.put("/admin/theme", updateTheme);

router.get("/admin/messages", getMessages);
router.get("/admin/reviews", getReviews);

module.exports = router;
