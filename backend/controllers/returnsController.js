const crypto = require("crypto");
const ReturnPickup = require("../models/ReturnPickup");
const { validateRequestedSlot } = require("./assignedOrdersController");
const ServiceabilityZone = require("../models/ServiceabilityZone");

function genTrackId() {
  return crypto.randomBytes(12).toString("base64url");
}

// LIST: /api/assigned-orders/v1/returns?status=&pincode=&date=&page=&limit=&q=
exports.listReturnPickups = async (req, res) => {
  try {
    const { status, pincode, date, page = 1, limit = 20, q } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (pincode) filter["pickupAddress.pincode"] = pincode;
    if (date) filter["pickupSlot.date"] = date;
    if (q) {
      filter.$or = [{ rmaId: q }, { originalOrderId: q }, { trackingId: q }];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      ReturnPickup.find(filter)
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      ReturnPickup.countDocuments(filter),
    ]);

    res.json({
      ok: true,
      page: Number(page),
      limit: Number(limit),
      total,
      items,
    });
  } catch (e) {
    console.error("[returns.list]", e);
    res.status(500).json({ ok: false, error: "SERVER_ERROR" });
  }
};

// GET: /api/assigned-orders/v1/returns/:rmaId
exports.getReturnByRma = async (req, res) => {
  try {
    const { rmaId } = req.params;
    const doc = await ReturnPickup.findOne({ rmaId }).lean();
    if (!doc) return res.status(404).json({ ok: false, error: "NOT_FOUND" });
    res.json({ ok: true, data: doc });
  } catch (e) {
    console.error("[returns.getByRma]", e);
    res.status(500).json({ ok: false, error: "SERVER_ERROR" });
  }
};

exports.createReturnPickup = async (req, res) => {
  try {
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
      data: { _id: doc._id, trackingId, status: doc.status, rmaId: doc.rmaId },
    });
  } catch (e) {
    console.error("[returns.create]", e);
    res.status(500).json({ ok: false, error: "SERVER_ERROR" });
  }
};

exports.updateReturnStatus = async (req, res) => {
    try {
      if (process.env.BBSCART_RETURNS_WEBHOOK && process.env.DELIVERY_WEBHOOK_TOKEN) {
        await fetch(process.env.BBSCART_RETURNS_WEBHOOK, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.DELIVERY_WEBHOOK_TOKEN}`,
          },
          body: JSON.stringify({
            rmaId,
            originalOrderId: upd.originalOrderId,
            status: upd.status,
            trackingId: upd.trackingId,
            timelineAdded: { code: status, note: note || "", payload },
          }),
        });
      }
    } catch (e) {
      console.warn("[returns.webhook] ", e.message);
    }
};

exports.addReturnProofs = async (req, res) => {
  try {
    const { rmaId } = req.params;
    const { proofs } = req.body;
    const upd = await ReturnPickup.findOneAndUpdate(
      { rmaId },
      {
        $push: {
          proofs: { $each: proofs || [] },
          timeline: {
            code: "PROOF_ADDED",
            note: `${proofs?.length || 0} proofs`,
            at: new Date(),
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
