const BadReqError = require("../errors/bad_request_error.js");
const errorCodes = require("../errors/error_codes.js");
const { UserModel } = require("../models/user_model.js");
const authUtils = require("../utils/auth_utils.js");

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const authMiddleware = async (req, res, next) => {
  try {
    const jwtPayload = await authUtils.extractJwt(req);

    const unAuthenticatedError = new BadReqError(
      "Not authenticated",
      errorCodes.unauthenticated,
      403
    );

    if (!jwtPayload) {
      throw unAuthenticatedError;
    }

    const { id: userId, role } = jwtPayload;

    const user = await UserModel.findOne({
      _id: userId,
    })
      .select("_id")
      .lean();

    if (!user) {
      throw unAuthenticatedError;
    }

    req.userId = userId;
    req.userRole = role;

    next();
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {string[]} roles
 * @returns {import("express").RequestHandler}
 */
const allowedForOnly = (roles) => {
  return async (req, res, next) => {
    try {
      const role = req.userRole;
      if (roles.find((v) => v === role)) {
        next();
        return;
      }

      throw new BadReqError("Not authorized", errorCodes.unauthorized, 401);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  authMiddleware,
  allowedForOnly,
};
