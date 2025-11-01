const express = require("express");
const router = express.Router();
const {
  getOptimizedRoutes,
} = require("../controllers/routeOptimizationController");

router.get("/optimized", getOptimizedRoutes);

module.exports = router;
