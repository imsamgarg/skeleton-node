/**
 *
 * @param {*} literal
 * @returns {any[]}
 */
function toArrayIfLiteral(literal) {
  if (
    typeof literal === "string" ||
    typeof literal === "number" ||
    typeof literal === "boolean"
  ) {
    return [literal];
  }

  return literal;
}

module.exports = {
  toArrayIfLiteral,
};
