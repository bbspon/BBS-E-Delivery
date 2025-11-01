const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

// POST: Submit feedback
router.post("/", feedbackController.createFeedback);

// GET: View feedback (by orderId or agentId)
router.get("/", feedbackController.getFeedback);

module.exports = router;
