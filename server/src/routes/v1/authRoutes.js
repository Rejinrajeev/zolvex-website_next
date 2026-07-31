const express = require("express");
const {
  register,
  login,
  verifyMFA,
  setupMFA,
  enableMFA,
  disableMFA,
  regenerateBackupCodes,
  getActiveSessions,
  revokeSession,
  revokeAllOtherSessions,
  getSecurityStats,
  refreshToken,
  logout,
  getMe
} = require("../../controllers/authController");
const { authenticate } = require("../../middleware/auth");
const validate = require("../../middleware/validate");
const { authRateLimiter } = require("../../middleware/rateLimiter");
const { registerSchema, loginSchema } = require("../../validators/authValidators");

const router = express.Router();

router.post("/register", authRateLimiter, validate(registerSchema), register);
router.post("/login", authRateLimiter, validate(loginSchema), login);
router.post("/verify-mfa", authRateLimiter, verifyMFA);

router.post("/refresh-token", refreshToken);
router.post("/logout", logout);
router.get("/me", authenticate, getMe);

// Admin MFA Setup & Active Session Management
router.post("/mfa/setup", authenticate, setupMFA);
router.post("/mfa/enable", authenticate, enableMFA);
router.post("/mfa/disable", authenticate, disableMFA);
router.post("/mfa/regenerate-backup-codes", authenticate, regenerateBackupCodes);

router.get("/sessions", authenticate, getActiveSessions);
router.delete("/sessions/all-other", authenticate, revokeAllOtherSessions);
router.delete("/sessions/:sessionId", authenticate, revokeSession);
router.get("/security-stats", authenticate, getSecurityStats);

module.exports = router;
