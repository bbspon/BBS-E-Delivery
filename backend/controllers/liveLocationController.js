const AgentLocation = require("../models/agentLocation");

exports.updateLocation = async (req, res) => {
  const { agentId, latitude, longitude } = req.body;
  try {
    const updated = await AgentLocation.findOneAndUpdate(
      { agentId },
      { latitude, longitude, updatedAt: new Date() },
      { upsert: true, new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Location update failed", details: err });
  }
};

exports.getLocation = async (req, res) => {
  try {
    const data = await AgentLocation.findOne({ agentId: req.params.agentId });
    if (!data) return res.status(404).json({ error: "No location found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching location", details: err });
  }
};
