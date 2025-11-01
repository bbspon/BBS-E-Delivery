import React, { useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const AddressResolveTool = () => {
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [lat, setLat] = useState(11.9416);
  const [lng, setLng] = useState(79.8083);
  const [resolved, setResolved] = useState(null);
  const [digiPIN, setDigiPIN] = useState("");
  const [index, setIndex] = useState("001");

  const handleResolve = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/address/resolve",
        {
          address,
          pincode,
          lat,
          lng,
        }
      );
      setResolved(res.data.resolved);
    } catch (err) {
      console.error("Resolve Error:", err);
    }
  };

  const handleGenerateDigiPIN = async () => {
    if (!resolved) return alert("Resolve address first");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/address/digipin",
        {
          city: resolved.city,
          state: resolved.state,
          postalCode: resolved.postalCode,
          index,
        }
      );
      setDigiPIN(res.data.digiPIN);
    } catch (err) {
      console.error("DigiPIN Error:", err);
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/address/save", {
        resolved,
        digiPIN,
      });
      alert("Address + DigiPIN Saved ✅");
    } catch (err) {
      console.error("Save Error:", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📍 Address Resolve Tool</h2>

      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Enter Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ marginRight: 10, padding: 6, width: "300px" }}
        />
        <input
          type="text"
          placeholder="PIN Code"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          style={{ marginRight: 10, padding: 6, width: "120px" }}
        />
        <button onClick={handleResolve}>Resolve Address</button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label>📌 Index:</label>
        <input
          type="text"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
          style={{ marginLeft: 10, marginRight: 10 }}
        />
        <button onClick={handleGenerateDigiPIN}>Generate DigiPIN</button>
      </div>

      {resolved && (
        <div style={{ marginBottom: 16, background: "#e6f4ea", padding: 12 }}>
          <strong>Resolved Address:</strong>
          <p>{resolved.line1}</p>
          <p>
            {resolved.city}, {resolved.state} - {resolved.postalCode}
          </p>
          <p>
            Lat: {resolved.coordinates.lat}, Lng: {resolved.coordinates.lng}
          </p>
        </div>
      )}

      {digiPIN && (
        <div style={{ marginBottom: 16, background: "#fff8e1", padding: 12 }}>
          <strong>Generated DigiPIN:</strong>
          <p>{digiPIN}</p>
        </div>
      )}

      {resolved && digiPIN && (
        <button
          onClick={handleSave}
          style={{ background: "#4caf50", color: "#fff", padding: 10 }}
        >
          ✅ Save Resolved Address
        </button>
      )}

      <div style={{ marginTop: 30 }}>
        <MapContainer
          center={[lat, lng]}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />
          <Marker position={[lat, lng]}>
            <Popup>
              Target Location
              <br />
              Lat: {lat}
              <br />
              Lng: {lng}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default AddressResolveTool;
