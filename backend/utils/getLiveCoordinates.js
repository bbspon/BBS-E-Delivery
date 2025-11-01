const getLiveCoordinates = (digiPin) => {
  if (!digiPin || typeof digiPin !== "string") {
    return { lat: 0, lng: 0 }; // fallback default
  }

  const baseLat = 12.9716;
  const baseLng = 77.5946;
  const offset = parseInt(digiPin.slice(-1)) * 0.01 || 0;

  return {
    lat: baseLat + offset,
    lng: baseLng + offset,
  };
};

module.exports = getLiveCoordinates;
