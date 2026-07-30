const AuditLog = require("../models/AuditLog");
const { getIsConnected } = require("../database/connect");

class AuditLogRepository {
  async log(action, resource, details = {}, userId = null, req = null) {
    if (!getIsConnected()) {
      return null;
    }
    try {
      const logData = {
        action,
        resource,
        details,
        userId,
        ipAddress: req ? (req.ip || req.headers["x-forwarded-for"]) : null,
        userAgent: req ? req.headers["user-agent"] : null
      };
      return await AuditLog.create(logData);
    } catch (e) {
      return null;
    }
  }
}

module.exports = new AuditLogRepository();
