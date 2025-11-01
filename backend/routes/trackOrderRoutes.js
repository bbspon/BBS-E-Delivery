const express = require("express");
const router = express.Router();
const trackOrderController = require("../controllers/trackOrderController");
// const auth = require("../middlewares/authMiddleware");

router.get("/track/:orderId",trackOrderController.getOrderTrackingInfo);

module.exports = router;
