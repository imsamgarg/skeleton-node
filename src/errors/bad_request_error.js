const BaseError = require("./base_error.js");
const errorCodes = require("./error_codes.js");

class BadReqError extends BaseError {
  /**
   *
   * @param {string} message
   * @param {string} code
   * @param {number} statusCode
   */
  constructor(message, code = errorCodes.badRequest, statusCode = 400) {
    super(code, message, statusCode, true);
  }
}

module.exports = BadReqError;
