const { verifyAccessToken } = require("../utils/jwtUtils");
const userRepository = require("../repositories/userRepository");
const { AuthenticationError } = require("../utils/appError");

async function authenticate(req, res, next) {
  try {
    let token = null;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      throw new AuthenticationError("Authentication required. Please log in.");
    }

    const payload = verifyAccessToken(token);
    if (!payload) {
      throw new AuthenticationError("Invalid or expired access token");
    }

    const user = await userRepository.findById(payload.id);
    if (!user) {
      throw new AuthenticationError("The user belonging to this token no longer exists.");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

// Optional Auth (populates req.user if token exists, but doesn't block if anonymous)
async function optionalAuth(req, res, next) {
  try {
    let token = null;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (token) {
      const payload = verifyAccessToken(token);
      if (payload) {
        const user = await userRepository.findById(payload.id);
        if (user) req.user = user;
      }
    }
  } catch (e) {
    // Ignore error for optional auth
  }
  next();
}

module.exports = { authenticate, optionalAuth };
