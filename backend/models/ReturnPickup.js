const mongoose = require("mongoose");

const ProofSchema = new mongoose.Schema(
  {
    type: { type: String }, // "pickup_photo", "id_card", "signature"
    url: { type: String },
    at: { type: Date, default: Date.now },
  },
  { _id: false }
);

const TimelineSchema = new mongoose.Schema(
  {
    code: { type: String }, // "CREATED","ASSIGNED","OUT_FOR_PICKUP","PICKED","CANCELLED","FAILED"
    note: { type: String },
    at: { type: Date, default: Date.now },
  },
  { _id: false }
);

const ReturnPickupSchema = new mongoose.Schema(
  {
    rmaId: { type: String, index: true }, // e.g., "RMA_169..."
    originalOrderId: { type: String, index: true },
    orderIdMasked: { type: String },
    customerId: { type: String },
    items: [
      {
        orderItemId: String,
        sku: String,
        qty: Number,
      },
    ],
    reason: { type: String },
    pickupAddress: {
      name: String,
      phone: String,
      line1: String,
      line2: String,
      city: String,
      state: String,
      pincode: String,
    },
    pickupSlot: {
      id: String,
      label: String,
      start: String,
      end: String,
      date: String,
    },
    status: { type: String, default: "CREATED" },
    agentId: { type: String, default: null },
    trackingId: { type: String, unique: true }, // customer-visible return tracking
    timeline: { type: [TimelineSchema], default: [] },
    proofs: { type: [ProofSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ReturnPickup", ReturnPickupSchema);
