const jwt = require("jsonwebtoken");

const config = require("../config/index")

const generateToken = (id) => {
  if ((process.env.NODE_ENV || config.env) === "test") {
    return jwt.sign({ id }, "testing", {
      expiresIn: config.tokenExpiresIn || '7d',
    });
  } else {
    return jwt.sign({ id }, process.env.JWT_SECRET || config.secretToken, {
      expiresIn: config.tokenExpiresIn || '7d',
    });
  }
};

module.exports = generateToken;
