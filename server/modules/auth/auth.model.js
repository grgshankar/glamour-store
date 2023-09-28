const { Schema, model } = require("mongoose");

const authSchema = new Schema({
  email: { type: String, required: true },
  token: { type: Number, required: true },
});

module.exports = model("Auth", authSchema);
