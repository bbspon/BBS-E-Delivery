const mongoose = require("mongoose");

const deliveryAgentSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  vehicle: String,
  status: { type: String, default: "online" },
});

module.exports = mongoose.model("DeliveryAgent", deliveryAgentSchema);
