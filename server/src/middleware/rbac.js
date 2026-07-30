const { AuthorizationError } = require("../utils/appError");

function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AuthorizationError("User is not authenticated"));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AuthorizationError(`User role '${req.user.role}' is not authorized to access this resource`)
      );
    }

    next();
  };
}

module.exports = { authorize };
