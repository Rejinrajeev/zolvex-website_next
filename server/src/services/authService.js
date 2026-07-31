const userRepository = require("../repositories/userRepository");
const RefreshToken = require("../models/RefreshToken");
const User = require("../models/User");
const SecurityEvent = require("../models/SecurityEvent");
const { getIsConnected } = require("../database/connect");
const { hashPassword, comparePassword } = require("../utils/passwordUtils");
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../utils/jwtUtils");
const { ValidationError, AuthenticationError, ConflictError, ForbiddenError } = require("../utils/appError");
const {
  generateSecret,
  encryptSecret,
  decryptSecret,
  verifyTOTP,
  generateBackupCodes,
  hashBackupCode,
  generateOtpAuthUrl,
  generateQRCodeDataURL
} = require("../utils/mfaUtils");

// Dummy hash for constant-time comparison on unknown email to prevent timing side-channel attack
const DUMMY_HASH = "$2a$12$eImiTXuWVxfM37uY4JANjO5E/e22y3Wf0iR8.R33.X.Q.6";

class AuthService {
  async logSecurityEvent(userId, userEmail, action, req = null, status = "SUCCESS", details = {}) {
    if (getIsConnected()) {
      try {
        await SecurityEvent.create({
          userId,
          userEmail: userEmail || "admin@zolvex.com",
          action,
          resource: req ? req.originalUrl : "/api/v1/auth",
          ipAddress: req ? (req.ip || "127.0.0.1") : "127.0.0.1",
          userAgent: req ? (req.headers["user-agent"] || "System") : "System",
          status,
          details
        });
      } catch (e) {
        console.warn("Security log failed (offline):", e.message);
      }
    }
  }

  async register({ name, email, phone, password }) {
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      throw new ConflictError("An account with this email address already exists.");
    }

    const hashedPassword = await hashPassword(password);
    const user = await userRepository.create({
      name,
      email,
      phone,
      password: hashedPassword
    });

    const accessToken = generateAccessToken({ id: user._id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    if (getIsConnected()) {
      try {
        await RefreshToken.create({
          userId: user._id,
          token: refreshToken,
          expiresAt
        });
      } catch (e) {
        // Skip offline
      }
    }

    const userObj = user.toPublicJSON ? user.toPublicJSON() : user;
    return { user: userObj, accessToken, refreshToken };
  }

  async login(email, password, req = null) {
    const user = await userRepository.findByEmail(email, true);
    
    // Constant-time execution against timing attacks when user is missing
    if (!user) {
      await comparePassword(password || "dummyPassword", DUMMY_HASH);
      throw new AuthenticationError("Invalid email or password");
    }

    // Check account lockout status
    if (user.lockUntil && user.lockUntil > new Date()) {
      const remainingMins = Math.ceil((user.lockUntil.getTime() - Date.now()) / 60000);
      await this.logSecurityEvent(user._id, user.email, "LOGIN_LOCKED_ATTEMPT", req, "FAILED");
      throw new ForbiddenError(`Account locked due to 5 failed attempts. Please try again in ${remainingMins} minutes.`);
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      if (user.save) {
        user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
        if (user.failedLoginAttempts >= 5) {
          user.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // Lock for 15 minutes
        }
        await user.save();
      }
      await this.logSecurityEvent(user._id, user.email, "LOGIN_FAILED", req, "FAILED");
      throw new AuthenticationError("Invalid email or password");
    }

    // Reset failed attempts on success
    if (user.failedLoginAttempts > 0 && user.save) {
      user.failedLoginAttempts = 0;
      user.lockUntil = null;
      await user.save();
    }

    // Check if TOTP MFA is enabled
    if (user.mfaEnabled) {
      const mfaTempToken = generateAccessToken({ id: user._id, isMfaPending: true });
      await this.logSecurityEvent(user._id, user.email, "MFA_PROMPT_ISSUED", req, "SUCCESS");
      return { mfaRequired: true, mfaTempToken, userEmail: user.email };
    }

    await this.logSecurityEvent(user._id, user.email, "ADMIN_LOGIN_SUCCESS", req, "SUCCESS");
    return this.completeLogin(user, req);
  }

  async verifyMFA(mfaTempToken, totpCode, req = null) {
    const payload = verifyRefreshToken(mfaTempToken);
    if (!payload || !payload.id || !payload.isMfaPending) {
      throw new AuthenticationError("Invalid or expired MFA session token");
    }

    let user = null;
    if (getIsConnected()) {
      user = await User.findById(payload.id).select("+mfaSecret +mfaBackupCodes");
    } else {
      user = await userRepository.findById(payload.id, true);
    }

    if (!user || !user.mfaEnabled) {
      throw new AuthenticationError("User MFA not found");
    }

    const cleanCode = totpCode ? totpCode.trim() : "";
    const isValidTOTP = verifyTOTP(cleanCode, user.mfaSecret);
    let usedBackupCode = false;

    if (!isValidTOTP && user.mfaBackupCodes && user.mfaBackupCodes.length > 0) {
      const inputHash = hashBackupCode(cleanCode);
      const codeIndex = user.mfaBackupCodes.findIndex(
        b => (typeof b === "string" && b === cleanCode) || (b.codeHash && b.codeHash === inputHash && !b.used)
      );

      if (codeIndex !== -1) {
        usedBackupCode = true;
        if (typeof user.mfaBackupCodes[codeIndex] === "object") {
          user.mfaBackupCodes[codeIndex].used = true;
          user.mfaBackupCodes[codeIndex].usedAt = new Date();
        } else {
          user.mfaBackupCodes.splice(codeIndex, 1);
        }
        if (user.save) await user.save();
        await this.logSecurityEvent(user._id, user.email, "RECOVERY_CODE_USED", req, "SUCCESS");
      }
    }

    if (!isValidTOTP && !usedBackupCode) {
      await this.logSecurityEvent(user._id, user.email, "MFA_VERIFICATION_FAILED", req, "FAILED");
      throw new AuthenticationError("Invalid 6-digit TOTP code or recovery code.");
    }

    await this.logSecurityEvent(user._id, user.email, "TOTP_MFA_VERIFIED", req, "SUCCESS");
    return this.completeLogin(user, req);
  }

  async completeLogin(user, req = null) {
    const accessToken = generateAccessToken({ id: user._id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const userAgentStr = req ? req.headers["user-agent"] || "" : "";
    let browser = "Chrome / Safari";
    if (userAgentStr.includes("Firefox")) browser = "Firefox";
    if (userAgentStr.includes("Edg")) browser = "Edge";
    if (userAgentStr.includes("Chrome") && !userAgentStr.includes("Edg")) browser = "Chrome";
    if (userAgentStr.includes("Safari") && !userAgentStr.includes("Chrome")) browser = "Safari";

    if (getIsConnected()) {
      try {
        await RefreshToken.create({
          userId: user._id,
          token: refreshToken,
          expiresAt,
          ipAddress: req ? (req.ip || "127.0.0.1") : "127.0.0.1",
          userAgent: userAgentStr,
          browser,
          os: userAgentStr.includes("Mac") ? "macOS" : userAgentStr.includes("Win") ? "Windows" : userAgentStr.includes("Android") ? "Android" : userAgentStr.includes("iPhone") ? "iOS" : "Linux",
          lastActiveAt: new Date()
        });
      } catch (e) {
        // Skip if Mongo is offline
      }
    }

    if (req) {
      await userRepository.recordLogin(user._id, req.ip, userAgentStr);
    }

    const userObj = user.toPublicJSON ? user.toPublicJSON() : user;
    return { user: userObj, accessToken, refreshToken };
  }

  async setupMFA(userId, req = null) {
    let user = null;
    if (getIsConnected()) {
      user = await User.findById(userId);
    } else {
      user = await userRepository.findById(userId);
    }
    if (!user) throw new ValidationError("User not found");

    const rawSecret = generateSecret();
    const encryptedSecret = encryptSecret(rawSecret);
    
    user.mfaSecret = encryptedSecret;
    if (user.save) await user.save();

    const otpAuthUrl = generateOtpAuthUrl(user.email, rawSecret);
    const qrCodeDataUrl = await generateQRCodeDataURL(otpAuthUrl);

    await this.logSecurityEvent(user._id, user.email, "MFA_SETUP_STARTED", req, "SUCCESS");

    return {
      secret: rawSecret,
      otpAuthUrl,
      qrCodeDataUrl
    };
  }

  async enableMFA(userId, code, req = null) {
    let user = null;
    if (getIsConnected()) {
      user = await User.findById(userId).select("+mfaSecret");
    } else {
      user = await userRepository.findById(userId, true);
    }
    if (!user || !user.mfaSecret) {
      throw new ValidationError("MFA setup incomplete. Please generate a secret first.");
    }

    const isValid = verifyTOTP(code, user.mfaSecret);
    if (!isValid) {
      await this.logSecurityEvent(user._id, user.email, "MFA_ENABLE_FAILED", req, "FAILED");
      throw new ValidationError("Invalid 6-digit verification code. Please check your authenticator app.");
    }

    const rawBackupCodes = generateBackupCodes(10);
    const hashedBackupCodes = rawBackupCodes.map(c => ({
      codeHash: hashBackupCode(c),
      used: false
    }));

    user.mfaEnabled = true;
    user.mfaBackupCodes = hashedBackupCodes;
    if (user.save) await user.save();

    await this.logSecurityEvent(user._id, user.email, "MFA_ENABLED", req, "SUCCESS");

    return { mfaEnabled: true, backupCodes: rawBackupCodes };
  }

  async disableMFA(userId, req = null) {
    let user = null;
    if (getIsConnected()) {
      user = await User.findById(userId);
    } else {
      user = await userRepository.findById(userId);
    }
    if (!user) throw new ValidationError("User not found");

    user.mfaEnabled = false;
    user.mfaSecret = null;
    user.mfaBackupCodes = [];
    if (user.save) await user.save();

    await this.logSecurityEvent(user._id, user.email, "MFA_DISABLED", req, "WARNING");

    return { mfaEnabled: false };
  }

  async regenerateBackupCodes(userId, req = null) {
    let user = null;
    if (getIsConnected()) {
      user = await User.findById(userId);
    } else {
      user = await userRepository.findById(userId);
    }
    if (!user || !user.mfaEnabled) {
      throw new ValidationError("MFA must be enabled to generate backup codes.");
    }

    const rawBackupCodes = generateBackupCodes(10);
    const hashedBackupCodes = rawBackupCodes.map(c => ({
      codeHash: hashBackupCode(c),
      used: false
    }));

    user.mfaBackupCodes = hashedBackupCodes;
    if (user.save) await user.save();

    await this.logSecurityEvent(user._id, user.email, "BACKUP_CODES_REGENERATED", req, "SUCCESS");

    return { backupCodes: rawBackupCodes };
  }

  async getActiveSessions(userId, currentRefreshToken = null) {
    if (getIsConnected()) {
      const sessions = await RefreshToken.find({ userId, isRevoked: false })
        .sort({ lastActiveAt: -1 })
        .lean();

      return sessions.map((s, idx) => ({
        ...s,
        isCurrentSession: currentRefreshToken ? s.token === currentRefreshToken : idx === 0
      }));
    }
    return [
      {
        _id: "s1",
        ipAddress: "127.0.0.1",
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        browser: "Chrome 122.0",
        os: "macOS Sonoma",
        lastActiveAt: new Date().toISOString(),
        isCurrentSession: true,
        isRevoked: false
      }
    ];
  }

  async revokeSession(userId, sessionId, req = null) {
    if (getIsConnected()) {
      await RefreshToken.updateOne({ _id: sessionId, userId }, { isRevoked: true });
    }
    await this.logSecurityEvent(userId, "admin@zolvex.com", "SESSION_REVOKED", req, "SUCCESS", { sessionId });
    return true;
  }

  async revokeAllOtherSessions(userId, currentRefreshToken = null, req = null) {
    if (getIsConnected()) {
      const filter = { userId, isRevoked: false };
      if (currentRefreshToken) {
        filter.token = { $ne: currentRefreshToken };
      }
      await RefreshToken.updateMany(filter, { isRevoked: true });
    }
    await this.logSecurityEvent(userId, "admin@zolvex.com", "ALL_OTHER_SESSIONS_REVOKED", req, "WARNING");
    return true;
  }

  async getSecurityStats(userId) {
    let user = null;
    let activeSessionsCount = 1;

    if (getIsConnected()) {
      user = await User.findById(userId);
      activeSessionsCount = await RefreshToken.countDocuments({ userId, isRevoked: false });
    } else {
      user = await userRepository.findById(userId);
    }

    const mfaEnabled = user ? user.mfaEnabled : false;
    let score = 50;
    if (mfaEnabled) score += 40;
    if (activeSessionsCount <= 2) score += 10;

    return {
      mfaEnabled,
      activeSessionsCount,
      securityScore: Math.min(100, score),
      lastLoginAt: user?.lastLoginAt || new Date(),
      lastLoginIp: user?.lastLoginIp || "127.0.0.1"
    };
  }

  async refresh(token) {
    const payload = verifyRefreshToken(token);
    if (!payload) {
      throw new AuthenticationError("Invalid or expired refresh token");
    }

    if (getIsConnected()) {
      const tokenDoc = await RefreshToken.findOne({ token, isRevoked: false });
      if (!tokenDoc) {
        throw new AuthenticationError("Refresh token has been revoked or expired");
      }
    }

    const user = await userRepository.findById(payload.id);
    if (!user) {
      throw new AuthenticationError("User no longer exists");
    }

    const newAccessToken = generateAccessToken({ id: user._id, role: user.role });
    return { accessToken: newAccessToken };
  }

  async logout(token, req = null) {
    if (token && getIsConnected()) {
      await RefreshToken.updateOne({ token }, { isRevoked: true });
    }
    return true;
  }
}

module.exports = new AuthService();
