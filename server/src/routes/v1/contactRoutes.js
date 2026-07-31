const express = require("express");
const {
  submitContact,
  getAdminMessages,
  getMessageById,
  updateMessageStatus,
  replyToMessage,
  deleteMessage
} = require("../../controllers/contactController");
const { authenticate, authorize } = require("../../middleware/auth");
const { authRateLimiter } = require("../../middleware/rateLimiter");

const router = express.Router();

// Public endpoint for submitting contact messages with rate limiting
router.post("/", authRateLimiter, submitContact);

// Protected Admin Contact Message endpoints
router.get("/admin/contact-messages", authenticate, authorize("admin", "super_admin"), getAdminMessages);
router.get("/admin/contact-messages/:id", authenticate, authorize("admin", "super_admin"), getMessageById);
router.patch("/admin/contact-messages/:id", authenticate, authorize("admin", "super_admin"), updateMessageStatus);
router.post("/admin/contact-messages/:id/reply", authenticate, authorize("admin", "super_admin"), replyToMessage);
router.delete("/admin/contact-messages/:id", authenticate, authorize("admin", "super_admin"), deleteMessage);

module.exports = router;
