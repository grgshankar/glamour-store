const bcrypt = require("bcrypt");
const userModel = require("../users/user.model");
const authModel = require("./auth.model");
const { generateOTP, verifyOTP } = require("../../utils/otp");

const create = async (payload) => {
  const { password, ...rest } = payload;
  rest.password = await bcrypt.hash(password, +process.env.SALT_ROUNDS);
  const user = await userModel.create(rest);
  await authModel.create({ email: user?.email, token: generateOTP() });
  //now need to send token to email
  return user;
};

const login = async (email, password) => {
  const user = await userModel.findOne({ email });
  //   console.log("user found", userExist);

  if (!user) {
    throw new Error("User not found...");
  }

  //is user email verified??
  if (!user.isEmailVerified)
    throw new Error(
      "User email not verified. Please verify the email to start"
    );
  // is user active??
  if (!user.isActive)
    throw new Error("User is blocked. Please contact to admin");

  const result = await bcrypt.compare(password, user?.password);
  // console.log("Password comparison result", result);

  if (!result) {
    throw new Error("Email or Password is invalid...");
  }

  return result;
};

const verifyEmail = async (email, token) => {
  // authModel email check
  const user = await authModel.findOne({ email });
  if (!user) throw new Error("User not found...");

  //OTP check
  const isValidOTP = verifyOTP(token);
  if (!isValidOTP) throw new Error("Token is expired...");

  //authModel OTP token compare
  const isValid = user?.token === +token;
  if (!isValid) throw new Error("Token mismatched...");

  //userModel isEmailVerified
  await userModel.findOneAndUpdate(
    { email },
    { isEmailVerified: true },
    { new: true }
  );
  return true;
};

const regenarateToken = async (email) => {
  // authModel email check
  const user = await authModel.findOne({ email });
  if (!user) throw new Error("User not found...");

  //generate new OTP
  await authModel.findOneAndUpdate({ email }, { token: generateOTP() });
  //now need to send token to email
  return true;
};

module.exports = { create, login, regenarateToken, verifyEmail };
