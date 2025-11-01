// PayoutManagementPage.jsx
import React, { useState, useEffect } from "react";

// Mock data for payables (replace with real API calls)
const samplePayables = [
  {
    id: "P1001",
    payeeName: "Vendor A",
    payeeType: "Vendor",
    grossAmount: 200.0,
    deductions: 10.0,
    netAmount: 190.0,
    currency: "USD",
    fxBaseAmount: 190.0,
    paymentMethod: "Bank Transfer",
    status: "Ready",
    period: "June 2025 Wk 1",
    transactionId: "",
    dateCreated: "2025-06-01",
  },
  {
    id: "P1002",
    payeeName: "Agent X",
    payeeType: "Agent",
    grossAmount: 120.0,
    deductions: 0.0,
    netAmount: 120.0,
    currency: "USD",
    fxBaseAmount: 120.0,
    paymentMethod: "PayPal",
    status: "Paid",
    period: "June 2025 Wk 1",
    transactionId: "TXN12345",
    dateCreated: "2025-06-02",
  },
  {
    id: "P1003",
    payeeName: "Vendor B",
    payeeType: "Vendor",
    grossAmount: 340.0,
    deductions: 20.0,
    netAmount: 320.0,
    currency: "USD",
    fxBaseAmount: 320.0,
    paymentMethod: "Bank Transfer",
    status: "Overdue",
    period: "May 2025 Monthly",
    transactionId: "",
    dateCreated: "2025-05-31",
  },
  // Add more sample entries as needed
];

const STATUS_OPTIONS = ["All", "Ready", "In Process", "Paid", "Failed", "On Hold", "Disputed"];
const PAYEE_TYPE_OPTIONS = ["All", "Vendor", "Agent"];
const CURRENCY_OPTIONS = ["All", "USD", "EUR", "INR"];

function PayoutManagementPage() {
  const [payables, setPayables] = useState([]);
  const [filteredPayables, setFilteredPayables] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [filters, setFilters] = useState({
    payeeType: "All",
    status: "All",
    dateFrom: "",
    dateTo: "",
    currency: "All",
    searchTerm: "",
  });
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [batchItems, setBatchItems] = useState([]);
  const [batchNote, setBatchNote] = useState("");
  const [summary, setSummary] = useState({
    totalDue: 0,
    totalPaid: 0,
    totalOverdue: 0,
    uniquePayees: 0,
  });

  useEffect(() => {
    setPayables(samplePayables);
    setFilteredPayables(samplePayables);
  }, []);

  useEffect(() => {
    applyFilters();
    calculateSummary();
    setSelectedIds(new Set());
  }, [filters, payables]);

  function applyFilters() {
    let result = [...payables];

    if (filters.payeeType !== "All") {
      result = result.filter((p) => p.payeeType === filters.payeeType);
    }
    if (filters.status !== "All") {
      result = result.filter((p) => p.status === filters.status);
    }
    if (filters.currency !== "All") {
      result = result.filter((p) => p.currency === filters.currency);
    }
    if (filters.dateFrom) {
      result = result.filter((p) => new Date(p.dateCreated) >= new Date(filters.dateFrom));
    }
    if (filters.dateTo) {
      result = result.filter((p) => new Date(p.dateCreated) <= new Date(filters.dateTo));
    }
    if (filters.searchTerm.trim()) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.id.toLowerCase().includes(term) ||
          p.payeeName.toLowerCase().includes(term)
      );
    }

    setFilteredPayables(result);
  }

  function calculateSummary() {
    const totalDue = payables
      .filter((p) => p.status === "Ready")
      .reduce((sum, p) => sum + p.netAmount, 0);
    const totalPaid = payables
      .filter((p) => p.status === "Paid")
      .reduce((sum, p) => sum + p.netAmount, 0);
    const totalOverdue = payables
      .filter((p) => p.status === "Overdue")
      .reduce((sum, p) => sum + p.netAmount, 0);
    const uniquePayees = new Set(payables.map((p) => p.payeeName)).size;

    setSummary({ totalDue, totalPaid, totalOverdue, uniquePayees });
  }

  function toggleSelect(id) {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  }

  function toggleSelectAll() {
    if (selectedIds.size === filteredPayables.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredPayables.map((p) => p.id)));
    }
  }

  function openBatchModal() {
    const items = filteredPayables.filter((p) => selectedIds.has(p.id) && p.status === "Ready");
    setBatchItems(items);
    setBatchNote("");
    setShowBatchModal(true);
  }

  function processBatch() {
    // Mock processing: Mark selected items as "In Process" then "Paid" after delay
    setPayables((prev) =>
      prev.map((p) =>
        selectedIds.has(p.id) && p.status === "Ready"
          ? { ...p, status: "In Process" }
          : p
      )
    );
    setShowBatchModal(false);

    setTimeout(() => {
      setPayables((prev) =>
        prev.map((p) =>
          selectedIds.has(p.id) && p.status === "In Process"
            ? { ...p, status: "Paid", transactionId: `TXN${Math.floor(Math.random() * 100000)}` }
            : p
        )
      );
    }, 1500);
  }

  // --- Inline Styles ---
  const container = { fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", padding: 24, backgroundColor: "#f4f6f8", minHeight: "100vh" };
  const heading = { fontSize: 28, marginBottom: 20, color: "#333" };
  const summaryContainer = { display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 20 };
  const card = { backgroundColor: "#fff", padding: 16, borderRadius: 8, boxShadow: "0 2px 6px rgba(0,0,0,0.1)", flex: "1 1 200px", textAlign: "center" };
  const cardValue = { fontSize: 24, fontWeight: "600", marginTop: 8 };
  const filtersRow = { display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16, alignItems: "center", justifyContent: "space-between" };
  const inputStyle = { padding: "6px 10px", borderRadius: 4, border: "1px solid #ccc", minWidth: 120 };
  const button = { padding: "6px 14px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" };
  const buttonDisabled = { ...button, backgroundColor: "#999", cursor: "not-allowed" };
  const tableWrapper = { backgroundColor: "#fff", borderRadius: 8, overflowX: "auto", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" };
  const table = { width: "100%", borderCollapse: "collapse", minWidth: 900 };
  const th = { padding: "12px 8px", borderBottom: "2px solid #e0e0e0", backgroundColor: "#f8f9fa", textAlign: "left", whiteSpace: "nowrap" };
  const td = { padding: "10px 8px", borderBottom: "1px solid #eee", whiteSpace: "nowrap" };
  const actionBtn = { padding: "4px 8px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer", marginRight: 6 };
  const overlay = { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.3)", zIndex: 999 };
  const modal = { position: "fixed", top: "10%", left: "50%", transform: "translateX(-50%)", backgroundColor: "#fff", padding: 24, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.2)", zIndex: 1000, minWidth: 320, maxWidth: 500 };
  const formGroup = { marginBottom: 12 };

  return (
    <div style={container}>
      <h2 style={heading}>Payout Management (Vendor + Agent)</h2>

      {/* Summary Cards */}
      <div style={summaryContainer}>
        <div style={card}>
          <div>Total Payables Due</div>
          <div style={cardValue}>
            ${summary.totalDue.toFixed(2)}
          </div>
        </div>
        <div style={card}>
          <div>Total Paid</div>
          <div style={cardValue}>
            ${summary.totalPaid.toFixed(2)}
          </div>
        </div>
        <div style={card}>
          <div>Total Overdue</div>
          <div style={cardValue}>
            ${summary.totalOverdue.toFixed(2)}
          </div>
        </div>
        <div style={card}>
          <div># Unique Payees</div>
          <div style={cardValue}>
            {summary.uniquePayees}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={filtersRow}>
        <select
          style={inputStyle}
          value={filters.payeeType}
          onChange={(e) => setFilters({ ...filters, payeeType: e.target.value })}
        >
          {PAYEE_TYPE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        <select
          style={inputStyle}
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
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

        <select
          style={inputStyle}
          value={filters.currency}
          onChange={(e) => setFilters({ ...filters, currency: e.target.value })}
        >
          {CURRENCY_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        <input
          style={inputStyle}
          placeholder="Search ID or Name"
          value={filters.searchTerm}
          onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
        />

        <button
          style={selectedIds.size > 0 ? button : buttonDisabled}
          onClick={openBatchModal}
          disabled={selectedIds.size === 0}
        >
          Create Payout Batch
        </button>
      </div>

      {/* Payables Table */}
      <div style={tableWrapper}>
        <table style={table}>
          <thead>
            <tr>
              <th style={th}>
                <input
                  type="checkbox"
                  checked={
                    selectedIds.size === filteredPayables.length &&
                    filteredPayables.length > 0
                  }
                  onChange={toggleSelectAll}
                  aria-label="Select all payables"
                />
              </th>
              <th style={th}>Payable ID</th>
              <th style={th}>Payee Name</th>
              <th style={th}>Type</th>
              <th style={th}>Gross $</th>
              <th style={th}>Deductions $</th>
              <th style={th}>Net $</th>
              <th style={th}>Currency</th>
              <th style={th}>FX Base $</th>
              <th style={th}>Method</th>
              <th style={th}>Status</th>
              <th style={th}>Period</th>
              <th style={th}>TX ID</th>
              <th style={th}>Date Created</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayables.length === 0 ? (
              <tr>
                <td colSpan={15} style={{ textAlign: "center", padding: 20 }}>
                  No payables found.
                </td>
              </tr>
            ) : (
              filteredPayables.map((p) => (
                <tr key={p.id}>
                  <td style={td}>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(p.id)}
                      onChange={() => toggleSelect(p.id)}
                    />
                  </td>
                  <td style={td}>{p.id}</td>
                  <td style={td}>{p.payeeName}</td>
                  <td style={td}>{p.payeeType}</td>
                  <td style={td}>${p.grossAmount.toFixed(2)}</td>
                  <td style={td}>${p.deductions.toFixed(2)}</td>
                  <td style={td}>${p.netAmount.toFixed(2)}</td>
                  <td style={td}>{p.currency}</td>
                  <td style={td}>${p.fxBaseAmount.toFixed(2)}</td>
                  <td style={td}>{p.paymentMethod}</td>
                  <td style={td}>{p.status}</td>
                  <td style={td}>{p.period}</td>
                  <td style={td}>{p.transactionId}</td>
                  <td style={td}>{p.dateCreated}</td>
                  <td style={td}>
                    <button
                      style={{
                        ...actionBtn,
                        backgroundColor: p.status === "Paid" ? "#6c757d" : "#28a745",
                        cursor: p.status === "Paid" ? "not-allowed" : "pointer",
                      }}
                      onClick={() =>
                        p.status === "Ready" &&
                        setPayables((prev) =>
                          prev.map((x) =>
                            x.id === p.id
                              ? { ...x, status: "In Process" }
                              : x
                          )
                        ) &&
                        setTimeout(() => {
                          setPayables((prev) =>
                            prev.map((x) =>
                              x.id === p.id
                                ? {
                                    ...x,
                                    status: "Paid",
                                    transactionId: `TXN${Math.floor(Math.random() * 100000)}`,
                                  }
                                : x
                            )
                          );
                        }, 1000)
                      }
                      disabled={p.status !== "Ready"}
                    >
                      {p.status === "Paid" ? "Paid" : "Mark Paid"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Batch Creation Modal */}
      {showBatchModal && (
        <>
          <div style={overlay} onClick={() => setShowBatchModal(false)}></div>
          <div style={modal}>
            <h3>Create Payout Batch</h3>
            <div style={formGroup}>
              <label>
                Batch Note (Optional):
                <textarea
                  style={{ ...inputStyle, marginTop: 6, width: "100%", height: 60 }}
                  value={batchNote}
                  onChange={(e) => setBatchNote(e.target.value)}
                />
              </label>
            </div>
            <div style={formGroup}>
              <strong>
                {batchItems.length} Payable{batchItems.length !== 1 && "s"} Selected,
                Total Net: $
                {batchItems
                  .reduce((sum, p) => sum + p.netAmount, 0)
                  .toFixed(2)}
              </strong>
            </div>
            <div style={{ textAlign: "right", marginTop: 16 }}>
              <button
                style={{ ...button, marginRight: 8 }}
                disabled={batchItems.length === 0}
                onClick={processBatch}
              >
                Process Batch
              </button>
              <button
                style={{ ...button, backgroundColor: "#dc3545" }}
                onClick={() => setShowBatchModal(false)}
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

export default PayoutManagementPage;
