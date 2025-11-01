const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customer: String,
  mobile: String,
  address: {
    line1: String,
    city: String,
    state: String,
    postalCode: String,
    digiPIN: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  items: [{ name: String, quantity: Number, price: Number }],
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Out for Delivery", "Delivered", "Failed"],
    default: "Pending",
  },
  assignedAgentId: String,
  eta: String,
  deliveryTime: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
