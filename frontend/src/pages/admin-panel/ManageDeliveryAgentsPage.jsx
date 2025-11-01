import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageDeliveryAgentsPage = () => {
  const [agents, setAgents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const res = await axios.get("/api/admin/delivery-agents");
      setAgents(res.data?.agents || []);
    } catch (err) {
      console.error("Failed to fetch delivery agents:", err);
      setAgents([]);
    }
  };

  const handleStatusToggle = async (agentId, currentStatus) => {
    try {
      await axios.put(`/api/admin/delivery-agents/${agentId}/status`, {
        status: !currentStatus,
      });
      fetchAgents();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDelete = async (agentId) => {
    if (!window.confirm("Are you sure you want to delete this agent?")) return;
    try {
      await axios.delete(`/api/admin/delivery-agents/${agentId}`);
      fetchAgents();
    } catch (err) {
      console.error("Failed to delete agent:", err);
    }
  };

  const filteredAgents = agents?.filter((agent) =>
    agent.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <div
  style={{
    backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/001/990/179/original/online-delivery-service-background-concept-e-commerce-concept-red-scooter-smartphone-and-map-pin-illustration-free-vector.jpg')",    
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
  }}
>

        <div className="agents-container">
      <h2 className="agents-title">Manage Delivery Agents</h2>

      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

      <div className="table-wrapper">
        <table className="agents-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Zone</th>
              <th>Status</th>
              <th>Assigned Orders</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAgents.length > 0 ? (
              filteredAgents.map((agent) => (
                <tr key={agent._id}>
                  <td>{agent.name}</td>
                  <td>{agent.phone}</td>
                  <td>{agent.zone}</td>
                  <td>
                    <button
                      className={`status-btn ${agent.status ? "active" : "inactive"}`}
                      onClick={() => handleStatusToggle(agent._id, agent.status)}
                    >
                      {agent.status ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td>{agent.assignedOrders || 0}</td>
                  <td>
                    <button className="action-btn edit">Edit</button>
                    <button className="action-btn delete" onClick={() => handleDelete(agent._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No delivery agents found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>

    <style>
        {`
        .agents-container {
  padding: 30px;
  background:rgba(68, 51, 51, 0.23);
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
}

.agents-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  
}

.search-input {
  padding: 10px;
  width: 300px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.table-wrapper {
  overflow-x: auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px #ddd;
}

.agents-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;
}

.agents-table th,
.agents-table td {
  padding: 12px 16px;
  text-align: left;
  font-size: 14px;
  border: 1px solid black;

}

.agents-table th {
  background: #f2f2f2;
}

.status-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 14px;
}

.status-btn.active {
  background-color: #28a745;
}

.status-btn.inactive {
  background-color: #dc3545;
}

.action-btn {
  padding: 6px 12px;
  margin-right: 5px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  color: white;
}

.action-btn.edit {
  background-color: #007bff;
}

.action-btn.delete {
  background-color: #dc3545;
}

        `}
    </style>
    </>
  );
};

export default ManageDeliveryAgentsPage;
