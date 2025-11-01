import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const DeliveryMapPage = ({ selectedOrder, selectedAgentId }) => {
  const [agents, setAgents] = useState([]);
  const [orders, setOrders] = useState([]);
  const [view, setView] = useState("both");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [agentsRes, ordersRes] = await Promise.all([
        axios.get("http://localhost:5000/api/delivery-map/agents"),
        axios.get("http://localhost:5000/api/delivery-map/orders"),
      ]);

      setAgents(agentsRes.data);
      setOrders(ordersRes.data);
    } catch (err) {
      console.error("Map Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredAgents = selectedAgentId
    ? agents.filter((a) => a.agentId === selectedAgentId)
    : agents;

  const filteredOrders = selectedOrder
    ? orders.filter((o) => o.orderId === selectedOrder)
    : orders;

  const center = filteredOrders[0]?.coordinates ||
    filteredAgents[0]?.coordinates || { lat: 11.93, lng: 79.81 };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📍 Delivery Map</h2>
      <div>
        <label>View: </label>
        <select onChange={(e) => setView(e.target.value)} value={view}>
          <option value="both">Agents + Orders</option>
          <option value="agents">Only Agents</option>
          <option value="orders">Only Orders</option>
        </select>
      </div>

      {loading ? (
        <p>Loading map...</p>
      ) : (
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: "500px", width: "100%", marginTop: 20 }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {view !== "orders" &&
            filteredAgents
              .filter(
                (agent) =>
                  agent.coordinates &&
                  agent.coordinates.lat &&
                  agent.coordinates.lng
              )
              .map((agent) => (
                <Marker key={agent.agentId} position={agent.coordinates}>
                  <Popup>
                    🧍 Agent: {agent.agentId}
                    <br />
                    DIGIPIN: {agent.digiPIN}
                  </Popup>
                </Marker>
              ))}

          {view !== "agents" &&
            filteredOrders
              .filter(
                (order) =>
                  order.coordinates &&
                  order.coordinates.lat &&
                  order.coordinates.lng
              )
              .map((order) => (
                <Marker key={order.orderId} position={order.coordinates}>
                  <Popup>
                    📦 Order: {order.orderId}
                    <br />
                    DIGIPIN: {order.digiPIN}
                  </Popup>
                </Marker>
              ))}
        </MapContainer>
      )}
    </div>
  );
};

export default DeliveryMapPage;
