const { generateDigiPINFromData } = require("../utils/digipinGenerator");

exports.resolveAddress = async (req, res) => {
  try {
    const { address, pincode, lat, lng } = req.body;

    // Dummy address resolution logic (replace with external geocode API if needed)
    const resolved = {
      line1: address || "Unknown",
      city: "Puducherry",
      state: "Puducherry",
      postalCode: pincode || "605001",
      coordinates: {
        lat: lat || 11.9416,
        lng: lng || 79.8083,
      },
    };

    res.status(200).json({ success: true, resolved });
  } catch (err) {
    console.error("Address resolution error:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to resolve address" });
  }
};

exports.generateDigiPIN = async (req, res) => {
  try {
    const { address, city, state, postalCode, index = "001" } = req.body;

    if (!city || !state || !postalCode) {
      return res
        .status(400)
        .json({ success: false, message: "Missing data for DigiPIN" });
    }

    const digiPIN = generateDigiPINFromData(city, state, postalCode, index);
    res.status(200).json({ success: true, digiPIN });
  } catch (err) {
    console.error("DigiPIN generation error:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to generate DigiPIN" });
  }
};

exports.saveResolvedAddress = async (req, res) => {
  try {
    const { resolved, digiPIN } = req.body;

    // Optional: save to DB, here we simulate a save
    const savedRecord = {
      ...resolved,
      digiPIN,
      savedAt: new Date(),
    };

    res.status(200).json({ success: true, saved: savedRecord });
  } catch (err) {
    console.error("Save error:", err);
    res.status(500).json({ success: false, message: "Failed to save address" });
  }
};
