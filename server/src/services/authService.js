const userRepository = require("../repositories/userRepository");
const RefreshToken = require("../models/RefreshToken");
const User = require("../models/User");
const { getIsConnected } = require("../database/connect");
const { hashPassword, comparePassword } = require("../utils/passwordUtils");
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../utils/jwtUtils");
const { ValidationError, AuthenticationError, ConflictError, ForbiddenError } = require("../utils/appError");
const { generateSecret, verifyTOTP, generateBackupCodes, generateOtpAuthUrl } = require("../utils/mfaUtils");

// Dummy hash for constant-time comparison on unknown email to prevent timing side-channel attack
const DUMMY_HASH = "$2a$12$eImiTXuWVxfM37uY4JANjO5E/e22y3Wf0iR8.R33.X.Q.6";

class AuthService {
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
      return { mfaRequired: true, mfaTempToken, userEmail: user.email };
    }

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

    const isValidTOTP = verifyTOTP(totpCode, user.mfaSecret);
    let usedBackupCode = false;

    if (!isValidTOTP && user.mfaBackupCodes) {
      const matchIndex = user.mfaBackupCodes.indexOf(totpCode.trim());
      if (matchIndex !== -1) {
        usedBackupCode = true;
        user.mfaBackupCodes.splice(matchIndex, 1);
        if (user.save) await user.save();
      }
    }

    if (!isValidTOTP && !usedBackupCode) {
      throw new AuthenticationError("Invalid 6-digit TOTP code or recovery code.");
    }

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

    if (getIsConnected()) {
      try {
        await RefreshToken.create({
          userId: user._id,
          token: refreshToken,
          expiresAt,
          ipAddress: req ? (req.ip || "127.0.0.1") : "127.0.0.1",
          userAgent: userAgentStr,
          browser,
          os: userAgentStr.includes("Mac") ? "macOS" : userAgentStr.includes("Win") ? "Windows" : "Linux",
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

  async setupMFA(userId) {
    let user = null;
    if (getIsConnected()) {
      user = await User.findById(userId);
    } else {
      user = await userRepository.findById(userId);
    }
    if (!user) throw new ValidationError("User not found");

    const secret = generateSecret();
    user.mfaSecret = secret;
    if (user.save) await user.save();

    const otpAuthUrl = generateOtpAuthUrl(user.email, secret);
    return { secret, otpAuthUrl };
  }

  async enableMFA(userId, code) {
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
      throw new ValidationError("Invalid 6-digit verification code. Please check your authenticator app.");
    }

    const backupCodes = generateBackupCodes(8);
    user.mfaEnabled = true;
    user.mfaBackupCodes = backupCodes;
    if (user.save) await user.save();

    return { mfaEnabled: true, backupCodes };
  }

  async getActiveSessions(userId) {
    if (getIsConnected()) {
      return RefreshToken.find({ userId, isRevoked: false }).sort({ lastActiveAt: -1 }).lean();
    }
    return [];
  }

  async revokeSession(userId, sessionId) {
    if (getIsConnected()) {
      await RefreshToken.updateOne({ _id: sessionId, userId }, { isRevoked: true });
    }
    return true;
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

  async logout(token) {
    if (token && getIsConnected()) {
      await RefreshToken.updateOne({ token }, { isRevoked: true });
    }
    return true;
  }
}

module.exports = new AuthService();
