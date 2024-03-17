const express = require("express");
const morgan = require("morgan");
const errorHandler = require("./errors/error_handler.js");
const env = require("./config/env.js");
const cors = require("cors");
const { adminRole } = require("./models/user_model.js");

const authMiddleware = require("./middlewares/auth_middleware.js");

const app = express();

app.use(morgan("tiny"));
app.use(express.json({ limit: "5kb", strict: true }));

app.use(cors());
app.use(express.static("public"));

if (env.isTestEnv) {
  app.use("/temp_file_storage", express.static("temp_file_storage"));
}

app.use(authMiddleware.authMiddleware);
// DO NOT EDIT THIS LINE: <ROUTES>

app.use(authMiddleware.allowedForOnly([adminRole]));
// ---- Admin routes ------

app.use("*", errorHandler.pathNotFoundHandler);
app.use(errorHandler.errorHandler);

module.exports = app;
