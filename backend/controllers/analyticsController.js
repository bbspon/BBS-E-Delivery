const Order = require("../models/Order");

exports.getDeliveryAnalytics = async (req, res) => {
  try {
    const allOrders = await Order.find();

    const summary = {
      totalOrders: allOrders.length,
      delivered: allOrders.filter((o) => o.status === "Delivered").length,
      failed: allOrders.filter((o) => o.status === "Failed").length,
      statusBreakdown: [],
    };

    const statusMap = {};
    allOrders.forEach((o) => {
      statusMap[o.status] = (statusMap[o.status] || 0) + 1;
    });

    for (let [status, value] of Object.entries(statusMap)) {
      summary.statusBreakdown.push({ status, value });
    }

    const agentStatsMap = {};
    allOrders.forEach((order) => {
      const a = order.agentId || "Unassigned";
      if (!agentStatsMap[a]) {
        agentStatsMap[a] = { agentId: a, delivered: 0, failed: 0 };
      }
      if (order.status === "Delivered") agentStatsMap[a].delivered++;
      if (order.status === "Failed") agentStatsMap[a].failed++;
    });

    const agentStats = Object.values(agentStatsMap);

    res.json({ summary, agentStats });
  } catch (err) {
    console.error("Analytics error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
