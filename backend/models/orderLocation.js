const mongoose = require("mongoose");

const orderLocationSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customerName: String,
  digiPin: String,
  agentId: String,
  status: { type: String, enum: ["assigned", "pending", "delivered"] },
});

module.exports = mongoose.model("OrderLocation", orderLocationSchema);
