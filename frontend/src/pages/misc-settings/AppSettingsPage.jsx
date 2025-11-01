import React, { useState } from "react";

const AppSettingsPage = () => {
  const [settings, setSettings] = useState({
    taxPercent: "",
    serviceCharge: "",
    applyTaxOnDelivery: false,

    enableCOD: true,
    enableOnlinePayment: true,
    enableWallet: false,
    minCOD: "",
    paymentKey: "",

    slotDelivery: true,
    slotDuration: 30,
    operationalStart: "09:00",
    operationalEnd: "21:00",
    maxOrdersPerSlot: 10,

    autoAssign: true,
    allowOverride: true,
    deliveryRadius: 5,
    lateThreshold: 15,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    console.log("Settings to save:", settings);
    alert("Settings saved!");
    // Here you’d call your backend API to persist the settings.
  };

  return (
    <>
      <div style={{ maxHeight: "100%", maxWidth: "1000px",margin: "auto", boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}>
        <div style={styles.container}>
          <h2 style={styles.title}>App Settings</h2>

          {/* 1. Tax Settings */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>1. Tax Settings</h3>
            <input
              style={styles.input}
              name="taxPercent"
              placeholder="GST / VAT (%)"
              value={settings.taxPercent}
              onChange={handleChange}
            />
            <input
              style={styles.input}
              name="serviceCharge"
              placeholder="Service Charge (%)"
              value={settings.serviceCharge}
              onChange={handleChange}
            />
            <label style={styles.label}>
              <input
                type="checkbox"
                name="applyTaxOnDelivery"
                checked={settings.applyTaxOnDelivery}
                onChange={handleChange}
              />
              Apply Tax on Delivery Charge
            </label>
          </div>

          {/* 2. Payment Modes */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>2. Payment Mode Settings</h3>
            <label style={styles.label}>
              <input
                type="checkbox"
                name="enableCOD"
                checked={settings.enableCOD}
                onChange={handleChange}
              />
              Enable COD
            </label>
            <label style={styles.label}>
              <input
                type="checkbox"
                name="enableOnlinePayment"
                checked={settings.enableOnlinePayment}
                onChange={handleChange}
              />
              Enable Online Payment
            </label>
            <label style={styles.label}>
              <input
                type="checkbox"
                name="enableWallet"
                checked={settings.enableWallet}
                onChange={handleChange}
              />
              Allow Wallet Payments
            </label>
            <input
              style={styles.input}
              name="minCOD"
              placeholder="Minimum Order for COD (₹)"
              value={settings.minCOD}
              onChange={handleChange}
            />
            <input
              type="password"
              style={styles.input}
              name="paymentKey"
              placeholder="Payment Gateway Key"
              value={settings.paymentKey}
              onChange={handleChange}
            />
          </div>

          {/* 3. Slot Settings */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>3. Delivery Slot Logic</h3>
            <label style={styles.label}>
              <input
                type="checkbox"
                name="slotDelivery"
                checked={settings.slotDelivery}
                onChange={handleChange}
              />
              Enable Time Slot Based Delivery
            </label>
            <input
              style={styles.input}
              name="slotDuration"
              type="number"
              placeholder="Slot Duration (mins)"
              value={settings.slotDuration}
              onChange={handleChange}
            />
            <div style={styles.row}>
              <input
                type="time"
                name="operationalStart"
                style={{ ...styles.input, width: "48%" }}
                value={settings.operationalStart}
                onChange={handleChange}
              />
              <input
                type="time"
                name="operationalEnd"
                style={{ ...styles.input, width: "48%" }}
                value={settings.operationalEnd}
                onChange={handleChange}
              />
            </div>
            <input
              style={styles.input}
              name="maxOrdersPerSlot"
              type="number"
              placeholder="Max Orders per Slot"
              value={settings.maxOrdersPerSlot}
              onChange={handleChange}
            />
          </div>

          {/* 4. Delivery Logic */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>4. Delivery Logic</h3>
            <label style={styles.label}>
              <input
                type="checkbox"
                name="autoAssign"
                checked={settings.autoAssign}
                onChange={handleChange}
              />
              Enable Auto-Assign to Nearest Rider
            </label>
            <label style={styles.label}>
              <input
                type="checkbox"
                name="allowOverride"
                checked={settings.allowOverride}
                onChange={handleChange}
              />
              Allow Manual Assignment Override
            </label>
            <input
              style={styles.input}
              name="deliveryRadius"
              type="number"
              placeholder="Default Delivery Radius (km)"
              value={settings.deliveryRadius}
              onChange={handleChange}
            />
            <input
              style={styles.input}
              name="lateThreshold"
              type="number"
              placeholder="Late Delivery Threshold (mins)"
              value={settings.lateThreshold}
              onChange={handleChange}
            />
          </div>

          {/* Save Button */}
          <button style={styles.saveButton} onClick={handleSubmit}>
            Save Settings
          </button>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    padding: "2rem 40px",

    margin: "auto",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "24px",
    marginBottom: "1.5rem",
    textAlign: "center",
  },
  section: {
    marginBottom: "2rem",
    padding: "1rem",
    border: "1px solid #eee",
    borderRadius: "8px",
    backgroundColor: "#fafafa",
  },
  sectionTitle: {
    fontSize: "18px",
    marginBottom: "1rem",
    borderBottom: "1px solid #ccc",
    paddingBottom: "0.5rem",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "0.5rem",
    marginBottom: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  label: {
    display: "flex",
    marginBottom: "0.75rem",
    fontSize: "14px",
    gap: "0.5rem",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
    marginBottom: "1rem",
  },
  saveButton: {
    display: "block",
    width: "100%",
    padding: "0.75rem",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default AppSettingsPage;
