const express = require("express");
const router = express.Router();
const { getDeliveryAnalytics } = require("../controllers/analyticsController");

router.get("/", getDeliveryAnalytics);

module.exports = router;
