const { ValidationError } = require("../utils/appError");

function validate(schema) {
  return (req, res, next) => {
    try {
      if (schema.body) schema.body.parse(req.body);
      if (schema.query) schema.query.parse(req.query);
      if (schema.params) schema.params.parse(req.params);
      next();
    } catch (error) {
      if (error.errors) {
        const formattedErrors = error.errors.map(err => ({
          field: err.path.join("."),
          message: err.message
        }));
        return next(new ValidationError("Request validation failed", formattedErrors));
      }
      next(error);
    }
  };
}

module.exports = validate;
