import React, { useState } from "react";


const dummyData = [
  {
    id: "ORD123",
    date: "2025-05-28",
    module: "E-Commerce",
    vendor: "SuperMart",
    amount: 1200,
    payment: "UPI",
    status: "Completed",
  },
  {
    id: "ORD124",
    date: "2025-05-29",
    module: "Food",
    vendor: "BBQ Palace",
    amount: 740,
    payment: "COD",
    status: "Refunded",
  },
  {
    id: "ORD125",
    date: "2025-05-29",
    module: "Water",
    vendor: "HydroLife",
    amount: 300,
    payment: "Card",
    status: "Completed",
  },
];

const SalesReportPage = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filter, setFilter] = useState("");
  const [chartType, setChartType] = useState("bar");

  const filteredData = dummyData.filter((item) =>
    item.vendor.toLowerCase().includes(filter.toLowerCase())
  );

  const totalSales = filteredData.reduce((acc, cur) => acc + cur.amount, 0);
  const totalOrders = filteredData.length;
  const avgOrderValue = totalOrders > 0 ? (totalSales / totalOrders).toFixed(2) : 0;
  const refunds = filteredData.filter((d) => d.status === "Refunded").length;

  return (
   <>
    <div style={styles.container}>
      <h2 style={styles.heading}>📈 Sales Report Dashboard</h2>

      <div style={styles.filters}>
        <div>
          <label className="mx-2">From: </label>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        </div>
        <div>
          <label className="mx-2">To: </label>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </div>
        <div>
          <label className="mx-2">Search Vendor: </label>
          <input
            type="text"
            placeholder="Type vendor name..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div>
          <button style={{ backgroundColor: "#007baf", color: "#fff" , border:"none",padding:"4px 10px"}} onClick={() => setChartType(chartType === "bar" ? "line" : "bar")}>
            Toggle Chart: {chartType}
          </button>
        </div>
      </div>

      <div style={styles.summaryCards}>
        <div style={styles.card}>
          <h4>Total Sales</h4>
          <p>₹{totalSales}</p>
        </div>
        <div style={styles.card}>
          <h4>Total Orders</h4>
          <p>{totalOrders}</p>
        </div>
        <div style={styles.card}>
          <h4>Avg Order Value</h4>
          <p>₹{avgOrderValue}</p>
        </div>
        <div style={styles.card}>
          <h4>Refunds</h4>
          <p>{refunds}</p>
        </div>
      </div>

      <div style={styles.exportRow}>
        <button style={{ backgroundColor: "#7baf", color: "#fff" , border:"none",padding:"4px 10px"}}>Export CSV</button>
        <button style={{ backgroundColor: "#007baf", color: "#fff" , border:"none",padding:"4px 10px"}}>Export PDF</button>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Module</th>
              <th>Vendor</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>{order.module}</td>
                <td>{order.vendor}</td>
                <td>₹{order.amount}</td>
                <td>{order.payment}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
   </>
  );
};

const styles = {
  container: {
    padding: "3rem 50px",
    fontFamily: "Segoe UI, sans-serif",
    height: "100vh",
  },
  heading: {
    fontSize: "1.8rem",
    marginBottom: "3rem",
    textAlign: "center",
  },
  filters: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #ccc",
    gap: "1rem",
    flexWrap: "wrap",
    marginBottom: "1rem",
    paddingBottom: "1.2rem",
  },
  summaryCards: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    margin: "2.2rem 0",
  },
  card: {
    flex: "1",
    padding: "1rem",
    borderRadius: "8px",
    minWidth: "150px",
    textAlign: "center",
    border: "1px solid black",
    backgroundColor: "quaternary"
  },
  exportRow: {
    marginBottom: "1rem",
    display: "flex",
    gap: "1rem",
  },
  tableContainer: {
    overflowX: "auto",
    marginBottom: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "1.5rem ",
    paddingLeft: "6rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.9rem",
  },
  tableThTd: {
    padding: "0.75rem",
    borderBottom: "1px solid #ccc",
    textAlign: "left",
  },
};

export default SalesReportPage;
