const express = require("express");
const healthRoutes = require("./healthRoutes");
const authRoutes = require("./authRoutes");
const serviceRoutes = require("./serviceRoutes");
const priceRoutes = require("./priceRoutes");
const bookingRoutes = require("./bookingRoutes");
const adminRoutes = require("./adminRoutes");
const mediaRoutes = require("./mediaRoutes");
const contactRoutes = require("./contactRoutes");
const testimonialRoutes = require("./testimonialRoutes");

const router = express.Router();

router.use("/", healthRoutes);
router.use("/auth", authRoutes);
router.use("/media", mediaRoutes);
router.use("/contact", contactRoutes);
router.use("/testimonials", testimonialRoutes);
router.use("/", contactRoutes); // Mount /admin/contact-messages
router.use("/", testimonialRoutes); // Mount /admin/reviews
router.use("/", serviceRoutes);
router.use("/", priceRoutes);
router.use("/", bookingRoutes);
router.use("/", adminRoutes);

module.exports = router;
