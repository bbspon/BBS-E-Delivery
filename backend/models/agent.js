const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  agentId: { type: String, required: true, unique: true },
  name: String,
  status: String,
  coordinates: {
    lat: Number,
    lng: Number,
  },
  digiPIN: String,
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Agent", agentSchema);
