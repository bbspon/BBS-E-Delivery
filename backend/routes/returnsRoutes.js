const router = require("express").Router();
const {
  createReturnPickup,
  updateReturnStatus,
  addReturnProofs,
  trackReturnPublic,
} = require("../controllers/returnsController");

// secure ingest (same middleware as forward orders if you have one)
router.post("/v1/returns", createReturnPickup);
router.patch("/v1/returns/:rmaId/status", updateReturnStatus);
router.post("/v1/returns/:rmaId/proofs", addReturnProofs);

// public tracking
router.get("/public/returns/track/:trackingId", trackReturnPublic);

module.exports = router;
