const bcrypt = require("bcrypt");
const saltRounds = 10;
const userModel = require("../users/user.model");

const create = async (payload) => {
  const { password, ...rest } = payload;
  rest.password = await bcrypt.hash(password, saltRounds);
  return userModel.create(rest);
};

const login = async (email, password) => {
  const userExist = await userModel.findOne({ email });
  //   console.log("user found", userExist);

  if (!userExist) {
    throw new Error("User not found...");
  }

  const result = await bcrypt.compare(password, userExist?.password);
  console.log("Password comparison result", result);

  if (!result) {
    throw new Error("Email or Password is invalid...");
  }

  return result;
};

module.exports = { create, login };
