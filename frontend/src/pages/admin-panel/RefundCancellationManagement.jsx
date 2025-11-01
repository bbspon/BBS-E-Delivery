// RefundCancellationManagement.jsx
import React, { useState, useEffect } from "react";

const sampleRequests = [
  {
    id: "R001",
    orderId: "O1001",
    customer: "Alice Johnson",
    vendor: "Vendor A",
    type: "Refund",
    reason: "Product defective",
    amount: 49.99,
    status: "Pending",
    dateRequested: "2025-06-01",
    history: [],
    documents: [],
  },
  {
    id: "R002",
    orderId: "O1002",
    customer: "Bob Smith",
    vendor: "Vendor B",
    type: "Cancellation",
    reason: "Order delayed",
    amount: 29.99,
    status: "Pending",
    dateRequested: "2025-06-02",
    history: [],
    documents: [],
  },
];

const STATUS_OPTIONS = ["Pending", "Approved", "Rejected", "Completed"];

function RefundCancellationManagement() {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    vendor: "",
    customer: "",
    searchTerm: "",
    type: "",
  });
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [bulkAction, setBulkAction] = useState("");

  useEffect(() => {
    setRequests(sampleRequests);
    setFilteredRequests(sampleRequests);
  }, []);

  useEffect(() => {
    let result = [...requests];

    if (filters.status) {
      result = result.filter((r) => r.status === filters.status);
    }
    if (filters.vendor) {
      result = result.filter((r) =>
        r.vendor.toLowerCase().includes(filters.vendor.toLowerCase())
      );
    }
    if (filters.customer) {
      result = result.filter((r) =>
        r.customer.toLowerCase().includes(filters.customer.toLowerCase())
      );
    }
    if (filters.type) {
      result = result.filter((r) => r.type === filters.type);
    }
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter(
        (r) =>
          r.id.toLowerCase().includes(term) ||
          r.orderId.toLowerCase().includes(term)
      );
    }

    setFilteredRequests(result);
  }, [filters, requests]);

  function toggleSelect(id) {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  }

  function updateRequestStatus(id, newStatus, note = "") {
    setRequests((prev) =>
      prev.map((req) => {
        if (req.id === id) {
          const newHistoryEntry = {
            date: new Date().toISOString(),
            user: "CurrentUser",
            statusFrom: req.status,
            statusTo: newStatus,
            note,
          };
          return {
            ...req,
            status: newStatus,
            history: [...req.history, newHistoryEntry],
          };
        }
        return req;
      })
    );
  }

  function handleBulkAction() {
    if (!bulkAction) return;
    selectedIds.forEach((id) => {
      updateRequestStatus(id, bulkAction);
    });
    setSelectedIds(new Set());
    setBulkAction("");
  }

  function handleApprove() {
    updateRequestStatus(selectedRequest.id, "Approved", "Approved by user");
    setSelectedRequest(null);
  }

  function handleReject() {
    const reason = prompt("Enter rejection reason:");
    if (reason) {
      updateRequestStatus(selectedRequest.id, "Rejected", reason);
      setSelectedRequest(null);
    }
  }

  function handleRequestInfo() {
    const msg = prompt("Enter info request message:");
    if (msg) {
      setRequests((prev) =>
        prev.map((req) => {
          if (req.id === selectedRequest.id) {
            const newHistoryEntry = {
              date: new Date().toISOString(),
              user: "CurrentUser",
              statusFrom: req.status,
              statusTo: req.status,
              note: `Requested info: ${msg}`,
            };
            return { ...req, history: [...req.history, newHistoryEntry] };
          }
          return req;
        })
      );
      setSelectedRequest(null);
    }
  }

  // --- Styles ---
  const containerStyle = {
    padding: '30px 60px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  };
  const headingStyle = { marginBottom: 20, color: "#333" };
  const filtersStyle = { marginBottom: 15, display: "flex", 
    gap: 10, justifyContent: "space-between", alignItems: "center" };
  const inputStyle = {
    padding: "6px 10px",
    borderRadius: 4,
    border: "1px solid #ccc",
    minWidth: 150,
  };
  const selectStyle = { ...inputStyle, minWidth: 130 };
  const buttonStyle = {
    padding: "6px 12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  };
  const buttonDisabledStyle = {
    ...buttonStyle,
    backgroundColor: "#999",
    cursor: "not-allowed",
  };
  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "white",
  };
  const thStyle = {
    borderBottom: "2px solid #ddd",
    padding: "10px 8px",
    textAlign: "left",
    backgroundColor: "#f0f0f0",
  };
  const tdStyle = { padding: "8px", borderBottom: "1px solid #eee" };
  const actionBtnStyle = {
    padding: "4px 8px",
    marginRight: 6,
    borderRadius: 4,
    border: "none",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "white",
  };
  const modalStyle = {
    position: "fixed",
    top: "10%",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#fff",
    border: "1px solid #ccc",
    padding: 20,
    zIndex: 1000,
    maxWidth: 600,
    width: "90%",
    maxHeight: "80vh",
    overflowY: "auto",
    borderRadius: 8,
    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
  };
  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 999,
  };
  const historyListStyle = { maxHeight: 150, overflowY: "auto", paddingLeft: 20 };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Refund & Cancellation Management</h2>

      {/* Filters */}
      <div style={filtersStyle}>
        <select
          style={selectStyle}
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>

        <input
          style={inputStyle}
          placeholder="Filter by Vendor"
          value={filters.vendor}
          onChange={(e) => setFilters({ ...filters, vendor: e.target.value })}
        />
        <input
          style={inputStyle}
          placeholder="Filter by Customer"
          value={filters.customer}
          onChange={(e) => setFilters({ ...filters, customer: e.target.value })}
        />
        <select
          style={selectStyle}
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="">All Types</option>
          <option value="Refund">Refund</option>
          <option value="Cancellation">Cancellation</option>
        </select>
        <input
          style={inputStyle}
          placeholder="Search by Request or Order ID"
          value={filters.searchTerm}
          onChange={(e) =>
            setFilters({ ...filters, searchTerm: e.target.value })
          }
        />
      </div>

      {/* Bulk Actions */}
      <div style={{ marginBottom: 25, display: "flex", gap: 10 }}>
        <select
          style={selectStyle}
          value={bulkAction}
          onChange={(e) => setBulkAction(e.target.value)}
        >
          <option value="">Bulk Actions</option>
          <option value="Approved">Approve Selected</option>
          <option value="Rejected">Reject Selected</option>
          <option value="Completed">Mark Completed</option>
        </select>
        <button
          style={
            !bulkAction || selectedIds.size === 0
              ? buttonDisabledStyle
              : buttonStyle
          }
          onClick={handleBulkAction}
          disabled={!bulkAction || selectedIds.size === 0}
        >
          Apply
        </button>
      </div>

      {/* Requests Table */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}></th>
            <th style={thStyle}>Request ID</th>
            <th style={thStyle}>Order ID</th>
            <th style={thStyle}>Customer</th>
            <th style={thStyle}>Vendor</th>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>Reason</th>
            <th style={thStyle}>Amount</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Date Requested</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.length === 0 ? (
            <tr>
              <td colSpan={11} style={{ textAlign: "center", padding: 20 }}>
                No refund or cancellation requests found.
              </td>
            </tr>
          ) : (
            filteredRequests.map((req) => (
              <tr key={req.id}>
                <td style={tdStyle}>
                  <input
                    type="checkbox"
                    checked={selectedIds.has(req.id)}
                    onChange={() => toggleSelect(req.id)}
                  />
                </td>
                <td style={tdStyle}>{req.id}</td>
                <td style={tdStyle}>{req.orderId}</td>
                <td style={tdStyle}>{req.customer}</td>
                <td style={tdStyle}>{req.vendor}</td>
                <td style={tdStyle}>{req.type}</td>
                <td style={tdStyle}>{req.reason}</td>
                <td style={tdStyle}>${req.amount.toFixed(2)}</td>
                <td style={tdStyle}>{req.status}</td>
                <td style={tdStyle}>{req.dateRequested}</td>
                <td style={tdStyle}>
                  <button
                    style={actionBtnStyle}
                    onClick={() => setSelectedRequest(req)}
                  >
                    View / Manage
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal for Selected Request */}
      {selectedRequest && (
        <>
          <div
            style={overlayStyle}
            onClick={() => setSelectedRequest(null)}
          ></div>
          <div style={modalStyle}>
            <h3>
              Request Details - {selectedRequest.id} (
              {selectedRequest.type})
            </h3>
            <p>
              <strong>Order ID:</strong> {selectedRequest.orderId}
            </p>
            <p>
              <strong>Customer:</strong> {selectedRequest.customer}
            </p>
            <p>
              <strong>Vendor:</strong> {selectedRequest.vendor}
            </p>
            <p>
              <strong>Reason:</strong> {selectedRequest.reason}
            </p>
            <p>
              <strong>Amount:</strong> ${selectedRequest.amount.toFixed(2)}
            </p>
            <p>
              <strong>Status:</strong> {selectedRequest.status}
            </p>
            <p>
              <strong>Date Requested:</strong> {selectedRequest.dateRequested}
            </p>

            <h4>History</h4>
            {selectedRequest.history.length === 0 ? (
              <p>No history available.</p>
            ) : (
              <ul style={historyListStyle}>
                {selectedRequest.history.map((h, idx) => (
                  <li key={idx}>
                    [{new Date(h.date).toLocaleString()}] {h.user} changed
                    status from {h.statusFrom} to {h.statusTo}{" "}
                    {h.note && `- Note: ${h.note}`}
                  </li>
                ))}
              </ul>
            )}

            {/* Action buttons */}
            {selectedRequest.status === "Pending" && (
              <div style={{ marginTop: 15 }}>
                <button style={actionBtnStyle} onClick={handleApprove}>
                  Approve
                </button>
                <button
                  style={{ ...actionBtnStyle, backgroundColor: "#dc3545" }}
                  onClick={handleReject}
                >
                  Reject
                </button>
                <button
                  style={{ ...actionBtnStyle, backgroundColor: "#6c757d" }}
                  onClick={handleRequestInfo}
                >
                  Request Info
                </button>
              </div>
            )}

            <div style={{ marginTop: 15 }}>
              <button
                style={{
                  ...buttonStyle,
                  backgroundColor: "#6c757d",
                  marginRight: 10,
                }}
                onClick={() => setSelectedRequest(null)}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default RefundCancellationManagement;
