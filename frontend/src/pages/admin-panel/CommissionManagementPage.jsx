// CommissionManagementPage.jsx
import React, { useState, useEffect } from "react";

// Sample mock data (replace with real API calls)
const sampleCommissions = [
  {
    id: "C1001",
    orderId: "O2001",
    vendor: "Vendor A",
    rateType: "Percentage",
    rateValue: 10, // percent
    orderTotal: 150.0,
    commissionAmount: 15.0,
    date: "2025-06-01",
    status: "Pending",
  },
  {
    id: "C1002",
    orderId: "O2002",
    vendor: "Vendor B",
    rateType: "Flat Fee",
    rateValue: 5, // dollars
    orderTotal: 80.0,
    commissionAmount: 5.0,
    date: "2025-06-02",
    status: "Paid",
  },
  {
    id: "C1003",
    orderId: "O2003",
    vendor: "Vendor A",
    rateType: "Percentage",
    rateValue: 8,
    orderTotal: 200.0,
    commissionAmount: 16.0,
    date: "2025-06-03",
    status: "Overdue",
  },
  // Add more sample entries as needed
];

const STATUS_OPTIONS = ["All", "Pending", "Paid", "Overdue", "Disputed"];
const VENDOR_OPTIONS = ["All Vendors", "Vendor A", "Vendor B", "Vendor C"];

function CommissionManagementPage() {
  const [commissions, setCommissions] = useState([]);
  const [filteredCommissions, setFilteredCommissions] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [filters, setFilters] = useState({
    vendor: "All Vendors",
    status: "All",
    dateFrom: "",
    dateTo: "",
    searchTerm: "",
  });
  const [showRateModal, setShowRateModal] = useState(false);
  const [currentRate, setCurrentRate] = useState({ vendor: "", rateType: "Percentage", rateValue: "" });

  // Fetch mock data on mount
  useEffect(() => {
    setCommissions(sampleCommissions);
    setFilteredCommissions(sampleCommissions);
  }, []);

  // Apply filters whenever filters or commissions change
  useEffect(() => {
    let result = [...commissions];

    // Filter by vendor
    if (filters.vendor !== "All Vendors") {
      result = result.filter((c) => c.vendor === filters.vendor);
    }

    // Filter by status
    if (filters.status !== "All") {
      result = result.filter((c) => c.status === filters.status);
    }

    // Filter by date range
    if (filters.dateFrom) {
      result = result.filter((c) => new Date(c.date) >= new Date(filters.dateFrom));
    }
    if (filters.dateTo) {
      result = result.filter((c) => new Date(c.date) <= new Date(filters.dateTo));
    }

    // Search by order ID or commission ID
    if (filters.searchTerm.trim()) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter(
        (c) =>
          c.orderId.toLowerCase().includes(term) ||
          c.id.toLowerCase().includes(term)
      );
    }

    setFilteredCommissions(result);
    setSelectedIds(new Set());
  }, [filters, commissions]);

  // Toggle selection for bulk actions
  function toggleSelect(id) {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  }

  function toggleSelectAll() {
    if (selectedIds.size === filteredCommissions.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredCommissions.map((c) => c.id)));
    }
  }

  // Mark selected commissions as Paid
  function handleBulkMarkPaid() {
    setCommissions((prev) =>
      prev.map((c) =>
        selectedIds.has(c.id) ? { ...c, status: "Paid" } : c
      )
    );
    setSelectedIds(new Set());
  }

  // Handle individual mark as Paid
  function handleMarkPaid(id) {
    setCommissions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "Paid" } : c))
    );
  }

  // Open rate management modal
  function openRateModal(vendor) {
    setCurrentRate({ vendor, rateType: "Percentage", rateValue: "" });
    setShowRateModal(true);
  }

  // Save a new rate (mock logic)
  function saveRate() {
    // In real app, send currentRate to backend
    setShowRateModal(false);
  }

  // --- Inline Styles ---
  const containerStyle = {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '30px 40px', 
    backgroundColor: "#f0f2f5",
    minHeight: "100vh",
    
  };
  const headingStyle = { fontSize: 28, marginBottom: 20, color: "#333" };
  const summaryContainer = {
    display: "flex",
    gap: 20,
    marginBottom: 20,
    flexWrap: "wrap",
  };
  const cardStyle = {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    flex: "1 1 200px",
    textAlign: "center",
  };
  const cardValueStyle = { fontSize: 24, fontWeight: "600", marginTop: 8 };
  const filtersStyle = {
    display: "flex",
    gap: 12,
    marginBottom: 16,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: '1.2rem',
  };
  const inputStyle = {
    padding: "6px 10px",
    borderRadius: 4,
    border: "1px solid #ccc",
    minWidth: 130,
  };
  const buttonStyle = {
    padding: "6px 14px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  };
  const buttonDisabledStyle = {
    ...buttonStyle,
    backgroundColor: "#999",
    cursor: "not-allowed",
  };
  const tableContainer = {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflowX: "auto",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  };
  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: 800,
  };
  const thStyle = {
    padding: "12px 10px",
    borderBottom: "2px solid #e0e0e0",
    backgroundColor: "#f8f9fa",
    textAlign: "left",
    whiteSpace: "nowrap",
  };
  const tdStyle = {
    padding: "10px 10px",
    borderBottom: "1px solid #eee",
    whiteSpace: "nowrap",
  };
  const actionBtnStyle = {
    padding: "4px 8px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    marginRight: 6,
  };
  const modalOverlay = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 999,
  };
  const modalStyle = {
    position: "fixed",
    top: "10%",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 8,
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    zIndex: 1000,
    minWidth: 320,
    maxWidth: 500,
  };
  const formGroup = { marginBottom: 12 };

  // Summary calculations
  const totalEarned = commissions.reduce((sum, c) => sum + c.commissionAmount, 0);
  const totalPending = commissions
    .filter((c) => c.status === "Pending")
    .reduce((sum, c) => sum + c.commissionAmount, 0);
  const totalPaid = commissions
    .filter((c) => c.status === "Paid")
    .reduce((sum, c) => sum + c.commissionAmount, 0);

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Commission Management</h2>

      {/* Summary Cards */}
      <div style={summaryContainer}>
        <div style={cardStyle}>
          <div>Total Commissions Earned</div>
          <div style={cardValueStyle}>${totalEarned.toFixed(2)}</div>
        </div>
        <div style={cardStyle}>
          <div>Total Pending Payouts</div>
          <div style={cardValueStyle}>${totalPending.toFixed(2)}</div>
        </div>
        <div style={cardStyle}>
          <div>Total Paid Commissions</div>
          <div style={cardValueStyle}>${totalPaid.toFixed(2)}</div>
        </div>
      </div>

      {/* Filters */}
      <div style={filtersStyle}>
        <select
          style={inputStyle}
          value={filters.vendor}
          onChange={(e) => setFilters({ ...filters, vendor: e.target.value })}
        >
          {VENDOR_OPTIONS.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>

        <select
          style={inputStyle}
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <input
          type="date"
          style={inputStyle}
          value={filters.dateFrom}
          onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
        />
        <span>to</span>
        <input
          type="date"
          style={inputStyle}
          value={filters.dateTo}
          onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
        />

        <input
          style={inputStyle}
          placeholder="Search Order or Commission ID"
          value={filters.searchTerm}
          onChange={(e) =>
            setFilters({ ...filters, searchTerm: e.target.value })
          }
        />

        <button
          style={
            selectedIds.size > 0
              ? buttonStyle
              : buttonDisabledStyle
          }
          onClick={handleBulkMarkPaid}
          disabled={selectedIds.size === 0}
        >
          Mark Selected Paid
        </button>

        <button
          style={buttonStyle}
          onClick={() => openRateModal("")}
        >
          Manage Rates
        </button>
      </div>

      {/* Commission Table */}
      <div style={tableContainer}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>
                <input
                  type="checkbox"
                  checked={
                    selectedIds.size === filteredCommissions.length &&
                    filteredCommissions.length > 0
                  }
                  onChange={toggleSelectAll}
                  aria-label="Select all commissions"
                />
              </th>
              <th style={thStyle}>Commission ID</th>
              <th style={thStyle}>Order ID</th>
              <th style={thStyle}>Vendor</th>
              <th style={thStyle}>Rate</th>
              <th style={thStyle}>Order Total</th>
              <th style={thStyle}>Commission</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCommissions.length === 0 ? (
              <tr>
                <td colSpan={10} style={{ textAlign: "center", padding: 20 }}>
                  No commission records found.
                </td>
              </tr>
            ) : (
              filteredCommissions.map((c) => (
                <tr key={c.id}>
                  <td style={tdStyle}>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(c.id)}
                      onChange={() => toggleSelect(c.id)}
                    />
                  </td>
                  <td style={tdStyle}>{c.id}</td>
                  <td style={tdStyle}>{c.orderId}</td>
                  <td style={tdStyle}>{c.vendor}</td>
                  <td style={tdStyle}>
                    {c.rateType === "Percentage"
                      ? `${c.rateValue}%`
                      : `$${c.rateValue.toFixed(2)}`}
                  </td>
                  <td style={tdStyle}>${c.orderTotal.toFixed(2)}</td>
                  <td style={tdStyle}>${c.commissionAmount.toFixed(2)}</td>
                  <td style={tdStyle}>{c.date}</td>
                  <td style={tdStyle}>{c.status}</td>
                  <td style={tdStyle}>
                    <button
                      style={{
                        ...actionBtnStyle,
                        backgroundColor:
                          c.status === "Paid" ? "#6c757d" : "#28a745",
                        cursor: c.status === "Paid" ? "not-allowed" : "pointer",
                      }}
                      onClick={() => handleMarkPaid(c.id)}
                      disabled={c.status === "Paid"}
                    >
                      {c.status === "Paid" ? "Paid" : "Mark Paid"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Rate Management Modal */}
      {showRateModal && (
        <>
          <div style={modalOverlay} onClick={() => setShowRateModal(false)} />
          <div style={modalStyle}>
            <h3>Commission Rate Management</h3>
            <div style={formGroup}>
              <label>
                Vendor:
                <select
                  style={{ ...inputStyle, marginLeft: 8 }}
                  value={currentRate.vendor}
                  onChange={(e) =>
                    setCurrentRate({ ...currentRate, vendor: e.target.value })
                  }
                >
                  <option value="">Select Vendor</option>
                  {VENDOR_OPTIONS.filter((v) => v !== "All Vendors").map(
                    (v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    )
                  )}
                </select>
              </label>
            </div>
            <div style={formGroup}>
              <label>
                Rate Type:
                <select
                  style={{ ...inputStyle, marginLeft: 8 }}
                  value={currentRate.rateType}
                  onChange={(e) =>
                    setCurrentRate({
                      ...currentRate,
                      rateType: e.target.value,
                    })
                  }
                >
                  <option value="Percentage">Percentage (%)</option>
                  <option value="Flat Fee">Flat Fee ($)</option>
                </select>
              </label>
            </div>
            <div style={formGroup}>
              <label>
                Rate Value:
                <input
                  type="number"
                  style={{ ...inputStyle, marginLeft: 8, width: 120 }}
                  value={currentRate.rateValue}
                  onChange={(e) =>
                    setCurrentRate({
                      ...currentRate,
                      rateValue: parseFloat(e.target.value),
                    })
                  }
                />
              </label>
            </div>
            <div style={{ textAlign: "right", marginTop: 16 }}>
              <button
                style={{ ...buttonStyle, marginRight: 8 }}
                onClick={saveRate}
              >
                Save
              </button>
              <button
                style={{
                  ...buttonStyle,
                  backgroundColor: "#dc3545",
                }}
                onClick={() => setShowRateModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CommissionManagementPage;
