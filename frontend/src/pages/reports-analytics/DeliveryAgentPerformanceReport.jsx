import React, { useState, useMemo } from "react";

// Sample delivery agent performance data
const dummyAgents = [
  {
    id: "DA101",
    name: "Rahul Sharma",
    totalDeliveries: 120,
    onTimePercent: 95,
    avgDeliveryTimeMins: 28,
    avgCustomerRating: 4.7,
    lastActiveDate: "2025-05-28",
  },
  {
    id: "DA102",
    name: "Pooja Verma",
    totalDeliveries: 80,
    onTimePercent: 90,
    avgDeliveryTimeMins: 33,
    avgCustomerRating: 4.3,
    lastActiveDate: "2025-05-25",
  },
  {
    id: "DA103",
    name: "Amit Joshi",
    totalDeliveries: 150,
    onTimePercent: 97,
    avgDeliveryTimeMins: 26,
    avgCustomerRating: 4.9,
    lastActiveDate: "2025-05-29",
  },
  {
    id: "DA104",
    name: "Sneha Kulkarni",
    totalDeliveries: 45,
    onTimePercent: 85,
    avgDeliveryTimeMins: 40,
    avgCustomerRating: 4.1,
    lastActiveDate: "2025-05-20",
  },
];

// Helper: parse date string to Date object
const parseDate = (dateStr) => new Date(dateStr);

const DeliveryAgentPerformanceReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const agentsPerPage = 5;

  // Filter by date range & agent selection
  const filteredAgents = useMemo(() => {
    return dummyAgents.filter((agent) => {
      // Filter by lastActiveDate within date range if set
      const activeDate = parseDate(agent.lastActiveDate);
      const startOk = startDate ? activeDate >= parseDate(startDate) : true;
      const endOk = endDate ? activeDate <= parseDate(endDate) : true;
      const agentOk = selectedAgent ? agent.id === selectedAgent : true;

      // Filter by search term on id or name
      const searchOk =
        agent.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.name.toLowerCase().includes(searchTerm.toLowerCase());

      return startOk && endOk && agentOk && searchOk;
    });
  }, [startDate, endDate, selectedAgent, searchTerm]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredAgents.length / agentsPerPage);
  const paginatedAgents = filteredAgents.slice(
    (currentPage - 1) * agentsPerPage,
    currentPage * agentsPerPage
  );

  // Summary calculations on filtered agents
  const totalDeliveries = filteredAgents.reduce(
    (sum, agent) => sum + agent.totalDeliveries,
    0
  );

  const avgOnTimePercent = filteredAgents.length
    ? (
        filteredAgents.reduce((sum, agent) => sum + agent.onTimePercent, 0) /
        filteredAgents.length
      ).toFixed(2)
    : 0;

  const avgDeliveryTime = filteredAgents.length
    ? (
        filteredAgents.reduce((sum, agent) => sum + agent.avgDeliveryTimeMins, 0) /
        filteredAgents.length
      ).toFixed(2)
    : 0;

  const avgCustomerRating = filteredAgents.length
    ? (
        filteredAgents.reduce((sum, agent) => sum + agent.avgCustomerRating, 0) /
        filteredAgents.length
      ).toFixed(2)
    : 0;

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🚴 Delivery Agent Performance Report</h2>

      <div style={styles.filters}>
        <label style={styles.label}>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setCurrentPage(1);
            }}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              setCurrentPage(1);
            }}
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Select Agent:
          <select
            value={selectedAgent}
            onChange={(e) => {
              setSelectedAgent(e.target.value);
              setCurrentPage(1);
            }}
            style={styles.select}
          >
            <option value="">All Agents</option>
            {dummyAgents.map((agent) => (
              <option key={agent.id} value={agent.id}>
                {agent.name} ({agent.id})
              </option>
            ))}
          </select>
        </label>

        <label style={{ ...styles.label, flexGrow: 1 }}>
          Search:
          <input
            type="text"
            placeholder="Search by ID or Name"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            style={styles.input}
          />
        </label>

        <button style={styles.button}>Export CSV</button>
        <button style={styles.button}>Export PDF</button>
      </div>

      <div style={styles.summaryRow}>
        <div style={styles.card}>
          <h4>Total Deliveries</h4>
          <p>{totalDeliveries}</p>
        </div>
        <div style={styles.card}>
          <h4>On-Time Delivery Rate</h4>
          <p>{avgOnTimePercent} %</p>
        </div>
        <div style={styles.card}>
          <h4>Average Delivery Time</h4>
          <p>{avgDeliveryTime} mins</p>
        </div>
        <div style={styles.card}>
          <h4>Average Customer Rating</h4>
          <p>{avgCustomerRating} / 5</p>
        </div>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Agent ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Total Deliveries</th>
            <th style={styles.th}>On-Time %</th>
            <th style={styles.th}>Avg Delivery Time (mins)</th>
            <th style={styles.th}>Avg Customer Rating</th>
          </tr>
        </thead>
        <tbody>
          {paginatedAgents.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "1rem" }}>
                No agents found for the selected filters.
              </td>
            </tr>
          ) : (
            paginatedAgents.map((agent) => (
              <tr key={agent.id}>
                <td style={styles.td}>{agent.id}</td>
                <td style={styles.td}>{agent.name}</td>
                <td style={styles.td}>{agent.totalDeliveries}</td>
                <td style={styles.td}>{agent.onTimePercent}%</td>
                <td style={styles.td}>{agent.avgDeliveryTimeMins}</td>
                <td style={styles.td}>{agent.avgCustomerRating.toFixed(1)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div style={styles.pagination}>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            style={styles.pageButton}
          >
            Prev
          </button>
          <span style={{ margin: "0 1rem" }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={styles.pageButton}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "2rem",
    height: "100vh",
  },
  heading: {
    fontSize: "1.8rem",
    marginBottom: "3.5rem",
  },
  filters: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    marginBottom: "1.5rem",
    alignItems: "center",
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "0.9rem",
    minWidth: "150px",
  },
  input: {
    marginTop: "0.3rem",
    padding: "0.3rem 0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  select: {
    marginTop: "0.3rem",
    padding: "0.3rem 0.5rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "0.3rem 1rem",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    color: "#fff",
    cursor: "pointer",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    margin: "3rem 0",
    gap: "1rem",
    flexWrap: "wrap",
    
  },
  card: {
    flex: "1 1 20%",
    backgroundColor: "#f5f5f5",
    padding: "1rem",
    borderRadius: "6px",
    textAlign: "center",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    margin: "5rem 0",
  },
  th: {
    borderBottom: "2px solid #ddd",
    padding: "0.75rem",
    textAlign: "left",
    backgroundColor: "#007bff",
    color: "white",
  },
  td: {
    borderBottom: "1px solid #ddd",
    padding: "0.75rem",
    textAlign: "left",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    marginTop: "1rem",
  },
  pageButton: {
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    border: "1px solid #007bff",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    disabled: {
      backgroundColor: "#ccc",
      cursor: "not-allowed",
    },
  },
};

export default DeliveryAgentPerformanceReport;
