const mongoose = require("mongoose");
const crypto = require("crypto");
const AssignedOrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    destination: {
      name: { type: String, required: true },
      phone: { type: String },
      address1: { type: String, required: true },
      address2: { type: String },
      city: { type: String, required: true },
      pincode: { type: String, required: true },
      state: { type: String },
      country: { type: String, default: "IN" },
    },
    items: [
      {
        sku: { type: String, required: true },
        name: { type: String },
        qty: { type: Number, required: true, min: 1 },
        price: { type: Number },
      },
    ],
    time: { type: Date, default: Date.now, required: true },
    cod: {
      isCOD: { type: Boolean, default: false },
      amount: { type: Number, default: 0 },
    },
    trackingId: { type: String, index: true, unique: true },
    proofs: [
      {
        type: { type: String, enum: ["pickup", "delivery"], required: true },
        url: { type: String, required: true },
        notes: { type: String },
        at: { type: Date, default: Date.now },
        by: { type: String, default: "agent" },
      },
    ],
    status: {
      type: String,
      enum: ["CREATED", "ACCEPTED", "PICKED_UP", "DELIVERED", "CANCELED"],
      default: "CREATED",
      required: true,
    },
  },
  { timestamps: true }
);
// Generate a URL-safe trackingId if missing
AssignedOrderSchema.pre("save", function (next) {
  if (!this.trackingId) {
    this.trackingId = crypto.randomBytes(16).toString("base64url").slice(0, 22);
  }
  next();
});

// Ensure unique index (safe to call even if already present)
AssignedOrderSchema.index({ trackingId: 1 }, { unique: true });

module.exports = mongoose.model("AssignedOrder", AssignedOrderSchema);
