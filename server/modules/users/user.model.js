const mongoose = require("mongoose");
const commonSchema = require("../../utils/commonSchema");
const validateEmail = (email) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};
const userSchema = new mongoose.Schema({
  name: { type: String, require: "Full name is requried" },
  email: {
    type: String,
    trim: true, // removing the white space
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  isEmailVerified: { type: Boolean, default: false },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: true, required: true },
  ...commonSchema,
});
const User = mongoose.model("User", userSchema);
module.exports = User;
