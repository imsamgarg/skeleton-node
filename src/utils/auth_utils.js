const crypto = require("crypto");
const { decodeJwt } = require("./jwt_utils");

/**
 *
 * @param {number} length
 * @returns {string}
 */
const generateHash = (length) => {
  return crypto.randomBytes(length).toString("base64");
};

/**
 *
 * @param {number} length
 * @returns {string}
 */
const generateOtp = (length) => {
  let otp = "";

  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 9);
  }

  return otp;
};

const staticOtp = (length) => {
  let otp = "";

  for (let i = 1; i <= length; i++) {
    otp += i.toString();
  }

  return otp;
};

/**
 *
 * @param {import("express").Request} req
 * @returns {Promise<import("jsonwebtoken").JwtPayload?>}
 */
const extractJwt = async (req) => {
  const authHeader = req.header("authorization");

  if (
    !authHeader ||
    authHeader.length == 0 ||
    authHeader.split(" ").length != 2
  ) {
    return null;
  }

  const token = authHeader.split(" ")[1];

  try {
    return await decodeJwt(token);
  } catch (e) {
    return null;
  }
};

module.exports = {
  generateHash,
  generateOtp,
  staticOtp,
  extractJwt,
};
