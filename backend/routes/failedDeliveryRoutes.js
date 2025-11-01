const express = require("express");
const router = express.Router();
const failedDeliveryController = require("../controllers/failedDeliveryController");

// Optional middleware (auth)
// const { verifyToken } = require('../middlewares/authMiddleware');

router.get("/", failedDeliveryController.getAllFailedDeliveries);
router.post("/", failedDeliveryController.logFailedDelivery);
router.put("/:id/retry", failedDeliveryController.retryDelivery);

module.exports = router;
