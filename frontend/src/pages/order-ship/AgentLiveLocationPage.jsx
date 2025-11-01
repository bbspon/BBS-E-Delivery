import React, { useEffect, useState } from "react";
import axios from "axios";
import LiveMapViewer from "../../components/LiveMapViewer";

const AgentLiveLocationPage = () => {
  const [locations, setLocations] = useState([]);
  const agentId = "AGENT001"; // ⬅️ Make this dynamic if login session supports it

  useEffect(() => {
    const fetchLiveLocation = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/live-location/${agentId}`
        );
        setLocations(res.data);
      } catch (error) {
        console.error("Live location fetch error", error);
      }
    };
    fetchLiveLocation();
  }, [agentId]);

  return (
    <div>
      <h3>Agent Live Location</h3>
      {locations.length > 0 ? (
        <LiveMapViewer pins={locations} />
      ) : (
        <p style={{ color: "red" }}>No DigiPIN data found for current agent.</p>
      )}
    </div>
  );
};

export default AgentLiveLocationPage;
