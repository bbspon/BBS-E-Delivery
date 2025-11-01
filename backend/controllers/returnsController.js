const crypto = require("crypto");
const ReturnPickup = require("../models/ReturnPickup");
const { validateRequestedSlot } = require("./assignedOrdersController");
const ServiceabilityZone = require("../models/ServiceabilityZone");

function genTrackId() {
  return crypto.randomBytes(12).toString("base64url");
}

exports.createReturnPickup = async (req, res) => {
  try {
    // Auth: same DELIVERY_INGEST_TOKEN used for forward orders
    const {
      rmaId,
      originalOrderId,
      orderIdMasked,
      customerId,
      items,
      reason,
      pickupAddress,
      pickupSlot,
    } = req.body;

    if (!pickupAddress?.pincode) {
      return res.status(400).json({ ok: false, error: "NO_PINCODE" });
    }
    // serviceability check for pickup pincode + slot
    const zone = await ServiceabilityZone.findOne({
      pincode: pickupAddress.pincode,
      active: true,
    }).lean();
    if (!zone)
      return res
        .status(400)
        .json({ ok: false, error: "PINCODE_NOT_SERVICEABLE" });

    const v = await validateRequestedSlot({
      pincode: pickupAddress.pincode,
      requestedSlot: pickupSlot,
    });
    if (!v.ok)
      return res
        .status(400)
        .json({ ok: false, error: "INVALID_SLOT", reason: v.reason });

    const trackingId = genTrackId();
    const doc = await ReturnPickup.create({
      rmaId,
      originalOrderId,
      orderIdMasked,
      customerId,
      items,
      reason,
      pickupAddress,
      pickupSlot: v.slot,
      trackingId,
      status: "CREATED",
      timeline: [{ code: "CREATED", note: "Return created" }],
    });

    return res.json({
      ok: true,
      data: { _id: doc._id, trackingId, status: doc.status },
    });
  } catch (e) {
    console.error("[returns.create]", e);
    res.status(500).json({ ok: false, error: "SERVER_ERROR" });
  }
};

exports.updateReturnStatus = async (req, res) => {
  try {
    const { rmaId } = req.params;
    const { status, note } = req.body; // "ASSIGNED","OUT_FOR_PICKUP","PICKED","FAILED","CANCELLED"
    const upd = await ReturnPickup.findOneAndUpdate(
      { rmaId },
      { $set: { status }, $push: { timeline: { code: status, note } } },
      { new: true }
    );
    if (!upd) return res.status(404).json({ ok: false, error: "NOT_FOUND" });

    // webhook to BBSCART
    try {
      const axios = require("axios");
      await axios.post(
        process.env.BBSCART_RETURNS_WEBHOOK,
        {
          rmaId,
          originalOrderId: upd.originalOrderId,
          status,
          trackingId: upd.trackingId,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.DELIVERY_WEBHOOK_TOKEN}`,
          },
        }
      );
    } catch (e) {
      console.warn("[returns.webhook] ", e.message);
    }

    res.json({ ok: true, data: { status: upd.status } });
  } catch (e) {
    console.error("[returns.updateStatus]", e);
    res.status(500).json({ ok: false, error: "SERVER_ERROR" });
  }
};

exports.addReturnProofs = async (req, res) => {
  try {
    const { rmaId } = req.params;
    const { proofs } = req.body; // array of {type,url}
    const upd = await ReturnPickup.findOneAndUpdate(
      { rmaId },
      {
        $push: {
          proofs: { $each: proofs || [] },
          timeline: {
            code: "PROOF_ADDED",
            note: `${proofs?.length || 0} proofs`,
          },
        },
      },
      { new: true }
    );
    if (!upd) return res.status(404).json({ ok: false, error: "NOT_FOUND" });
    res.json({ ok: true, data: { proofs: upd.proofs } });
  } catch (e) {
    console.error("[returns.addProofs]", e);
    res.status(500).json({ ok: false, error: "SERVER_ERROR" });
  }
};

exports.trackReturnPublic = async (req, res) => {
  try {
    const { trackingId } = req.params;
    const doc = await ReturnPickup.findOne({ trackingId }).lean();
    if (!doc) return res.status(404).json({ ok: false, error: "NOT_FOUND" });
    res.json({
      ok: true,
      data: {
        trackingId: doc.trackingId,
        rmaId: doc.rmaId,
        status: doc.status,
        pickupAddress: {
          city: doc.pickupAddress?.city,
          pincode: doc.pickupAddress?.pincode,
        },
        pickupSlot: doc.pickupSlot,
        timeline: doc.timeline,
        proofs: doc.proofs,
      },
    });
  } catch (e) {
    res.status(500).json({ ok: false, error: "SERVER_ERROR" });
  }
};
