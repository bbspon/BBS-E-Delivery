const express = require("express");
const router = express.Router();
const mapController = require("../controllers/mapController");

router.get("/order/:orderId", mapController.getOrderById);
router.get("/agent/:agentId", mapController.getAgentById);

module.exports = router;
