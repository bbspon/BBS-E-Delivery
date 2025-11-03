const router = require("express").Router();
const {
  listReturnPickups,
  getReturnByRma,
  createReturnPickup,
  updateReturnStatus,
  addReturnProofs,
  trackReturnPublic,
} = require("../controllers/returnsController");

// Create & Ops
router.post("/v1/returns", createReturnPickup);
router.get("/v1/returns", listReturnPickups); // <-- add
router.get("/v1/returns/:rmaId", getReturnByRma); // <-- add
router.patch("/v1/returns/:rmaId/status", updateReturnStatus);
router.post("/v1/returns/:rmaId/proofs", addReturnProofs);

// Public tracking
router.get("/public/returns/track/:trackingId", trackReturnPublic);

module.exports = router;
