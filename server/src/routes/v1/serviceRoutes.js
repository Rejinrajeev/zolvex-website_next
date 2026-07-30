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
const { authenticate } = require("../../middleware/auth");
const { authorize } = require("../../middleware/rbac");

const router = express.Router();

// Public User Service Catalog Endpoints
router.get("/services", getServices);
router.get("/services/:id", getServiceById);
router.get("/addons", getAddons);

// Protected Admin Service Management Endpoints (RBAC Secured: admin, super_admin)
router.get("/admin/services", authenticate, authorize("admin", "super_admin"), getAdminServices);
router.post("/admin/services", authenticate, authorize("admin", "super_admin"), createService);
router.put("/admin/services/:id", authenticate, authorize("admin", "super_admin"), updateService);
router.delete("/admin/services/:id", authenticate, authorize("admin", "super_admin"), deleteService);

module.exports = router;
