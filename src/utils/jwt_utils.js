const jwt = require("jsonwebtoken");
const utils = require("util");

/**
 *
 * @param {string} token
 * @returns {Promise<jwt.JwtPayload?>}
 */
module.exports.decodeJwt = (token) => {
  const secretKey = process.env.JWT_SECRET_KEY;

  return utils.promisify(jwt.verify)(
    token,
    secretKey,
    { complete: false } // For only returning the payload
  );
};

/**
 *
 * @param {Record} data
 * @param {string|undefined} expiry
 * @returns {Promise<string>}
 */
module.exports.encodeJwt = (data, expiry) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const expiresIn = expiry || process.env.JWT_EXPIRES_IN;

  return utils.promisify(jwt.sign)(data, secretKey, {
    expiresIn: expiresIn,
  });
};
