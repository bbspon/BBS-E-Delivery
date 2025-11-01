const express = require("express");
const router = express.Router();
const path = require("path");

const controller = require("../controllers/assignedOrdersController");
const serviceToken = require("../middlewares/serviceToken");
 const { upload } = require("../middlewares/upload");

 console.log("[routes] assignedOrdersRoutes loaded");

router.get("/health", (req, res) => res.status(200).json({ ok: true }));
router.get("/v1/delivery/orders", serviceToken, controller.list);
router.options("/v1/delivery/orders/:orderId/status", (req, res) =>
  res.sendStatus(200)
);

router.patch(
  "/v1/delivery/orders/:orderId/status",
  serviceToken,
  controller.patchStatus
);
// BBSCART -> E-Delivery ingestion (Module-1)
router.post("/v1/delivery/orders", serviceToken, controller.createFromBbscart);
router.patch("/v1/delivery/orders/:orderId", serviceToken, controller.updateFromBbscart);

// GET all orders
router.get("/", controller.getAllAssignedOrders);

// POST create (testing/demo)
router.post("/", controller.createAssignedOrder);

// PUT mark as delivered
router.put("/mark-delivered/:orderId", controller.markAsDelivered);
// Public serviceability + slots
router.get("/public/serviceability/:pincode", controller.getServiceability);
router.get("/public/slots/:pincode", controller.getSlotsForPincode);
// DELETE
router.delete("/:orderId", controller.deleteAssignedOrder);
 router.post(
   "/v1/delivery/orders/:orderId/proofs",
  serviceToken,
   upload.array("files", 4),
 controller.uploadProofs
 );
 router.get("/public/track/:trackingId", controller.publicTrack);
// Simple HTML viewer (no auth): serves /public/track.html
router.get("/track/:tid", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "track.html"));
});
module.exports = router;
