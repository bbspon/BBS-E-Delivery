const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema(
  {
    id: { type: String, required: true }, // e.g., "AM", "PM", "SLOT_10_12"
    label: { type: String, required: true }, // e.g., "Morning 9–12"
    start: { type: String, required: true }, // "09:00"
    end: { type: String, required: true }, // "12:00"
    daysOfWeek: { type: [Number], default: [0, 1, 2, 3, 4, 5, 6] }, // 0=Sun ... 6=Sat
    capacity: { type: Number, default: 9999 }, // soft cap per day
    sameDayCutoff: { type: String, default: null }, // "HH:mm" local time; if set, forbid same-day after cutoff
    nextDayCutoff: { type: String, default: null }, // optional if you want to prevent next-day after time
    leadDaysMin: { type: Number, default: 0 }, // minimum days from today
    leadDaysMax: { type: Number, default: 7 }, // maximum days from today
  },
  { _id: false }
);

const ServiceabilityZoneSchema = new mongoose.Schema(
  {
    pincode: { type: String, required: true, index: true, unique: true },
    active: { type: Boolean, default: true },
    city: { type: String },
    state: { type: String },
    country: { type: String, default: "IN" },
    slots: { type: [SlotSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceabilityZone", ServiceabilityZoneSchema);
