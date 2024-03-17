const mongoose = require("mongoose");

const DeviceInfoSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      // enum: ["android", "ios", "web"],
    },
    platformVersion: {
      type: String,
    },
    deviceId: {
      type: String,
    },
    deviceModel: {
      type: String,
    },
    appVersion: {
      type: String,
    },
    //* Uncomment below lines when we need to store fcm token
    // fcmToken: {
    //   type: String,
    // },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    name: {
      default: "",
      type: String,
    },
    role: {
      type: String,
      enum: allUserRoles,
      default: userRole,
    },
    deviceInfo: {
      type: DeviceInfoSchema,
    },
  },
  {
    timestamps: true,
  }
);

const adminRole = "admin";
const userRole = "user";
const allUserRoles = [userRole, adminRole];

const UserModel = mongoose.model("users", UserSchema);

module.exports = {
  adminRole,
  userRole,
  allUserRoles,
  UserModel,
};
