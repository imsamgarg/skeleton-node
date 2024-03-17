const mongoose = require("mongoose");
const app = require("./src/app.js");

//* Uncomment to add firebase support
// const admin = require("firebase-admin");

function validateEnv() {
  const requiredEnv = [
    "PORT",
    "MONGO_DB_URL",
    "JWT_SECRET_KEY",
    "JWT_EXPIRES_IN",
    "NODE_ENV",
    //* Uncomment to add firebase support
    // "FIREBASE_SERVICE_ACCOUNT_KEY_PATH",
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY",
    "AWS_BUCKET_NAME",
  ];

  for (const env of requiredEnv) {
    if (!process.env[env]) {
      console.error(`Environment variable ${env} is required`);
      process.exit(1);
    }
  }
}

/**
 * @type {string}
 */
const port = process.env.PORT;

/**
 * @type {string}
 */
const mongoDbUrl = process.env.MONGO_DB_URL;

/**
 *
 * @param {number} maxRetries
 */
async function connectToMongoDb(maxRetries) {
  if (maxRetries == 0) {
    console.log("Failed to connect to mongodb. Exiting...");
    process.exit(1);
  }

  try {
    console.log(`Trying to connect mongodb: Retries left- ${maxRetries}`);
    await mongoose.connect(mongoDbUrl);
    console.log("Mongodb connected");
  } catch (e) {
    console.log(`Mongodb connection failed: ${e}`);

    setTimeout(() => {
      connectToMongoDb(maxRetries - 1);
    }, 5 * 1000); // 5 Seconds
  }
}

//* Uncomment to add firebase support
// async function initFirebase() {
//   const keyPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH;
//   const serviceAccount = await require(`./${keyPath}`);

//   const app = initializeApp({
//     credential: cert(serviceAccount),
//   });

//   console.log("Firebase initialized");
// }

async function init() {
  validateEnv();
  await connectToMongoDb(5); // 5 retries
  //* Uncomment to add firebase support
  // await initFirebase();

  app.listen(port, async () => {
    console.log(`Server started on port ${port}`);
  });
}

init();
