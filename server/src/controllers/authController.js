const authService = require("../services/authService");
const ApiResponse = require("../utils/apiResponse");
const catchAsync = require("../utils/catchAsync");

const register = catchAsync(async (req, res) => {
  const result = await authService.register(req.body);
  
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  return ApiResponse.success(res, "Account created successfully", {
    user: result.user,
    accessToken: result.accessToken
  }, 201);
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password, req);

  if (result.mfaRequired) {
    return ApiResponse.success(res, "MFA Verification Required", {
      mfaRequired: true,
      mfaTempToken: result.mfaTempToken,
      userEmail: result.userEmail
    });
  }

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  return ApiResponse.success(res, "Login successful", {
    user: result.user,
    accessToken: result.accessToken
  });
});

const verifyMFA = catchAsync(async (req, res) => {
  const { mfaTempToken, code } = req.body;
  const result = await authService.verifyMFA(mfaTempToken, code, req);

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  return ApiResponse.success(res, "MFA Verification Successful", {
    user: result.user,
    accessToken: result.accessToken
  });
});

const setupMFA = catchAsync(async (req, res) => {
  const result = await authService.setupMFA(req.user._id, req);
  return ApiResponse.success(res, "TOTP Secret & QR Code Generated", result);
});

const enableMFA = catchAsync(async (req, res) => {
  const { code } = req.body;
  const result = await authService.enableMFA(req.user._id, code, req);
  return ApiResponse.success(res, "MFA Enabled Successfully", result);
});

const disableMFA = catchAsync(async (req, res) => {
  const result = await authService.disableMFA(req.user._id, req);
  return ApiResponse.success(res, "MFA Disabled Successfully", result);
});

const regenerateBackupCodes = catchAsync(async (req, res) => {
  const result = await authService.regenerateBackupCodes(req.user._id, req);
  return ApiResponse.success(res, "Backup recovery codes regenerated", result);
});

const getActiveSessions = catchAsync(async (req, res) => {
  const currentToken = req.cookies?.refreshToken;
  const sessions = await authService.getActiveSessions(req.user._id, currentToken);
  return ApiResponse.success(res, "Active sessions retrieved", sessions);
});

const revokeSession = catchAsync(async (req, res) => {
  const { sessionId } = req.params;
  await authService.revokeSession(req.user._id, sessionId, req);
  return ApiResponse.success(res, "Session revoked successfully");
});

const revokeAllOtherSessions = catchAsync(async (req, res) => {
  const currentToken = req.cookies?.refreshToken;
  await authService.revokeAllOtherSessions(req.user._id, currentToken, req);
  return ApiResponse.success(res, "All other sessions revoked successfully");
});

const getSecurityStats = catchAsync(async (req, res) => {
  const stats = await authService.getSecurityStats(req.user._id);
  return ApiResponse.success(res, "Security stats retrieved", stats);
});

const refreshToken = catchAsync(async (req, res) => {
  const token = req.cookies?.refreshToken || req.body?.refreshToken;
  const result = await authService.refresh(token);

  return ApiResponse.success(res, "Token refreshed", {
    accessToken: result.accessToken
  });
});

const logout = catchAsync(async (req, res) => {
  const token = req.cookies?.refreshToken || req.body?.refreshToken;
  await authService.logout(token, req);
  res.clearCookie("refreshToken");

  return ApiResponse.success(res, "Logged out successfully");
});

const getMe = catchAsync(async (req, res) => {
  return ApiResponse.success(res, "User profile retrieved", {
    user: req.user
  });
});

module.exports = {
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
};
