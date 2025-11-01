// HubAssignmentPage.jsx
import React, { useState, useEffect } from "react";

const HubAssignmentPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [filters, setFilters] = useState({ region: "", search: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [viewDetails, setViewDetails] = useState(null);
  const [formData, setFormData] = useState({
    region: "",
    vendors: "",
    categories: "",
  });

  useEffect(() => {
    const dummy = [
      {
        id: "HUB001",
        name: "Central Hub",
        region: "Bangalore",
        vendors: ["Vendor A", "Vendor B"],
        categories: ["Grocery", "Electronics"],
        status: "Active",
        updatedAt: "2025-05-28 09:30 AM",
      },
    ];
    setAssignments(dummy);
  }, []);

  const filtered = assignments.filter((item) => {
    const matchesRegion = filters.region
      ? item.region === filters.region
      : true;
    const matchesSearch = filters.search
      ? item.name.toLowerCase().includes(filters.search.toLowerCase())
      : true;
    return matchesRegion && matchesSearch;
  });

  const handleAssign = () => {
    if (editMode) {
      setAssignments((prev) =>
        prev.map((item) =>
          item.id === editMode.id
            ? {
                ...item,
                region: formData.region,
                vendors: formData.vendors.split(",").map((v) => v.trim()),
                categories: formData.categories.split(",").map((c) => c.trim()),
              }
            : item
        )
      );
    } else {
      const newHub = {
        id: `HUB${assignments.length + 1}`,
        name: `New Hub ${assignments.length + 1}`,
        region: formData.region,
        vendors: formData.vendors.split(",").map((v) => v.trim()),
        categories: formData.categories.split(",").map((c) => c.trim()),
        status: "Active",
        updatedAt: new Date().toLocaleString(),
      };
      setAssignments([...assignments, newHub]);
    }
    setFormData({ region: "", vendors: "", categories: "" });
    setModalOpen(false);
    setEditMode(null);
  };

  return (
    <>
      <div
        style={{
          padding: "30px",
          fontFamily: "Arial",
          fontSize: "14px",
          width: "100%",
          height: "100vh",
          overflow: "auto",
          backgroundColor: "#f2f2f2",
          padding: "50px 80px",
        }}
      >
        <h2 className="text-center mb-5">Hub/Dark Store Assignment</h2>

        {/* Filters */}
        <div
          className="d-flex justify-content-between"
          style={{
            display: "flex",
            gap: "10px",
            // marginBottom: "20px",
            marginBottom: "50px",
          }}
        >
          <select
            style={{ padding: " 0 15px" }}
            onChange={(e) => setFilters({ ...filters, region: e.target.value })}
          >
            <option value="">All Regions</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Chennai">Chennai</option>
            <option value="Kolkata">Kolkata</option>
          </select>
          <div className="d-flex gap-2 ">
            <input
              type="text"
              placeholder="Search hub by name..."
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              style={{
                padding: " 0 15px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
            <button onClick={() => setModalOpen(true)}>+ Assign Hub</button>
          </div>
        </div>

        {/* Assignment Table */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <thead className="bg-primary text-white ">
            <tr
              style={{
                backgroundColor: "#2874f0",
                color: "#fff",
                borderRadius: "80px",
              }}
            >
              <th>ID</th>
              <th style={{ padding: "12px 15px" }}>Name</th>
              <th>Region</th>
              <th>Vendors</th>
              <th>Categories</th>
              <th>Status</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((hub) => (
              <tr key={hub.id}>
                <td style={{ padding: "25px 15px" }}>{hub.id}</td>
                <td>{hub.name}</td>
                <td>{hub.region}</td>
                <td>{hub.vendors.length}</td>
                <td>{hub.categories.length}</td>
                <td
                  style={{ color: hub.status === "Active" ? "green" : "gray" }}
                >
                  {hub.status}
                </td>
                <td>{hub.updatedAt}</td>
                <td>
                  <button
                    style={{
                      marginRight: "10px",
                      backgroundColor: "green",
                      color: "white",
                      border: "none",
                      padding: "8px 15px",
                      borderRadius: 4,
                      cursor: "pointer",
                    }}
                    onClick={() => setViewDetails(hub)}
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      setEditMode(hub);
                      setFormData({
                        region: hub.region,
                        vendors: hub.vendors.join(", "),
                        categories: hub.categories.join(", "),
                      });
                      setModalOpen(true);
                    }}
                    style={{
                      marginRight: "10px",
                      backgroundColor: "blue",
                      color: "white",
                      border: "none",
                      padding: "8px 15px",
                      borderRadius: 4,
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Assign Modal */}
        {modalOpen && (
          <div
            className=""
            style={{
              position: "fixed",
              top: "20%",
              left: "20%",
              background: "white",
              padding: "40px",
              zIndex: 999,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          >
            <h3 className="text-center mb-4">
              {editMode ? "Edit Hub" : "Assign Hub"}
            </h3>
            <div className="d-flex flex-row gap-2">
              <select
                value={formData.region}
                onChange={(e) =>
                  setFormData({ ...formData, region: e.target.value })
                }
                className="p-2"
              >
                <option>Select Region</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Chennai">Chennai</option>
                <option value="Kolkata">Kolkata</option>
              </select>
              <input
                type="text"
                placeholder="Vendors (comma separated)"
                value={formData.vendors}
                onChange={(e) =>
                  setFormData({ ...formData, vendors: e.target.value })
                }
                className="p-2"
              />
              <input
                type="text"
                placeholder="Categories (comma separated)"
                value={formData.categories}
                onChange={(e) =>
                  setFormData({ ...formData, categories: e.target.value })
                }
                className="pe-2"
              />
              <button onClick={handleAssign} className="btn btn-primary">
                {editMode ? "Update" : "Assign"}
              </button>
              <button
                onClick={() => {
                  setModalOpen(false);
                  setEditMode(null);
                }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* View Details Modal */}
        {viewDetails && (
          <div 
            style={{
              position: "fixed",
              top: "20%",
              left: "30%",
              background: "white",
              padding: "30px",
              zIndex: 999,
              backgroundColor: "rgb(215, 223, 223)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          >
            <h3>{viewDetails.name} – Details</h3>
             <div className="d-flex flex-column gap-2" style={{ fontSize: "14px",marginTop: "20px",padding: "20px" }}>
                 <p>
              <strong>Region:</strong> {viewDetails.region}
            </p>
            <p>
              <strong>Vendors:</strong> {viewDetails.vendors.join(", ")}
            </p>
            <p>
              <strong>Categories:</strong> {viewDetails.categories.join(", ")}
            </p>
            <p>
              <strong>Status:</strong> {viewDetails.status}
            </p>
            <button style={{ backgroundColor: "blue", color: "white", border: "none", padding: "8px 15px", borderRadius: 4, cursor: "pointer" }} onClick={() => setViewDetails(null)}>Close</button>
             </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HubAssignmentPage;
