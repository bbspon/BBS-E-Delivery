import React, { useState } from "react";
import Header from "../../components/Header";
const DeliveryZoneManagementPage = () => {
  const [zones, setZones] = useState([
    {
      id: 1,
      name: "Zone A",
      city: "Chennai",
      pinCodes: ["600001", "600002"],
      hubs: ["Hub 1"],
      status: true,
    },
    {
      id: 2,
      name: "Zone B",
      city: "Bangalore",
      pinCodes: ["560001", "560002"],
      hubs: ["Hub 2", "Hub 3"],
      status: false,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    city: "",
    pinCodes: "",
    hubs: "",
    status: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleStatus = (id) => {
    setZones((prev) =>
      prev.map((z) => (z.id === id ? { ...z, status: !z.status } : z))
    );
  };

  const handleEdit = (zone) => {
    setFormData({
      id: zone.id,
      name: zone.name,
      city: zone.city,
      pinCodes: zone.pinCodes.join(", "),
      hubs: zone.hubs.join(", "),
      status: zone.status,
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setZones((prev) => prev.filter((zone) => zone.id !== id));
  };

  const handleSubmit = () => {
    const { id, name, city, pinCodes, hubs, status } = formData;
    if (id) {
      // Edit existing
      setZones((prev) =>
        prev.map((z) =>
          z.id === id
            ? {
                ...z,
                name,
                city,
                pinCodes: pinCodes.split(",").map((p) => p.trim()),
                hubs: hubs.split(",").map((h) => h.trim()),
                status,
              }
            : z
        )
      );
    } else {
      // Add new
      const newZone = {
        id: Date.now(),
        name,
        city,
        pinCodes: pinCodes.split(",").map((p) => p.trim()),
        hubs: hubs.split(",").map((h) => h.trim()),
        status,
      };
      setZones((prev) => [...prev, newZone]);
    }
    setShowModal(false);
    setFormData({
      id: null,
      name: "",
      city: "",
      pinCodes: "",
      hubs: "",
      status: false,
    });
  };

  const filteredZones = zones.filter(
    (z) =>
      z.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCity === "" || z.city === selectedCity)
  );

  return (
    <>
     <Header />  
   < div className="vh-100 bg-gray-100">
        <div style={styles.container}>
        <h2 style={styles.title}>Delivery Zone Management</h2>
        <div style={styles.controls}>
          <input
            type="text"
            placeholder="Search by zone or pin"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.input}
          />
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            style={styles.select}
          >
            <option value="">All Cities</option>
            <option value="Chennai">Chennai</option>
            <option value="Bangalore">Bangalore</option>
          </select>
          <button onClick={() => setShowModal(true)} style={styles.addButton}>
            + Add New Zone
          </button>
        </div>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th className="mb-2">Zone</th>
                <th>City</th>
                <th>Pin Codes</th>
                <th>Status</th>
                <th>Assigned Hubs</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredZones.map((zone) => (
                <tr key={zone.id}>
                  <td>{zone.name}</td>
                  <td>{zone.city}</td>
                  <td>{zone.pinCodes.join(", ")}</td>
                  <td>
                    <label style={styles.switch}>
                      <input
                        type="checkbox"
                        checked={zone.status}
                        onChange={() => toggleStatus(zone.id)}
                      />
                      <span style={styles.slider}></span>
                    </label>
                  </td>
                  <td>{zone.hubs.join(", ")}</td>
                  <td>
                    <button style={styles.actionBtn}>View</button>
                    <button
                      style={styles.actionBtn}
                      onClick={() => handleEdit(zone)}
                    >
                      Edit
                    </button>
                    <button
                      style={styles.actionBtnDanger}
                      onClick={() => handleDelete(zone.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div style={styles.modalBackdrop}>
            <div style={styles.modal}>
              <h3>{formData.id ? "Edit" : "Add"} Delivery Zone</h3>
              <input
                name="name"
                value={formData.name}
                placeholder="Zone Name"
                onChange={handleInputChange}
                style={styles.input}
              />
              <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                style={styles.select}
              >
                <option value="">Select City</option>
                <option value="Chennai">Chennai</option>
                <option value="Bangalore">Bangalore</option>
              </select>
              <input
                name="pinCodes"
                value={formData.pinCodes}
                placeholder="Pin Codes (comma-separated)"
                onChange={handleInputChange}
                style={styles.input}
              />
              <input
                name="hubs"
                value={formData.hubs}
                placeholder="Assigned Hubs (comma-separated)"
                onChange={handleInputChange}
                style={styles.input}
              />
              <div style={{ marginBottom: 10 }}>
                <label>
                  <input
                    type="checkbox"
                    name="status"
                    checked={formData.status}
                    onChange={handleInputChange}
                  />
                  &nbsp;Active
                </label>
              </div>
              <button onClick={handleSubmit} style={styles.addButton}>
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={styles.cancelBtn}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
   </div>

    </>
  );
};

const styles = {
  container: {
    fontFamily: "Arial",
    maxWidth: 1000,
    height: "50vh",
      margin: "auto",
      marginTop: 60,
      boxShadow: "0 0 2px rgba(34, 26, 26, 0.45)",
      padding:'40px',
  },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  controls: { display: "flex", gap: 10, marginBottom: 20 },
  input: { padding: 8, border: "1px solid #ccc", borderRadius: 4, flex: 1 },
  select: { padding: 8, border: "1px solid #ccc", borderRadius: 4 },
  addButton: {
    background: "#2e7d32",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: 4,
    border: "none",
    cursor: "pointer",
  
  },
  cancelBtn: {
    background: "#ccc",
    marginLeft: 10,
    padding: "10px 15px",
    borderRadius: 4,
    border: "none",
    cursor: "pointer",
  },
  tableWrapper: {
    overflowX: "auto",
    padding: "0 30px",
    marginBottom: 20,
    borderRadius: 6,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    textAlign: "center",
  },
  actionBtn: {
    padding: "4px 8px",
    marginRight: 4,
    borderRadius: 3,
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  actionBtnDanger: {
    padding: "4px 8px",
    borderRadius: 3,
    backgroundColor: "#d32f2f",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  switch: {
    position: "relative",
    display: "inline-block",
    width: 40,
    height: 20,
  },
  slider: {
    position: "absolute",
    cursor: "pointer",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#ccc",
    transition: ".4s",
    borderRadius: 20,
  },
  modalBackdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: 400,
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
};

export default DeliveryZoneManagementPage;
