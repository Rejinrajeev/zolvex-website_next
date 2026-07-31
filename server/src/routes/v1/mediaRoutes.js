const express = require("express");
const {
  uploadMedia,
  getMediaList,
  getMediaById,
  updateMedia,
  replaceMedia,
  deleteMedia
} = require("../../controllers/mediaController");
const { authenticate, authorize } = require("../../middleware/auth");
const upload = require("../../middleware/upload");

const router = express.Router();

// All media endpoints require authentication
router.use(authenticate);

router.post("/upload", upload.single("image"), uploadMedia);
router.get("/", getMediaList);
router.get("/:id", getMediaById);
router.put("/:id", authorize("admin", "super_admin"), updateMedia);
router.post("/:id/replace", authorize("admin", "super_admin"), upload.single("image"), replaceMedia);
router.delete("/:id", authorize("admin", "super_admin"), deleteMedia);

module.exports = router;
