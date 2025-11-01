const mongoose = require("mongoose");

const earningsSchema = new mongoose.Schema({
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeliveryAgent",
  },
  totalDeliveries: Number,
  totalAmount: Number,
  deliveryBonus: Number,
  netPayout: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Earning", earningsSchema);
