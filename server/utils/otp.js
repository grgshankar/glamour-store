// require("dotenv").config();
const { totp } = require("otplib");
totp.options = {
  epoch: Date.now() + Math.floor(Math.random() * 10),
  step: +process.env.OTP_DURATION_IN_SEC,
};

const generateOTP = () => {
  return totp.generate(process.env.OTP_SECRET);
};
const verifyOTP = (token) => {
  return totp.check(token, process.env.OTP_SECRET);
};

module.exports = { generateOTP, verifyOTP };
