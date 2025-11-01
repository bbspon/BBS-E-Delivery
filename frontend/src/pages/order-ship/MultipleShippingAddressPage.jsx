import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FaEdit, FaTrash, FaPlus, FaStar, FaMapMarkerAlt } from "react-icons/fa";

const MultipleShippingAddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    type: "Home",
    isDefault: false,
  });

  // Load addresses from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("addresses");
    if (saved) setAddresses(JSON.parse(saved));
  }, []);

  // Save addresses to localStorage on update
  useEffect(() => {
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);

  const handleSelect = (id) => {
    setSelectedAddressId(id);
  };

  const handleEdit = (addr) => {
    setEditingAddress(addr.id);
    setFormData({ ...addr });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this address?")) {
      setAddresses(addresses.filter((a) => a.id !== id));
    }
  };

  const handleDefault = (id) => {
    setAddresses(
      addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.phone ||
      !formData.street ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const newAddress = {
      ...formData,
      id: editingAddress || Date.now().toString(),
    };

    let updatedList;
    if (editingAddress) {
      updatedList = addresses.map((a) => (a.id === editingAddress ? newAddress : a));
    } else {
      updatedList = [...addresses, newAddress];
    }

    if (formData.isDefault) {
      updatedList = updatedList.map((a) => ({
        ...a,
        isDefault: a.id === newAddress.id,
      }));
    }

    setAddresses(updatedList);
    setFormData({
      id: "",
      name: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      country: "India",
      pincode: "",
      type: "Home",
      isDefault: false,
    });
    setEditingAddress(null);
  };

  return (
    <>
      <Header />
      <div className="container my-4 border rounded shadow-sm p-4">
        <h2 className="text-center mb-4">Manage Delivery Addresses</h2>

        {/* Address Form */}
        <div className="card mb-4 shadow">
          <div className="card-body">
            <h5>{editingAddress ? "Edit Address" : "Add New Address"}</h5>
            <form onSubmit={handleFormSubmit} className="row g-3">
              {["name", "phone", "street", "city", "state", "pincode"].map((field) => (
                <div className="col-md-6" key={field}>
                  <input
                    type="text"
                    className="form-control"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    required
                  />
                </div>
              ))}
              <div className="col-md-4">
                <select
                  className="form-select"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="col-md-4 form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="isDefault"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isDefault: e.target.checked,
                    }))
                  }
                />
                <label className="form-check-label ms-2" htmlFor="isDefault">
                  Set as Default Address
                </label>
              </div>
              <div className="col-md-4">
                <button className="btn btn-success w-100" type="submit">
                  {editingAddress ? "Update" : "Add Address"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Saved Addresses */}
        <div className="row">
          {addresses.length === 0 && (
            <p className="text-muted text-center">No addresses saved yet.</p>
          )}
          {addresses.map((addr) => (
            <div className="col-md-6 col-lg-4 mb-3" key={addr.id}>
              <div
                className={`card h-100 shadow-sm border ${
                  addr.id === selectedAddressId ? "border-primary" : ""
                }`}
              >
                <div className="card-body">
                  <h5 className="card-title">
                    {addr.name}{" "}
                    {addr.isDefault && <FaStar className="text-warning ms-2" title="Default" />}
                  </h5>
                  <p className="card-text mb-1">{addr.phone}</p>
                  <p className="card-text mb-1">{addr.street}, {addr.city}</p>
                  <p className="card-text mb-1">
                    {addr.state}, {addr.country} - {addr.pincode}
                  </p>
                  <span className="badge bg-info text-dark">{addr.type}</span>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <div>
                    <button
                      className="btn btn-sm btn-outline-primary me-1"
                      onClick={() => handleSelect(addr.id)}
                    >
                      Select
                    </button>
                    <button
                      className="btn btn-sm btn-outline-success me-1"
                      onClick={() => handleEdit(addr)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(addr.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                  {!addr.isDefault && (
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleDefault(addr.id)}
                    >
                      Set Default
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Future Placeholder Integration */}
        <div className="alert alert-light mt-4 shadow-sm">
          <h6>Coming Soon Features:</h6>
          <ul className="mb-0">
            <li>📍 Google Maps / Pin Drop Integration</li>
            <li>🧠 AI-based Address Suggestion</li>
            <li>📦 Smart Delivery Time Slots</li>
            <li>🚚 Serviceability & Pincode Checker</li>
            <li>🔐 Secure Address Encryption (on backend/API)</li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MultipleShippingAddressPage;
