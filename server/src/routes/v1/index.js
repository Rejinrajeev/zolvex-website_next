const express = require("express");
const healthRoutes = require("./healthRoutes");
const authRoutes = require("./authRoutes");
const serviceRoutes = require("./serviceRoutes");
const priceRoutes = require("./priceRoutes");
const bookingRoutes = require("./bookingRoutes");
const adminRoutes = require("./adminRoutes");

const router = express.Router();

router.use("/", healthRoutes);
router.use("/auth", authRoutes);
router.use("/", serviceRoutes);
router.use("/", priceRoutes);
router.use("/", bookingRoutes);
router.use("/", adminRoutes);

module.exports = router;
