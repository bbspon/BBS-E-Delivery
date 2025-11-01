const Order = require("../models/Order");
const Agent = require("../models/deliveryAgent");

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order || !order.address || !order.address.coordinates) {
      return res
        .status(404)
        .json({ message: "Order not found or no coordinates" });
    }
    res.json({
      orderId: order.orderId,
      coordinates: order.address.coordinates,
      digiPIN: order.address.digiPIN,
    });
  } catch (error) {
    console.error("Order map fetch error", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAgentById = async (req, res) => {
  try {
    const agent = await Agent.findOne({ agentId: req.params.agentId });
    if (!agent || !agent.location) {
      return res
        .status(404)
        .json({ message: "Agent not found or no location" });
    }
    res.json({
      agentId: agent.agentId,
      coordinates: agent.location,
    });
  } catch (error) {
    console.error("Agent map fetch error", error);
    res.status(500).json({ message: "Server error" });
  }
};
