const Order = require("../models/Order");

exports.getOrdersByAgent = async (req, res) => {
  try {
    const orders = await Order.find({
      agentId: req.params.agentId,
      isDelivered: false,
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

exports.markAsDelivered = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { isDelivered: true },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Failed to mark as delivered" });
  }
};
