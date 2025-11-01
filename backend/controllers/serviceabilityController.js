// controllers/serviceabilityController.js
const ServiceabilityZone = require("../models/ServiceabilityZone");

// Helper: get “now” in IST and compose date+minutes as Date
function nowIST() {
  const now = new Date();
  // IST = UTC+5:30
  const istOffsetMin = 330;
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + istOffsetMin * 60000);
}

function composeIST(dateStr, minutesSinceMidnight) {
  // dateStr = "YYYY-MM-DD"
  const [y, m, d] = dateStr.split("-").map(Number);
  // Build UTC then add IST offset so JS Date stays correct across environments
  const istOffsetMin = 330;
  const baseUTC = Date.UTC(y, m - 1, d, 0, 0, 0);
  const t = baseUTC - istOffsetMin * 60000 + minutesSinceMidnight * 60000;
  return new Date(t);
}

function isBlackout(dateStr, zone) {
  return (
    Array.isArray(zone.blackoutDates) && zone.blackoutDates.includes(dateStr)
  );
}

function isWeekdayOpen(dateObj, slotWeekdays) {
  const dow = dateObj.getDay(); // 0..6
  return slotWeekdays.includes(dow);
}

// PUBLIC: GET /public/serviceability/:pincode
exports.publicServiceability = async (req, res) => {
  try {
    const { pincode } = req.params;
    const zone = await ServiceabilityZone.findOne({ pincode }).lean();

    if (!zone) {
      return res.json({
        ok: true,
        data: { pincode, isServiceable: false, reason: "PIN not configured" },
      });
    }

    return res.json({
      ok: true,
      data: {
        pincode,
        isServiceable: !!zone.isServiceable,
        city: zone.city || null,
        state: zone.state || null,
        hasSlots: Array.isArray(zone.slots) && zone.slots.length > 0,
      },
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};

// PUBLIC: GET /public/slots/:pincode?date=YYYY-MM-DD
exports.publicSlots = async (req, res) => {
  try {
    const { pincode } = req.params;
    const dateStr = (req.query.date || "").trim();
    const todayIST = nowIST();
    const yyyy = todayIST.getFullYear();
    const mm = String(todayIST.getMonth() + 1).padStart(2, "0");
    const dd = String(todayIST.getDate()).padStart(2, "0");
    const targetDate = dateStr || `${yyyy}-${mm}-${dd}`;

    const zone = await ServiceabilityZone.findOne({ pincode }).lean();
    if (!zone || !zone.isServiceable) {
      return res.json({
        ok: true,
        data: { pincode, date: targetDate, available: [] },
      });
    }
    if (isBlackout(targetDate, zone)) {
      return res.json({
        ok: true,
        data: { pincode, date: targetDate, available: [] },
      });
    }

    const now = nowIST();
    const results = [];

    for (const s of zone.slots || []) {
      if (!s.isActive) continue;
      const start = composeIST(targetDate, s.startMinute);
      const end = composeIST(targetDate, s.endMinute);

      // weekday check
      if (
        !isWeekdayOpen(
          start,
          Array.isArray(s.weekdays) ? s.weekdays : [0, 1, 2, 3, 4, 5, 6]
        )
      ) {
        continue;
      }

      // cutoff check
      const cutoffMillis = (s.cutoffMinutesBeforeStart ?? 60) * 60000;
      const cutoffTime = new Date(start.getTime() - cutoffMillis);
      if (now > cutoffTime) {
        // missed cutoff
        continue;
      }

      results.push({
        code: s.code,
        label: s.label,
        startISO: start.toISOString(),
        endISO: end.toISOString(),
      });
    }

    return res.json({
      ok: true,
      data: { pincode, date: targetDate, available: results },
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};

// ADMIN (token): POST /v1/zones  (upsert by pincode)
exports.upsertZone = async (req, res) => {
  try {
    const payload = req.body || {};
    if (!payload.pincode)
      return res.status(400).json({ ok: false, error: "pincode required" });

    const update = {
      city: payload.city,
      state: payload.state,
      isServiceable: payload.isServiceable !== false,
      blackoutDates: Array.isArray(payload.blackoutDates)
        ? payload.blackoutDates
        : [],
      slots: Array.isArray(payload.slots) ? payload.slots : [],
      notes: payload.notes,
    };

    const doc = await ServiceabilityZone.findOneAndUpdate(
      { pincode: payload.pincode },
      { $set: update, $setOnInsert: { pincode: payload.pincode } },
      { upsert: true, new: true }
    );

    return res.json({ ok: true, data: doc });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};

// ADMIN (token): GET /v1/zones/:pincode
exports.getZone = async (req, res) => {
  try {
    const { pincode } = req.params;
    const zone = await ServiceabilityZone.findOne({ pincode }).lean();
    if (!zone) return res.status(404).json({ ok: false, error: "not found" });
    return res.json({ ok: true, data: zone });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};
