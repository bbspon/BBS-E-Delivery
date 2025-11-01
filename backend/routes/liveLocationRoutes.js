const express = require("express");
const router = express.Router();
const {
  updateLocation,
  getLocation,
} = require("../controllers/liveLocationController");

router.post("/update", updateLocation);
router.get("/:agentId", getLocation);

module.exports = router;
