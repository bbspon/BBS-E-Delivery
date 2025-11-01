import axios from "axios";
const API_BASE = "http://localhost:5000/api/live-location";

export const updateAgentLocation = async (agentId, latitude, longitude) => {
  try {
    const res = await axios.post(`${API_BASE}/update`, {
      agentId,
      latitude,
      longitude,
    });
    return res.data;
  } catch (err) {
    console.error("Location update failed:", err);
  }
};

export const fetchAgentLocation = async (agentId) => {
  try {
    const res = await axios.get(`${API_BASE}/${agentId}`);
    return res.data;
  } catch (err) {
    console.error("Fetch location failed:", err);
  }
};
