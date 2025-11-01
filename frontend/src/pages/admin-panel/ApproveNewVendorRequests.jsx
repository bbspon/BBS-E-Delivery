// src/pages/admin-panel/ApproveNewVendorRequests.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";

const styles = {
  container: {
    padding: "40px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    minHeight: "100vh",
    width: "100%",
  },
  header: {
    marginBottom: "20px",
  },
  title: {
    fontSize: "38px",
    fontWeight: "700",
    color: "#333",
  },
  subtitle: {
    fontSize: "18px",
    color: "#777",
  },
  summaryCards: {
    display: "flex",
    gap: "20px",
    marginBottom: "25px",
  },
  card: {
    flex: "1",
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  cardTitle: {
    fontSize: "14px",
    color: "black",
    marginBottom: "8px",
  },
  cardNumber: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#222",
  },
  filterBar: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
    flexWrap: "wrap",
  },
  input: {
    padding: "8px 12px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    flexGrow: 1,
    minWidth: "180px",
  },
  select: {
    padding: "8px 12px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    borderRadius: "8px",
    overflow: "hidden",
  },
  th: {
    textAlign: "left",
    padding: "12px",
    backgroundColor: "black",
    fontWeight: "600",
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
    color: "black",
    backgroundColor: "gray",
  },
  statusBadge: {
    padding: "5px 10px",
    borderRadius: "12px",
    fontWeight: "600",
    fontSize: "12px",
    display: "inline-block",
  },
  statusPending: {
    backgroundColor: "#ffe58f",
    color: "#ad8b00",
  },
  statusApproved: {
    backgroundColor: "#b7eb8f",
    color: "#389e0d",
  },
  statusRejected: {
    backgroundColor: "#ffa39e",
    color: "#cf1322",
  },
  button: {
    padding: "6px 14px",
    marginRight: "8px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13px",
  },
  approveBtn: {
    backgroundColor: "#52c41a",
    color: "#fff",
  },
  rejectBtn: {
    backgroundColor: "#f5222d",
    color: "#fff",
  },
  viewBtn: {
    backgroundColor: "#1890ff",
    color: "#fff",
  },
  modalOverlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    width: "600px",
    maxHeight: "80vh",
    overflowY: "auto",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
  },
  modalHeader: {
    fontSize: "22px",
    marginBottom: "15px",
    fontWeight: "700",
    color: "#333",
  },
  modalSection: {
    marginBottom: "15px",
  },
  modalLabel: {
    fontWeight: "600",
    marginBottom: "5px",
  },
  modalText: {
    marginBottom: "10px",
    color: "black",
  },
  textarea: {
    width: "100%",
    minHeight: "60px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    padding: "8px",
    resize: "vertical",
  },
  modalFooter: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px",
  },
  exportBtn: {
    marginLeft: "auto",
    backgroundColor: "#13c2c2",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    border: "none",
    fontWeight: "600",
  },
  errorText: {
    color: "#f5222d",
    fontWeight: "600",
    marginTop: "5px",
  }
};

const STATUS = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

export default function ApproveNewVendorRequests() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("Pending");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch vendor requests
  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    try {
      setLoading(true);
      const res = await axios.get("/api/vendor-requests");
      // Ensure we always store an array in state:
      let fetched = [];
      if (Array.isArray(res.data)) {
        fetched = res.data;
      } else if (Array.isArray(res.data.data)) {
        fetched = res.data.data;
      }
      setRequests(fetched);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch vendor requests", err);
      setLoading(false);
    }
  }

  // Filter and search logic
  useEffect(() => {
    let filtered = [...requests];

    if (statusFilter) {
      filtered = filtered.filter(r => r.status === statusFilter);
    }
    if (categoryFilter) {
      filtered = filtered.filter(r => r.category === categoryFilter);
    }
    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        r =>
          r.vendorName.toLowerCase().includes(lowerSearch) ||
          r.businessName.toLowerCase().includes(lowerSearch) ||
          r.email.toLowerCase().includes(lowerSearch)
      );
    }
    setFilteredRequests(filtered);
  }, [requests, searchTerm, categoryFilter, statusFilter]);

  // Approve vendor function
  async function handleApprove(id) {
    try {
      setLoading(true);
      await axios.post(`/api/vendor-requests/${id}/approve`);
      await fetchRequests();
      setLoading(false);
      alert("Vendor approved successfully.");
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Failed to approve vendor.");
    }
  }

  // Reject vendor function with reason
  async function handleReject(id) {
    if (!rejectReason.trim()) {
      setError("Please provide a rejection reason.");
      return;
    }
    try {
      setLoading(true);
      await axios.post(`/api/vendor-requests/${id}/reject`, { reason: rejectReason });
      await fetchRequests();
      setLoading(false);
      setRejectReason("");
      setShowModal(false);
      alert("Vendor rejected successfully.");
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Failed to reject vendor.");
    }
  }

  // Open detail modal
  function openDetails(request) {
    setSelectedRequest(request);
    setShowModal(true);
    setError("");
    setRejectReason("");
  }

  // Export filtered requests as CSV
  function exportCSV() {
    const headers = ["Vendor Name", "Business Name", "Email", "Category", "Location", "Status", "Submitted At"];
    const rows = filteredRequests.map(r => [
      r.vendorName,
      r.businessName,
      r.email,
      r.category,
      r.location,
      r.status,
      new Date(r.submittedAt).toLocaleDateString(),
    ]);
    let csvContent = "data:text/csv;charset=utf-8,"
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = `vendor_requests_${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Status badge component
  const StatusBadge = ({ status }) => {
    const base = { ...styles.statusBadge };
    if (status === STATUS.PENDING) Object.assign(base, styles.statusPending);
    else if (status === STATUS.APPROVED) Object.assign(base, styles.statusApproved);
    else if (status === STATUS.REJECTED) Object.assign(base, styles.statusRejected);
    return <span style={base}>{status}</span>;
  };

  // Get unique categories for filter dropdown
  const categories = [...new Set(requests.map(r => r.category))].filter(Boolean);

  // Summary counts
  const totalRequests = requests.length;
  const pendingCount = requests.filter(r => r.status === STATUS.PENDING).length;
  const approvedCount = requests.filter(r => r.status === STATUS.APPROVED).length;
  const rejectedCount = requests.filter(r => r.status === STATUS.REJECTED).length;

  return (
    <>
        <div
      style={{
        backgroundImage: `url("https://static.vecteezy.com/system/resources/previews/005/008/615/original/mobile-phone-represent-of-front-of-shop-store-shopping-online-on-website-or-mobile-application-concept-marketing-and-digital-marketing-free-vector.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh", // Full screen height
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
      }}
    >     <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Approve New Vendor Requests</h1>
          <p style={styles.subtitle}>Review and manage vendor onboarding requests</p>
        </header>

        {/* Summary Cards */}
        <div style={styles.summaryCards}>
          <div style={styles.card}>
            <div style={styles.cardTitle}>Total Requests</div>
            <div style={styles.cardNumber}>{totalRequests}</div>
          </div>
          <div style={styles.card}>
            <div style={styles.cardTitle}>Pending</div>
            <div style={styles.cardNumber}>{pendingCount}</div>
          </div>
          <div style={styles.card}>
            <div style={styles.cardTitle}>Approved</div>
            <div style={styles.cardNumber}>{approvedCount}</div>
          </div>
          <div style={styles.card}>
            <div style={styles.cardTitle}>Rejected</div>
            <div style={styles.cardNumber}>{rejectedCount}</div>
          </div>
        </div>

        {/* Filters & Export */}
        <div style={styles.filterBar}>
          <input
            type="text"
            placeholder="Search by Vendor Name, Business or Email"
            style={styles.input}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <select
            style={styles.select}
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            style={styles.select}
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value={STATUS.PENDING}>{STATUS.PENDING}</option>
            <option value={STATUS.APPROVED}>{STATUS.APPROVED}</option>
            <option value={STATUS.REJECTED}>{STATUS.REJECTED}</option>
          </select>
          <button
            style={styles.exportBtn}
            onClick={exportCSV}
            title="Export filtered vendor requests"
          >
            Export CSV
          </button>
        </div>

        {/* Requests Table */}
        {loading ? (
          <p>Loading requests...</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Vendor Name</th>
                <th style={styles.th}>Business Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Location</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Submitted At</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", padding: "20px" }}>
                    No vendor requests found.
                  </td>
                </tr>
              )}
              {filteredRequests.map(req => (
                <tr key={req.id}>
                  <td style={styles.td}>{req.vendorName}</td>
                  <td style={styles.td}>{req.businessName}</td>
                  <td style={styles.td}>{req.email}</td>
                  <td style={styles.td}>{req.category}</td>
                  <td style={styles.td}>{req.location}</td>
                  <td style={styles.td}><StatusBadge status={req.status} /></td>
                  <td style={styles.td}>{new Date(req.submittedAt).toLocaleDateString()}</td>
                  <td style={styles.td}>
                    {req.status === STATUS.PENDING && (
                      <>
                        <button
                          style={{ ...styles.button, ...styles.approveBtn }}
                          onClick={() => handleApprove(req.id)}
                          title="Approve Vendor"
                        >
                          Approve
                        </button>
                        <button
                          style={{ ...styles.button, ...styles.rejectBtn }}
                          onClick={() => {
                            setSelectedRequest(req);
                            setShowModal(true);
                            setRejectReason("");
                            setError("");
                          }}
                          title="Reject Vendor"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      style={{ ...styles.button, ...styles.viewBtn }}
                      onClick={() => openDetails(req)}
                      title="View Details"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Modal for details & rejection reason */}
        {showModal && selectedRequest && (
          <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
            <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
              <h2 style={styles.modalHeader}>Vendor Request Details</h2>

              <div style={styles.modalSection}>
                <div style={styles.modalLabel}>Vendor Name:</div>
                <div style={styles.modalText}>{selectedRequest.vendorName}</div>
              </div>
              <div style={styles.modalSection}>
                <div style={styles.modalLabel}>Business Name:</div>
                <div style={styles.modalText}>{selectedRequest.businessName}</div>
              </div>
              <div style={styles.modalSection}>
                <div style={styles.modalLabel}>Email:</div>
                <div style={styles.modalText}>{selectedRequest.email}</div>
              </div>
              <div style={styles.modalSection}>
                <div style={styles.modalLabel}>Category:</div>
                <div style={styles.modalText}>{selectedRequest.category}</div>
              </div>
              <div style={styles.modalSection}>
                <div style={styles.modalLabel}>Location:</div>
                <div style={styles.modalText}>{selectedRequest.location}</div>
              </div>
              <div style={styles.modalSection}>
                <div style={styles.modalLabel}>Submitted At:</div>
                <div style={styles.modalText}>{new Date(selectedRequest.submittedAt).toLocaleString()}</div>
              </div>
              <div style={styles.modalSection}>
                <div style={styles.modalLabel}>Status:</div>
                <StatusBadge status={selectedRequest.status} />
              </div>

              {/* Show rejection reason input only when modal opened from Reject action */}
              {selectedRequest.status === STATUS.PENDING && (
                <>
                  <div style={styles.modalSection}>
                    <div style={styles.modalLabel}>Rejection Reason (if rejecting):</div>
                    <textarea
                      style={styles.textarea}
                      placeholder="Enter rejection reason here..."
                      value={rejectReason}
                      onChange={e => setRejectReason(e.target.value)}
                    />
                    {error && <div style={styles.errorText}>{error}</div>}
                  </div>
                  <div style={styles.modalFooter}>
                    <button
                      style={{ ...styles.button, ...styles.rejectBtn }}
                      onClick={() => handleReject(selectedRequest.id)}
                    >
                      Confirm Reject
                    </button>
                    <button
                      style={{ ...styles.button, marginLeft: "10px" }}
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}

              {/* If vendor already approved or rejected just show Close */}
              {selectedRequest.status !== STATUS.PENDING && (
                <div style={styles.modalFooter}>
                  <button
                    style={{ ...styles.button }}
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
     </div>
    </>
  );
}
