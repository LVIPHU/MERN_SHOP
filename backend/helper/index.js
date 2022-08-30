const config = require("../config");
const Verify = require("../model/verify")

// create verify code
const generateVerifyCode = (numberOfDigits) => {
    //random 1 -> 10^numberOfDigits
    const n = parseInt(numberOfDigits);
    const number = Math.floor(Math.random() * Math.pow(10, n)) + 1;
    let numberStr = number.toString();
    const l = numberStr.length;
    for (let i = 0; i < 6 - l; ++i) {
      numberStr = '0' + numberStr;
    }
    return numberStr;
  };
  
  // Check time of verify code
  const isVerifyEmail = async (email, verifyCode) => {
    try {
      const res = await Verify.findOne({ email });
      if (res) {
        const { code, dateCreated } = res;
        if (code !== verifyCode) return false;
        const now = Date.now();
        // Check time of verify code
        if (now - dateCreated > config.verifyCodeIn)
          return false;
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  module.exports = {
    generateVerifyCode,
    isVerifyEmail
  };
