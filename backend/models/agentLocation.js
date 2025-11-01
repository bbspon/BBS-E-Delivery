const mongoose = require("mongoose");

const agentLocationSchema = new mongoose.Schema({
  agentId: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
    name: String,
  phone: String,
  digiPin: String,
  status: { type: String, enum: ["idle", "en_route", "delivering"] },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AgentLocation", agentLocationSchema);
