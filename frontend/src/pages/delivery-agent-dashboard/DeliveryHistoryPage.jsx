import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api/deliveryhistory"; // 🔧 adjust if needed

const DeliveryHistoryPage = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // filter / search
  const [filterModule, setFilterModule] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  /* ───────────────── Fetch once ───────────────── */
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const res = await axios.get(API_URL);
        setDeliveries(res.data || []);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load delivery history.");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  /* ───────────────── Helpers ───────────────── */
  const formatDateTime = (iso) => {
    const d = new Date(iso);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  const moduleOptions = ["All", ...new Set(deliveries.map((d) => d.module))];

  /* ───────────────── Filtering ───────────────── */
  const filtered = deliveries.filter((o) => {
    const matchModule = filterModule === "All" || o.module === filterModule;
    const matchStatus = filterStatus === "All" || o.status === filterStatus;
    const q = searchTerm.toLowerCase();
    const matchSearch =
      o.orderId.toLowerCase().includes(q) ||
      o.customer.toLowerCase().includes(q);

    return matchModule && matchStatus && matchSearch;
  });

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📦 Delivery History</h2>

      {/* ───── Filters ───── */}
      <div style={styles.filters}>
        <select
          value={filterModule}
          onChange={(e) => setFilterModule(e.target.value)}
          style={styles.select}
        >
          {moduleOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt === "All" ? "All Modules" : opt}
            </option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={styles.select}
        >
          <option value="All">All Statuses</option>
          <option value="Delivered">Delivered</option>
          <option value="Failed">Failed</option>
          <option value="Returned">Returned</option>
        </select>

        <input
          type="text"
          placeholder="Search by Order ID / Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* ───── Content ───── */}
      {loading ? (
        <p style={styles.loading}>⏳ Loading your delivery history...</p>
      ) : error ? (
        <p style={{ ...styles.empty, color: "#dc3545" }}>{error}</p>
      ) : filtered.length === 0 ? (
        <p style={styles.empty}>🚫 No matching deliveries found.</p>
      ) : (
        <div style={styles.list}>
          {filtered.map((o) => (
            <div key={o._id} style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.orderId}>#{o.orderId}</h3>
                <span style={styles.module}>{o.module}</span>
              </div>

              <p>
                <b>Customer:</b> {o.customer}
              </p>
              <p>
                <b>Address:</b> {o.address}
              </p>
              <p>
                <b>Delivered On:</b> {formatDateTime(o.deliveredOn)}
              </p>
              <p>
                <b>Status:</b>{" "}
                <span
                  style={{
                    ...styles.statusBadge,
                    backgroundColor:
                      o.status === "Delivered"
                        ? "#28a745"
                        : o.status === "Failed"
                        ? "#dc3545"
                        : "#ffc107",
                  }}
                >
                  {o.status}
                </span>
              </p>
              <p>
                <b>Earning:</b> ₹{o.earning}
              </p>
              <Link to={`/track-order/${o.orderId}`}>Track Order</Link>
              <Link to="/route-optimization" className="btn btn-primary mb-3">
                Optimize Routes 📍
              </Link>

              <div style={styles.actions}>
                <button style={styles.detailBtn}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ───────────────── Inline styles (matches screenshot) ───────────────── */
const styles = {
  container: {
    maxWidth: 900,
    margin: "30px auto",
    padding: 20,
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
  },
  filters: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 20,
  },
  select: {
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #ccc",
    flex: "1 1 200px",
  },
  input: {
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #ccc",
    flex: "2 1 300px",
  },
  loading: { textAlign: "center", fontSize: 18, color: "#888" },
  empty: { textAlign: "center", fontSize: 18, color: "#555" },
  list: { display: "flex", flexDirection: "column", gap: 30 },
  card: {
    background: "#f9f9f9",
    padding: 30,
    borderRadius: 10,
    border: "1px solid rgba(0,0,0,0.1)",
    boxShadow: "0 0 10px rgba(0,0,0,0.05)",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  orderId: { margin: 0, fontSize: 18, fontWeight: "bold" },
  module: {
    background: "#007bff",
    color: "#fff",
    fontSize: 12,
    padding: "2px 10px",
    borderRadius: 12,
  },
  statusBadge: {
    color: "#fff",
    padding: "2px 10px",
    borderRadius: 12,
    fontSize: 13,
  },
  actions: { marginTop: 10 },
  detailBtn: {
    background: "#17a2b8",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },
};

export default DeliveryHistoryPage;
