/**
 *
 * @param {import("express").Response} res
 * @param {any} data
 * @param {number} statusCode
 */
export const sendSuccessReponse = (res, data, statusCode = 200) => {
  return res.status(statusCode).json(data); //For now just send the data as it is;
};
