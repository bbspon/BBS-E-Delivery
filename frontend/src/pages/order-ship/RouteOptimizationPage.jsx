import React, { useEffect, useState } from "react";
import axios from "axios";

const RouteOptimizationPage = () => {
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/routes/optimized"
        );
        setRoutes(res.data.routes);
        loadRouteMap(res.data.routes);
      } catch (err) {
        console.error("Route fetch error:", err);
        setError("Failed to load optimized routes");
      }
    };

    fetchRoutes();
  }, []);
const loadRouteMap = (routesData) => {
  if (!routesData.length) return;

  const origin = `${routesData[0].lat},${routesData[0].lng}`;
  const destination = `${routesData[routesData.length - 1].lat},${
    routesData[routesData.length - 1].lng
  }`;

  const waypoints = routesData
    .slice(1, -1)
    .map((loc) => `${loc.lat},${loc.lng}`)
    .join("|");

  const mapURL = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}&travelmode=driving`;

  window.open(mapURL, "_blank"); // ✅ Opens route in Google Maps tab
};



  return (
    <div className="route-optimization-page">
      <h2>Optimized Delivery Routes</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div id="route-map">Loading route...</div>
    </div>
  );
};

export default RouteOptimizationPage;
