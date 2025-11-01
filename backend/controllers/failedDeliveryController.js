const Order = require("../models/Order"); // <-- import Order

// GET all failed deliveries
exports.getAllFailedDeliveries = async (req, res) => {
  try {
    const records = await Order.find({ status: "Failed" }).sort({
      deliveryDate: -1,
    });
    res.json(records);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
// POST a new failed delivery
exports.logFailedDelivery = async (req, res) => {
  try {
    const newEntry = new FailedDelivery(req.body);
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    console.error("Save error:", err);
    res.status(400).json({ error: "Invalid data" });
  }
};

// PUT retry status update
exports.retryDelivery = async (req, res) => {
  try {
    const updated = await FailedDelivery.findByIdAndUpdate(
      req.params.id,
      { status: "Retried" },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
