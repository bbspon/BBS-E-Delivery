const crypto = require("crypto");
const AssignedOrder = require("../models/assignedOrders");
const mongoose = require("mongoose");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const ServiceabilityZone = require("../models/ServiceabilityZone");
const path = require("path");
const allowedNext = {
  CREATED: new Set(["ACCEPTED", "PICKED_UP"]), // allow ACCEPTED if you use it
  ACCEPTED: new Set(["PICKED_UP"]),
  PICKED_UP: new Set(["DELIVERED"]),
  DELIVERED: new Set([]),
  CANCELED: new Set([]),
};
// const { notifyBbscart } = require("../lib/notifyBbscart");


// ---------- helpers ----------
function isNowPastCutoff(timeHHmm) {
  if (!timeHHmm) return false;
  const now = dayjs();
  const [h, m] = timeHHmm.split(":").map(Number);
  const cutoff = now.hour(h).minute(m).second(0).millisecond(0);
  return now.isAfter(cutoff);
}

function withinLeadWindow(dateISO, slot) {
  const target = dayjs(dateISO).startOf("day");
  const today = dayjs().startOf("day");
  const diff = target.diff(today, "day");
  if (diff < slot.leadDaysMin) return false;
  if (diff > slot.leadDaysMax) return false;
  return true;
}

function isAllowedWeekday(dateISO, slot) {
  const dow = dayjs(dateISO).day(); // 0..6
  return slot.daysOfWeek.includes(dow);
}

function buildDailySlotInstances(zone) {
  // produce slots for a window (today .. today+7) with cutoff and lead filters
  const today = dayjs().startOf("day");
  const horizon = 14; // days ahead
  const out = [];
  for (let d = 0; d <= horizon; d++) {
    const date = today.add(d, "day");
    for (const slot of zone.slots) {
      const instance = {
        id: slot.id,
        label: slot.label,
        start: slot.start,
        end: slot.end,
        date: date.format("YYYY-MM-DD")
      };
      // lead days check
      if (!withinLeadWindow(instance.date, slot)) continue;
      // weekday check
      if (!isAllowedWeekday(instance.date, slot)) continue;
      // same-day cutoff
      if (date.isSame(today) && isNowPastCutoff(slot.sameDayCutoff)) continue;
      // next-day cutoff (optional)
      if (date.isSame(today.add(1, "day")) && isNowPastCutoff(slot.nextDayCutoff)) continue;

      out.push(instance);
    }
  }
  return out;
}

// exportable validator for createFromBbscart
exports.validateRequestedSlot=async({ pincode, requestedSlot }) =>{
  // requestedSlot: { id, label, start, end, date }
  if (!requestedSlot || !requestedSlot.id || !requestedSlot.date) {
    return { ok: false, reason: "MISSING_SLOT_FIELDS" };
  }
  const zone = await ServiceabilityZone.findOne({ pincode, active: true }).lean();
  if (!zone) return { ok: false, reason: "PINCODE_NOT_SERVICEABLE" };

  const baseDef = zone.slots.find(s => s.id === requestedSlot.id);
  if (!baseDef) return { ok: false, reason: "SLOT_ID_INVALID" };

  if (!withinLeadWindow(requestedSlot.date, baseDef)) {
    return { ok: false, reason: "OUT_OF_LEAD_WINDOW" };
  }
  if (!isAllowedWeekday(requestedSlot.date, baseDef)) {
    return { ok: false, reason: "WEEKDAY_NOT_ALLOWED" };
  }

  const today = dayjs().startOf("day");
  const target = dayjs(requestedSlot.date, "YYYY-MM-DD").startOf("day");
  if (target.isSame(today) && isNowPastCutoff(baseDef.sameDayCutoff)) {
    return { ok: false, reason: "AFTER_SAME_DAY_CUTOFF" };
  }
  if (target.isSame(today.add(1, "day")) && isNowPastCutoff(baseDef.nextDayCutoff)) {
    return { ok: false, reason: "AFTER_NEXT_DAY_CUTOFF" };
  }

  // optional: capacity check could query an AssignedOrder aggregate for that date+slot.id
  return { ok: true, slot: requestedSlot };
}

// ---------- public endpoints ----------
exports.getServiceability=async (req, res) =>{
  try {
    const { pincode } = req.params;
    const zone = await ServiceabilityZone.findOne({ pincode }).lean();
    res.json({
      ok: true,
      data: {
        pincode,
        serviceable: !!(zone && zone.active),
        city: zone?.city || null,
        state: zone?.state || null,
        country: zone?.country || "IN"
      }
    });
  } catch (err) {
    console.error("[serviceability]", err);
    res.status(500).json({ ok: false, error: "SERVER_ERROR" });
  }
}

exports.getSlotsForPincode = async(req, res)=> {
  try {
    const { pincode } = req.params;
    const zone = await ServiceabilityZone.findOne({ pincode, active: true }).lean();
    if (!zone) return res.json({ ok: true, data: { pincode, slots: [] } });

    const instances = buildDailySlotInstances(zone);
    res.json({ ok: true, data: { pincode, slots: instances } });
  } catch (err) {
    console.error("[slots]", err);
    res.status(500).json({ ok: false, error: "SERVER_ERROR" });
  }
}
exports.getAllAssignedOrders = async (req, res) => {
  try {
    const orders = await AssignedOrder.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

// MARK order as delivered
exports.markAsDelivered = async (req, res) => {
  const { orderId } = req.params;
  try {
    const updatedOrder = await AssignedOrder.findOneAndUpdate(
      { orderId },
      { status: "Delivered" },
      { new: true }
    );
    if (!updatedOrder)
      return res.status(404).json({ error: "Order not found" });
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: "Failed to update order" });
  }
};

// POST: Add new assigned order (for testing / seeding)
exports.createAssignedOrder = async (req, res) => {
  payload.deliverySlot = v.slot;

  try {
    const newOrder = new AssignedOrder(doc);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Failed to create order", details: err.message });
  }
};

// DELETE
exports.deleteAssignedOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    await AssignedOrder.findOneAndDelete({ orderId });
    res.status(200).json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete" });
  }
};

exports.list = async (req, res) => {
  try {
    const docs = await AssignedOrder.find({}).sort({ time: -1 }).lean();

    const rows = docs.map((d) => ({
      _id: String(d._id),
      orderId: d.orderId,
      destination: d.destination || {},
      items: Array.isArray(d.items) ? d.items : [],
      time: d.time,
      status: d.status || "CREATED",
    }));

    return res.status(200).json(rows);
  } catch (e) {
    console.error("[assigned-orders] list error:", e.message);
    return res.status(500).json({ error: "failed to list" });
  }
};
exports.createFromBbscart = async (req, res) => {
  try {
    console.log("[ingest] body:", JSON.stringify(req.body));

    const dest = req.body?.destination || {};
    const itemsArr = Array.isArray(req.body?.items) ? req.body.items : [];

    const doc = {
      orderId: req.body.orderId,
      destination: {
        name: dest.name || "",
        phone: dest.phone || "", // allow empty
        address1: dest.address1 || "",
        address2: dest.address2 || "",
        city: dest.city || "",
        state: dest.state || "",
        pincode: dest.pincode || "",
        country: dest.country || "IN",
      },
      items: itemsArr.map((i) => ({
        sku: String(i.sku || ""),
        name: i.name || i.title || "",
        qty: Number(i.qty || i.quantity || 1),
        price: i.price != null ? Number(i.price) : undefined,
      })),
      time: new Date(),
      cod: {
        isCOD: !!req.body?.cod?.isCOD,
        amount: req.body?.cod?.isCOD ? Number(req.body?.cod?.amount || 0) : 0,
      },
      // status uses schema default
    };

    // Hard guards with loud logs (relaxed: phone not required)
    if (!doc.orderId) {
      console.log("[ingest] 400: missing orderId");
      return res.status(400).json({ error: "orderId is required" });
    }
    if (!doc.items.length) {
      console.log("[ingest] 400: empty items[]");
      return res.status(400).json({ error: "items array is required" });
    }
    if (
      !doc.destination.name ||
      !doc.destination.address1 ||
      !doc.destination.city ||
      !doc.destination.pincode
    ) {
      console.log("[ingest] 400: missing addr fields", {
        name: !!doc.destination.name,
        address1: !!doc.destination.address1,
        city: !!doc.destination.city,
        pincode: !!doc.destination.pincode,
      });
      return res.status(400).json({
        error: "destination fields missing (name, address1, city, pincode)",
      });
    }

    // Idempotency first
    const existing = await AssignedOrder.findOne({
      orderId: doc.orderId,
    }).lean();
    if (existing) {
      console.log("[ingest] existing:", doc.orderId, "->", existing._id);
      const fresh = await AssignedOrder.findOne({
        orderId: doc.orderId,
      }).lean();
      return res.status(200).json({
        ok: true,
        data: {
          _id: String(fresh._id),
          trackingId: fresh.trackingId,
          status: fresh.status,
        },
      });
    }

    // Create new
    const saved = await new AssignedOrder(doc).save();
    console.log("[ingest] created:", saved.orderId, "->", saved._id);

    const fresh = await AssignedOrder.findOne({
      orderId: saved.orderId,
    }).lean();
    return res.status(200).json({
      ok: true,
      data: {
        _id: String(fresh._id),
        trackingId: fresh.trackingId,
        status: fresh.status,
      },
    });
  } catch (err) {
    console.error("[ingest] createFromBbscart error:", err);
    return res.status(500).json({ error: "Failed to create delivery job" });
  }
};

exports.patchStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (
      !status ||
      !["CREATED", "ACCEPTED", "PICKED_UP", "DELIVERED", "CANCELED"].includes(
        status
      )
    ) {
      return res.status(400).json({ ok: false, error: "Invalid status" });
    }

    const or = [{ orderId }];
    if (mongoose.isValidObjectId(orderId)) or.push({ _id: orderId });

    const doc = await AssignedOrder.findOne({ $or: or });
    if (!doc)
      return res.status(404).json({ ok: false, error: "Order not found" });

    const current = doc.status || "CREATED";
    if (current === status) {
      return res.status(200).json({ ok: true, data: doc, info: "No change" });
    }

    const nextSet = allowedNext[current] || new Set();
    if (!nextSet.has(status)) {
      return res.status(409).json({
        ok: false,
        error: `Invalid transition: ${current} → ${status}`,
        allowedNext: Array.from(nextSet),
      });
    }

    const now = new Date();

    const updated = await AssignedOrder.findOneAndUpdate(
      { $or: or },
      {
        $set: {
          status,
          updatedAt: now,
          "timeline.lastUpdate": { status, at: now },
        },
        $push: { timeline: { status, at: now, by: "system" } },
      },
      { new: true }
    );

    return res.status(200).json({ ok: true, data: updated });
  } catch (err) {
    console.error("patchStatus error", err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
};
exports.updateFromBbscart = async (req, res) => {
  try {
    const { orderId } = req.params;
    if (!orderId) return res.status(400).json({ error: "orderId is required" });

    const patch = {};
    if (req.body?.destination) {
      const d = req.body.destination;
      patch.destination = {
        name: d.name,
        phone: d.phone,
        address1: d.address1,
        address2: d.address2,
        city: d.city,
        pincode: d.pincode,
        state: d.state,
        country: d.country || "IN",
      };
    }
    if (req.body?.cancel === true) patch.status = "CANCELED";

    const updated = await AssignedOrder.findOneAndUpdate(
      { orderId, status: { $in: ["CREATED", "ACCEPTED"] } }, // removable gate if not needed
      { $set: patch },
      { new: true }
    );
    const fresh = await AssignedOrder.findOne({ orderId }).lean();
    return res.status(200).json({
      ok: true,
      data: {
        _id: String(fresh._id),
        trackingId: fresh.trackingId,
        status: fresh.status,
      },
    });
  } catch (err) {
    console.error("[ingest] updateFromBbscart error:", err);
    return res.status(500).json({ error: "Failed to update delivery job" });
  }
};
exports.uploadProofs = async (req, res) => {
  try {
    const { orderId } = req.params;
    const proofTypeRaw = (req.body.proofType || "").toLowerCase();
    const notes = req.body.notes || "";

    const proofType =
      proofTypeRaw === "pickup"
        ? "pickup"
        : proofTypeRaw === "delivery"
        ? "delivery"
        : null;
    if (!proofType) {
      return res
        .status(400)
        .json({ ok: false, error: "proofType must be pickup or delivery" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ ok: false, error: "No files uploaded" });
    }

    const urls = req.files.map((f) => `/uploads/${path.basename(f.path)}`);

    const doc = await AssignedOrder.findOneAndUpdate(
      {
        $or: [
          { orderId },
          ...(mongoose.isValidObjectId(orderId) ? [{ _id: orderId }] : []),
        ],
      },
      {
        $push: {
          proofs: {
            $each: urls.map((u) => ({ type: proofType, url: u, notes })),
          },
        },
      },
      { new: true }
    );

    if (!doc) {
      return res.status(404).json({ ok: false, error: "Order not found" });
    }

    return res.status(200).json({ ok: true, data: { proofs: doc.proofs } });
  } catch (err) {
    console.error("uploadProofs error", err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
};
exports.publicTrack = async (req, res) => {
  try {
    const tid = req.params.trackingId || req.params.tid;

    const doc = await AssignedOrder.findOne({ trackingId: tid }).lean();

    if (!doc) return res.status(404).json({ ok: false, error: "Not found" });

    // Only expose safe, customer-facing data
    const payload = {
      trackingId: doc.trackingId,
      orderIdMasked: doc.orderId
        ? doc.orderId.replace(/^(.{3}).+(.{3})$/, "$1***$2")
        : "N/A",
      status: doc.status || "CREATED",
      promiseSlot: doc.promiseSlot || null,
      destination: {
        city: doc.destination?.city,
        pincode: doc.destination?.pincode,
      },
      timeline: (doc.timeline || []).map((t) => ({
        status: t.status,
        at: t.at,
        note: t.note || undefined,
      })),
      // Show only delivery proofs to the customer
      proofs: (doc.proofs || [])
        .filter((p) => p.type === "delivery")
        .map((p) => ({ type: p.type, url: p.url, at: p.at })),
      updatedAt: doc.updatedAt,
    };

    return res.status(200).json({ ok: true, data: payload });
  } catch (err) {
    console.error("publicTrack error", err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
};
