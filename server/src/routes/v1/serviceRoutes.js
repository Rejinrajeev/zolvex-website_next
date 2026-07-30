const express = require("express");
const {
  getServices,
  getServiceById,
  getAddons,
  getAdminServices,
  createService,
  updateService,
  deleteService
} = require("../../controllers/serviceController");

const router = express.Router();

// Public User Service Catalog Endpoints
router.get("/services", getServices);
router.get("/services/:id", getServiceById);
router.get("/addons", getAddons);

// Admin Service Management Endpoints
router.get("/admin/services", getAdminServices);
router.post("/admin/services", createService);
router.put("/admin/services/:id", updateService);
router.delete("/admin/services/:id", deleteService);

module.exports = router;
