const mongoose = require("mongoose");

const deliveryHistorySchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    address: { type: String, required: true },
    deliveredOn: { type: Date, required: true },
    status: { type: String, enum: ["Delivered", "Failed"], required: true },
    earning: { type: Number, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DeliveryHistory", deliveryHistorySchema);
