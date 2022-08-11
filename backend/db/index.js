const mongoose = require("mongoose");

const config = require("../config/index");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL || config.dbURL);
    if ((process.env.NODE_ENV || config.env) !== "test") {
      console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    }
  } catch (error) {
    if ((process.env.NODE_ENV || config.env) !== "test") {
      console.error(`Error ${error}`.red.underline.bold);
    }
    process.exit(1);
  }
};

module.exports = connectDB;
