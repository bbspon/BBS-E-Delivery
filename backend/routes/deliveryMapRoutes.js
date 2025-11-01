const express = require("express");
const router = express.Router();
const mapController = require("../controllers/deliveryMapController");

router.get("/agents", mapController.getAgents);
router.get("/orders", mapController.getOrders);

module.exports = router;
