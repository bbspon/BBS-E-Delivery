const Earning = require("../models/earnings");

exports.getEarningsByAgent = async (req, res) => {
  try {
    const earning = await Earning.findOne({ agentId: req.params.agentId });
    res.json(earning);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch earnings" });
  }
};
