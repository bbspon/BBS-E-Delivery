import React, { useState } from "react";

// Sample data
const dummyCustomers = [
  {
    id: "CUS101",
    name: "Rohan Singh",
    lastOrderDate: "2025-05-25",
    totalOrders: 5,
    module: "Food",
    status: "Loyal",
  },
  {
    id: "CUS102",
    name: "Anita Desai",
    lastOrderDate: "2025-04-15",
    totalOrders: 1,
    module: "E-Commerce",
    status: "New",
  },
  {
    id: "CUS103",
    name: "Suresh Kumar",
    lastOrderDate: "2024-12-10",
    totalOrders: 0,
    module: "Water",
    status: "Churned",
  },
  {
    id: "CUS104",
    name: "Meena Patel",
    lastOrderDate: "2025-05-10",
    totalOrders: 3,
    module: "Food",
    status: "Returning",
  },
];

// Utility to parse date string to Date object
const parseDate = (dateStr) => new Date(dateStr);

const CustomerRetentionReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [segment, setSegment] = useState("");
  const [moduleFilter, setModuleFilter] = useState("");

  // Filter customers based on filters
  const filteredCustomers = dummyCustomers.filter((cust) => {
    const custDate = parseDate(cust.lastOrderDate);
    const startOk = startDate ? custDate >= parseDate(startDate) : true;
    const endOk = endDate ? custDate <= parseDate(endDate) : true;
    const segmentOk = segment ? cust.status === segment : true;
    const moduleOk = moduleFilter ? cust.module === moduleFilter : true;
    return startOk && endOk && segmentOk && moduleOk;
  });

  // Summary metrics calculation
  const totalCustomers = filteredCustomers.length;
  const newCustomers = filteredCustomers.filter(
    (c) => c.status === "New"
  ).length;
  const returningCustomers = filteredCustomers.filter(
    (c) => c.status === "Returning"
  ).length;
  const churnedCustomers = filteredCustomers.filter(
    (c) => c.status === "Churned"
  ).length;

  const churnRate = totalCustomers
    ? ((churnedCustomers / totalCustomers) * 100).toFixed(2)
    : 0;

  // Pagination states (optional basic implementation)
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 5;
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * customersPerPage,
    currentPage * customersPerPage
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📈 Customer Retention Report</h2>

      <div style={styles.filters}>
        <div className="d-flex flex-column flex-sm-row gap-2">
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={styles.input}
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={styles.input}
            />
          </label>
        </div>

        <div className="d-flex flex-column flex-sm-row gap-2">
          <label>
            Segment:
            <select
              value={segment}
              onChange={(e) => setSegment(e.target.value)}
              style={styles.select}
            >
              <option  value="">All</option>
              <option value="New">New</option>
              <option value="Returning">Returning</option>
              <option value="Loyal">Loyal</option>
              <option value="Churned">Churned</option>
            </select>
          </label>
          <label>
            Module:
            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              style={styles.select}
            >
              <option value="">All</option>
              <option value="Food">Food</option>
              <option value="Water">Water</option>
              <option value="E-Commerce">E-Commerce</option>
            </select>
          </label>
        </div>

        <div className="d-flex flex-column flex-sm-row gap-2">
          <button style={styles.button}>Export CSV</button>
          <button style={styles.button}>Export PDF</button>
        </div>
      </div>

      <div style={styles.summaryRow}>
        <div style={styles.card}>
          <h4>Total Customers</h4>
          <p>{totalCustomers}</p>
        </div>
        <div style={styles.card}>
          <h4>New Customers</h4>
          <p>{newCustomers}</p>
        </div>
        <div style={styles.card}>
          <h4>Returning Customers</h4>
          <p>{returningCustomers}</p>
        </div>
        <div style={styles.card}>
          <h4>Churn Rate</h4>
          <p>{churnRate}%</p>
        </div>
      </div>

      <div className="d-flex flex-column flex-sm-row gap-2 mt-4" 
      style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "1rem", paddingLeft: "4rem" }}>
         <table style={styles.table}>
        <thead>
          <tr >
            <th>Customer ID</th>
            <th>Name</th>
            <th>Last Order Date</th>
            <th>Total Orders</th>
            <th>Module</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCustomers.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "1rem" }}>
                No customers found for selected filters.
              </td>
            </tr>
          ) : (
            paginatedCustomers.map((cust) => (
              <tr key={cust.id}>
                <td>{cust.id}</td>
                <td>{cust.name}</td>
                <td>{cust.lastOrderDate}</td>
                <td>{cust.totalOrders}</td>
                <td>{cust.module}</td>
                <td>{cust.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>

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
    padding: "3rem",
    height: "100vh",
  },
  heading: {
    fontSize: "1.8rem",
    textAlign: "center",
    marginBottom: "3rem",
  },
  filters: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #ccc",
    paddingBottom: "2.2rem",
    gap: "1rem",
    flexWrap: "wrap",
    marginBottom: "1.5rem",
    
  },
  input: {
    marginLeft: "0.5rem",
    padding: "0.1rem 0.3rem",
    fontSize: "1rem",
  },
  select: {
    marginLeft: "0.5rem",
    padding: "0.1rem 0.3rem",
    fontSize: "1rem",
  },
  button: {
    padding: "0.2rem 0.8rem",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "4px",
    color: "#fff",
    cursor: "pointer",
  },
  summaryRow: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    margin: "2.5rem 0",
  },
  card: {
    backgroundColor: "#f8f9fa",
    padding: "1rem",
    borderRadius: "6px",
    flex: "1",
    minWidth: "140px",
    textAlign: "center",
    border: "1px solid #ccc",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.27)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "1rem",
  },
  th: {
    backgroundColor: "#e9ecef",
    textAlign: "left",
    padding: "0.75rem",
  },
  td: {
    borderBottom: "1px solid #dee2e6",
    padding: "0.75rem",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
  },
  pageButton: {
    padding: "0.5rem 1rem",
    border: "1px solid #ced4da",
    borderRadius: "4px",
    backgroundColor: "#fff",
    cursor: "pointer",
  },
};

export default CustomerRetentionReport;
