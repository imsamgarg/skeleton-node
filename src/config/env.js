const isProductionEnv = process.env.NODE_ENV == "PRODUCTION";
const isQAEnv = process.env.NODE_ENV == "QA";
const isTestEnv = process.env.NODE_ENV == "TEST";

module.exports = {
  isProductionEnv,
  isTestEnv,
  isQAEnv,
};
