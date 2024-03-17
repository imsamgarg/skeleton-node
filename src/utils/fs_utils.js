const path = require("path");
const crypto = require("crypto");

/**
 *
 * @param {string} folder
 * @param {string} id
 * @returns
 */
function generateUniqueFilename(folder, id, filename) {
  return path.join(
    folder,
    `${id}-${crypto.randomUUID()}${path.extname(filename)}`
  );
}

module.exports = {
  generateUniqueFilename,
};
