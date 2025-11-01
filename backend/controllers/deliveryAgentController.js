const DeliveryAgent = require("../models/deliveryAgent");

exports.getAgentProfile = async (req, res) => {
  try {
    const agent = await DeliveryAgent.findById(req.params.agentId);
    res.json(agent);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch agent profile" });
  }
};
exports.getDashboardData = async (req, res) => {
  try {
    const { agentId } = req.params;

    // Total orders by this agent
    const totalOrders = await Order.countDocuments({ agentId });

    // Total earnings by this agent
    const earningsDoc = await Earnings.findOne({ agentId });
    const totalEarnings = earningsDoc ? earningsDoc.totalEarnings : 0;

    res.status(200).json({
      totalOrders,
      totalEarnings,
    });
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
};