const DeliveryHistory = require("../models/deliveryHistory");

exports.getAllDeliveryHistory = async (req, res) => {
  try {
    const history = await DeliveryHistory.find().sort({ deliveredOn: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getDeliveryById = async (req, res) => {
  try {
    const delivery = await DeliveryHistory.findOne({
      orderId: req.params.orderId,
    });
    if (!delivery)
      return res.status(404).json({ message: "Delivery not found" });
    res.json(delivery);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.addDelivery = async (req, res) => {
  try {
    const newDelivery = new DeliveryHistory(req.body);
    await newDelivery.save();
    res
      .status(201)
      .json({ message: "Delivery history added", data: newDelivery });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteDelivery = async (req, res) => {
  try {
    await DeliveryHistory.deleteOne({ orderId: req.params.orderId });
    res.json({ message: "Delivery deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateDelivery = async (req, res) => {
  try {
    const updated = await DeliveryHistory.findOneAndUpdate(
      { orderId: req.params.orderId },
      req.body,
      { new: true }
    );
    res.json({ message: "Updated successfully", data: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
