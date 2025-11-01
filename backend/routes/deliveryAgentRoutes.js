const express = require("express");
const router = express.Router();
const deliveryAgentController = require("../controllers/deliveryAgentController");
const orderController = require("../controllers/orderController");
const earningsController = require("../controllers/earningsController");

// Profile
router.get("/profile/:agentId", deliveryAgentController.getAgentProfile);
router.get("/dashboard/:agentId", deliveryAgentController.getDashboardData);

// Orders
router.get("/orders/:agentId", orderController.getOrdersByAgent);
router.put("/orders/mark-delivered/:orderId", orderController.markAsDelivered);

// Earnings
router.get("/earnings/:agentId", earningsController.getEarningsByAgent);

module.exports = router;
