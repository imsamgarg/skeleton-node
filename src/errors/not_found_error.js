const BaseError = require("./base_error.js");
const errorCodes = require("./error_codes.js");

class NotFoundError extends BaseError {
  constructor(message) {
    super(errorCodes.serverError, message, 404, true);
  }
}

module.exports = NotFoundError;
