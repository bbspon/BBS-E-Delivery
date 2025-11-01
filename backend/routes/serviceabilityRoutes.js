// routes/serviceabilityRoutes.js
const express = require("express");
const router = express.Router();
const svc = require("../controllers/serviceabilityController");

// Reuse your token pattern for admin writes
function tokenGuard(req, res, next) {
  try {
    const hdr = req.headers.authorization || "";
    const token = hdr.startsWith("Bearer ") ? hdr.slice(7) : null;
    if (!token || token !== process.env.DELIVERY_INGEST_TOKEN) {
      return res.status(401).json({ ok: false, error: "unauthorized" });
    }
    return next();
  } catch (e) {
    return res.status(401).json({ ok: false, error: "unauthorized" });
  }
}

// Public endpoints (no auth)
router.get("/public/serviceability/:pincode", svc.publicServiceability);
router.get("/public/slots/:pincode", svc.publicSlots);

// Admin/config endpoints (protected by DELIVERY_INGEST_TOKEN)
router.post("/v1/zones", tokenGuard, express.json(), svc.upsertZone);
router.get("/v1/zones/:pincode", tokenGuard, svc.getZone);

module.exports = router;
