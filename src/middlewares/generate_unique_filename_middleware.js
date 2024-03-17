const fsUtils = require("../utils/fs_utils.js");

/**
 *
 * @param {string} folder
 * @returns {import("express").RequestHandler}
 */
export const generateUniqueFilenameMiddleware = (folder, id) => {
  /**
   * @param {Express.Request} req
   */
  return (req, res, next) => {
    const userId = req.userId;

    const fileId = id ?? userId;

    if (req.file) {
      req.file.filename = fsUtils.generateUniqueFilename(
        folder,
        fileId,
        req.file.originalname
      );
    }

    if (req.files) {
      if (Array.isArray(req.files)) {
        req.files = req.files.map((file) => {
          file.filename = fsUtils.generateUniqueFilename(
            folder,
            fileId,
            file.originalname
          );
          return file;
        });
      } else if (typeof req.files === "object") {
        for (const key in req.files) {
          if (Object.hasOwnProperty.call(req.files, key)) {
            const files = req.files[key];
            req.files[key] = files.map((file) => {
              file.filename = fsUtils.generateUniqueFilename(
                folder,
                fileId,
                file.originalname
              );
              return file;
            });
          }
        }
      }
    }

    next();
  };
};
