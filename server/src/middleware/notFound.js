const { NotFoundError } = require("../utils/appError");

function notFound(req, res, next) {
  next(new NotFoundError(`Cannot find endpoint ${req.originalUrl} on this server`));
}

module.exports = notFound;
