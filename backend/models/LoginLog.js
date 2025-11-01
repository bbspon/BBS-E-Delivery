const mongoose = require("mongoose");

const loginLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  role: { type: String, required: true },
  loginTime: { type: Date, default: Date.now },
  ip: { type: String },
});

module.exports = mongoose.model("LoginLog", loginLogSchema);
