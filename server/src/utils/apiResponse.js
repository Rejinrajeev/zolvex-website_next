class ApiResponse {
  static success(res, message = "Success", data = {}, statusCode = 200, meta = null) {
    const response = {
      success: true,
      message,
      data,
      errors: []
    };
    if (meta) response.meta = meta;
    return res.status(statusCode).json(response);
  }

  static error(res, message = "Error occurred", statusCode = 500, errors = []) {
    return res.status(statusCode).json({
      success: false,
      message,
      data: null,
      errors: Array.isArray(errors) ? errors : [errors]
    });
  }
}

module.exports = ApiResponse;
