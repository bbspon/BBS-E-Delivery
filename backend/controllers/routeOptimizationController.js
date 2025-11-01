const getOptimizedRoutes = async (req, res) => {
  try {
    // Dummy sorted based on assumed optimized path
    const optimized = [
      { lat: 11.936, lng: 79.833, label: "Suresh - Chennai" },
      { lat: 11.94, lng: 79.8, label: "Priya - T Nagar" },
      { lat: 11.92, lng: 79.82, label: "Ravi - Pondicherry" },
    ];
    res.json({ routes: optimized });    
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch optimized routes" });
  }
};

module.exports = { getOptimizedRoutes };
