// src/pages/AssignedOrdersPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiMapPin } from "react-icons/fi";

const AssignedOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // New UI state for proofs (ADD-ONLY)
  const [showProofModal, setShowProofModal] = useState(false);
  const [proofType, setProofType] = useState("pickup"); // "pickup" | "delivery"
  const [proofFiles, setProofFiles] = useState([]);
  const [proofNotes, setProofNotes] = useState("");
  const [activeOrderId, setActiveOrderId] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Delivery backend base (list + status updates)
  // const API_BASE = "http://localhost:5000/api/assigned-orders";
  const API_BASE =
    "http://localhost:5000/api/assigned-orders/v1/delivery/orders";
  // Don’t hardcode in prod. For local dev, put this in Vite .env:
  // VITE_DELIVERY_INGEST_TOKEN=7ed4...53e
  const SERVICE_TOKEN = import.meta.env.VITE_DELIVERY_INGEST_TOKEN;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(API_BASE, {
        headers: { Authorization: `Bearer ${SERVICE_TOKEN}` },
      });

      const normalised = res.data.map((o) => ({
        ...o,
        customer: o.destination?.name || "Unknown",
        mobile: o.destination?.phone || "N/A",
        address: [
          o.destination?.address1,
          o.destination?.address2,
          o.destination?.city,
          o.destination?.state,
          o.destination?.pincode,
        ]
          .filter(Boolean)
          .join(", "),
        items: Array.isArray(o.items) ? o.items.length : 0,
        status: o.status || "CREATED",
        time: o.time,
      }));

      setOrders(normalised);
    } catch (err) {
      console.error("Fetch orders failed:", err);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const customer = order.customer?.toLowerCase() || "";
    const orderId = order.orderId?.toLowerCase() || "";
    const q = search.toLowerCase();

    const matchesSearch = customer.includes(q) || orderId.includes(q);
    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Generic status updater
  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(
        `${API_BASE}/${encodeURIComponent(orderId)}/status`,
        { status: newStatus },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${SERVICE_TOKEN}`,
          },
        }
      );
      await fetchOrders();
    } catch (err) {
      console.error(`Update status to ${newStatus} failed:`, err);
      alert(`Failed to set ${newStatus}. Check console/logs.`);
    }
  };

  const handleMarkPickedUp = (orderId) => updateStatus(orderId, "PICKED_UP");
  const handleMarkDelivered = (orderId) => updateStatus(orderId, "DELIVERED");

  // NEW: proofs helpers (ADD-ONLY)
  const openProofModal = (orderId, type) => {
    setActiveOrderId(orderId);
    setProofType(type);
    setProofFiles([]);
    setProofNotes("");
    setShowProofModal(true);
  };

  const closeProofModal = () => {
    if (uploading) return;
    setShowProofModal(false);
    setActiveOrderId(null);
    setProofFiles([]);
    setProofNotes("");
  };

  const onFilesChange = (e) => {
    setProofFiles(e.target.files);
  };

  const submitProofs = async () => {
    if (
      !activeOrderId ||
      !proofType ||
      !proofFiles ||
      proofFiles.length === 0
    ) {
      alert("Please select one or more images.");
      return;
    }
    try {
      setUploading(true);
      const form = new FormData();
      form.append("proofType", proofType);
      form.append("notes", proofNotes);
      [...proofFiles].forEach((f) => form.append("files", f));

      const res = await fetch(
        `${API_BASE}/${encodeURIComponent(activeOrderId)}/proofs`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${SERVICE_TOKEN}`,
          },
          body: form,
        }
      );
      const json = await res.json();
      if (!json.ok) {
        throw new Error(json.error || "Upload failed");
      }
      await fetchOrders();
      closeProofModal();
    } catch (err) {
      console.error("Upload proofs failed:", err);
      alert(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const statusColor = (s) => {
    switch (s) {
      case "DELIVERED":
        return "#198754";
      case "PICKED_UP":
        return "#fd7e14";
      case "ACCEPTED":
        return "#0d6efd";
      case "CREATED":
      default:
        return "#ffc107";
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2>Assigned Orders</h2>

      {/* Filter Bar */}
      <div style={styles.filterBar}>
        <input
          type="text"
          placeholder="Search by customer or order ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={styles.selectBox}
        >
          <option>All</option>
          <option>CREATED</option>
          <option>ACCEPTED</option>
          <option>PICKED_UP</option>
          <option>DELIVERED</option>
          <option>CANCELED</option>
        </select>
      </div>

      {/* Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Items</th>
            <th>Time</th>
            <th>Status</th>
            <th style={{ minWidth: 420 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order._id || order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.customer}</td>
                <td>
                  {order.mobile && order.mobile !== "N/A" ? (
                    <a href={`tel:${order.mobile}`} style={styles.link}>
                      {order.mobile}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>{order.address}</td>
                <td>{order.items}</td>
                <td>{order.time}</td>
                <td>
                  <span
                    style={{
                      ...styles.badge,
                      backgroundColor: statusColor(order.status),
                    }}
                  >
                    {order.status}
                  </span>
                </td>

                <td>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {(order.status === "CREATED" ||
                      order.status === "ACCEPTED") && (
                      <button
                        style={{ ...styles.actionBtn, background: "#fd7e14" }}
                        onClick={() => handleMarkPickedUp(order.orderId)}
                      >
                        Mark as Picked Up
                      </button>
                    )}

                    {order.status === "PICKED_UP" && (
                      <button
                        style={{ ...styles.actionBtn, background: "#198754" }}
                        onClick={() => handleMarkDelivered(order.orderId)}
                      >
                        Mark as Delivered
                      </button>
                    )}

                    {/* NEW: proof buttons (ADD-ONLY) */}
                    <button
                      style={{ ...styles.actionBtn, background: "#0d6efd" }}
                      onClick={() => openProofModal(order.orderId, "pickup")}
                    >
                      Add Pickup Proof
                    </button>
                    <button
                      style={{ ...styles.actionBtn, background: "#6f42c1" }}
                      onClick={() => openProofModal(order.orderId, "delivery")}
                    >
                      Add Delivery Proof
                    </button>

                    {/* Always show map link */}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        order.address
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.linkBtn}
                      title="Open in Maps"
                    >
                      <FiMapPin />
                    </a>
                  </div>

                  {/* NEW: thumbnails if proofs exist (ADD-ONLY) */}
                  {order.proofs?.length > 0 && (
                    <div style={styles.proofsStrip}>
                      {order.proofs.map((p, i) => (
                        <div key={i} style={styles.proofChip}>
                          <span style={styles.proofType}>
                            {p.type === "pickup" ? "Pickup" : "Delivery"}
                          </span>
                          <img
                            src={p.url}
                            alt={p.type}
                            style={styles.proofThumb}
                            onError={(e) => {
                              e.currentTarget.style.opacity = 0.4;
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", padding: 20 }}>
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* NEW: Proof Upload Modal (ADD-ONLY) */}
      {showProofModal && (
        <div style={styles.modalBackdrop} onClick={closeProofModal}>
          <div
            style={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <h3 style={{ marginTop: 0 }}>
              Upload {proofType === "pickup" ? "Pickup" : "Delivery"} Proof
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <label>
                Proof Type
                <select
                  value={proofType}
                  onChange={(e) => setProofType(e.target.value)}
                  style={{ ...styles.selectBox, width: "100%", marginTop: 6 }}
                  disabled={uploading}
                >
                  <option value="pickup">Pickup</option>
                  <option value="delivery">Delivery</option>
                </select>
              </label>

              <label>
                Images (jpg, jpeg, png, webp) — up to 4
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  multiple
                  onChange={onFilesChange}
                  style={{ marginTop: 6 }}
                  disabled={uploading}
                />
              </label>

              <label>
                Notes (optional)
                <textarea
                  placeholder="e.g., Left with security at gate"
                  value={proofNotes}
                  onChange={(e) => setProofNotes(e.target.value)}
                  rows={3}
                  style={styles.textarea}
                  disabled={uploading}
                />
              </label>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button
                onClick={closeProofModal}
                style={{ ...styles.actionBtn, background: "#6c757d" }}
                disabled={uploading}
              >
                Cancel
              </button>
              <button
                onClick={submitProofs}
                style={{
                  ...styles.actionBtn,
                  background: "#0d6efd",
                  minWidth: 140,
                }}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload Proofs"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  wrapper: {
    padding: 30,
    fontFamily: "Segoe UI, sans-serif",
    margin: 10,
  },
  filterBar: {
    display: "flex",
    gap: 10,
    marginBottom: 30,
  },
  searchInput: {
    flex: 1,
    padding: 8,
    borderRadius: 4,
    border: "1px solid #ccc",
  },
  selectBox: {
    padding: 8,
    borderRadius: 4,
    border: "1px solid #ccc",
    width: 160,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
    padding: 20,
  },
  link: {
    color: "#2874f0",
    textDecoration: "none",
    paddingRight: 20,
  },
  badge: {
    padding: "4px 10px",
    borderRadius: 12,
    color: "#fff",
    fontSize: 12,
    fontWeight: 600,
    display: "inline-block",
  },
  actionBtn: {
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: 4,
    cursor: "pointer",
    minWidth: 180,
  },
  linkBtn: {
    fontSize: 25,
    padding: "6px 10px",
    borderRadius: 4,
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    cursor: "pointer",
    background: "#eef2ff",
    color: "#0d6efd",
  },
  // NEW: proofs strip and thumbnails
  proofsStrip: {
    display: "flex",
    gap: 8,
    marginTop: 10,
    flexWrap: "wrap",
  },
  proofChip: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    padding: 6,
    background: "#f9fafb",
  },
  proofType: {
    fontSize: 11,
    color: "#555",
  },
  proofThumb: {
    width: 64,
    height: 64,
    objectFit: "cover",
    borderRadius: 4,
  },
  // NEW: modal
  modalBackdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modalCard: {
    width: "min(520px, 92vw)",
    background: "#fff",
    borderRadius: 10,
    padding: 20,
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },
  textarea: {
    width: "100%",
    borderRadius: 6,
    border: "1px solid #ccc",
    padding: 8,
    fontFamily: "inherit",
    resize: "vertical",
  },
};

export default AssignedOrdersPage;
