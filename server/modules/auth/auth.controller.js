const bcrypt = require("bcrypt");
const userModel = require("../users/user.model");
const authModel = require("./auth.model");
const { generateOTP } = require("../../utils/otp");

const create = async (payload) => {
  const { password, ...rest } = payload;
  rest.password = await bcrypt.hash(password, +process.env.SALT_ROUNDS);
  const user = await userModel.create(rest);
  await authModel.create({ email: user?.email, token: generateOTP() });
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

module.exports = { create, login };
