const dotenv = require("dotenv");
const path = require("path");
// Load environment variables from .env file
dotenv.config();

const env = process.env.NODE_ENV || "development";
const APP_NAME = process.env.APP_NAME || "ALPINE";
const USER = "LVIPHU";
const DB_PASSWORD = "1234";
const configs = {
  base: {
    env,
    name: APP_NAME,
    host: process.env.APP_HOST || "0.0.0.0",
    port: 3001,
    publicImagePath: path.join(__dirname, "../assets/public/images"),
    tokenExpiresIn: "30d",
  },
  development: {
    dbURL: `mongodb+srv://${USER}:${DB_PASSWORD}@alpine.yk3hqf3.mongodb.net/${APP_NAME}?retryWrites=true&w=majority`,
    secretToken: "000000_BI_MAT_DONG_TROI_00000",
    email: {
      address: "N18DCCN150@student.ptithcm.edu.vn",
      password: "phu357159",
    },
    algolia: {
      applicationID: "VFQVLSDKVJ",
      adminAPIKey: "4d619277503a8bbe11fb1f5cccaf13d3",
    },
    paypalID:
      "AdZbp1FplyH4XeejvilNc12GtIEXj0v-AKSNc60LT2ka8EOxzgaE_ACiq9dUhbyrVoOLWPrNIZoJQd6u",
  },
  test: {
    port: 7072,
  },
};
const config = Object.assign(configs.base, configs[env]);

module.exports = config;
