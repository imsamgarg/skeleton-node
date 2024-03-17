const errorCodes = require("./error_codes.js");
const BaseError = require("./base_error.js");
const NotFoundError = require("./not_found_error.js");

/**
 *
 * @param {Error} err
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
// eslint-disable-next-line no-unused-vars
module.exports.errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV == "dev") {
    console.log(err);
  }

  if (err instanceof BaseError && err.isOperation) {
    res.status(err.httpStatusCode).json({
      status: "error",
      code: err.name,
      message: err.message,
    });
    return;
  }

  return res.status(500).json({
    status: "error",
    code: errorCodes.serverError,
  });
};

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
module.exports.pathNotFoundHandler = (req, res, next) => {
  next(new NotFoundError(`Url ${req.originalUrl} not found!!`));
};
