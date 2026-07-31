const express = require("express");
const {
  getServices,
  getServiceById,
  getAddons,
  getAdminServices,
  createService,
  updateService,
  reorderServices,
  deleteService
} = require("../../controllers/serviceController");
const { authenticate, authorize } = require("../../middleware/auth");
const upload = require("../../middleware/upload");

const router = express.Router();

// Public User Service Catalog Endpoints
router.get("/services", getServices);
router.get("/services/:id", getServiceById);
router.get("/addons", getAddons);

// Protected Admin Service Management Endpoints
router.get("/admin/services", authenticate, authorize("admin", "super_admin"), getAdminServices);
router.post("/admin/services", authenticate, authorize("admin", "super_admin"), upload.single("image"), createService);
router.put("/admin/services/:id", authenticate, authorize("admin", "super_admin"), upload.single("image"), updateService);
router.patch("/admin/services/reorder", authenticate, authorize("admin", "super_admin"), reorderServices);
router.delete("/admin/services/:id", authenticate, authorize("admin", "super_admin"), deleteService);

module.exports = router;
