const Feedback = require("../models/feedback");

// @desc Create new feedback
exports.createFeedback = async (req, res) => {
  try {
    const { orderId, agentId, customer, rating, comments } = req.body;

    if (!orderId || !agentId || !customer || !rating) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    const feedback = new Feedback({
      orderId,
      agentId,
      customer,
      rating,
      comments,
    });
    await feedback.save();

    res.status(201).json({ message: "Feedback submitted", data: feedback });
  } catch (err) {
    console.error("Create Feedback Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc Get feedback by Order ID or Agent ID
exports.getFeedback = async (req, res) => {
  try {
    const { orderId, agentId } = req.query;

    const filter = {};
    if (orderId) filter.orderId = orderId;
    if (agentId) filter.agentId = agentId;

    const feedbacks = await Feedback.find(filter).sort({ createdAt: -1 });

    res.status(200).json(feedbacks);
  } catch (err) {
    console.error("Get Feedback Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
