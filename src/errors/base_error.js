class BaseError extends Error {
  /**
   *
   * @param {string} name
   * @param {string} message
   * @param {number} httpStatusCode
   * @param {boolean} isOperation
   */
  constructor(name, message, httpStatusCode, isOperation) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpStatusCode = httpStatusCode;
    this.isOperation = isOperation;
  }
}

module.exports = BaseError;
