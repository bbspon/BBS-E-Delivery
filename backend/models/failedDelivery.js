const mongoose = require("mongoose");

const failedDeliverySchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true },
    agentId: { type: String, required: true },
    customer: { type: String, required: true },
    mobile: { type: String },
    deliveryAddress: { type: String },
    reason: { type: String, required: true },
    status: { type: String, default: "Failed" },
    attemptedDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FailedDelivery", failedDeliverySchema);
