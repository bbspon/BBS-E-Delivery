import React, { useState } from "react";

const dummyOrders = [
  {
    id: "ORD301",
    customer: "Rahul Mehta",
    phone: "9876543210",
    module: "Food",
    vendor: "Pizza Palace",
    date: "2025-05-29",
    amount: 799,
    payment: "UPI",
    status: "Delivered",
  },
  {
    id: "ORD302",
    customer: "Nina Sharma",
    phone: "7894561230",
    module: "Water",
    vendor: "HydroWorld",
    date: "2025-05-28",
    amount: 250,
    payment: "COD",
    status: "Pending",
  },
  {
    id: "ORD303",
    customer: "Amit Verma",
    phone: "9123456789",
    module: "E-Commerce",
    vendor: "GadgetGo",
    date: "2025-05-27",
    amount: 2400,
    payment: "Card",
    status: "Cancelled",
  },
];

const OrderReportPage = () => {
  const [search, setSearch] = useState("");
  const [module, setModule] = useState("");
  const [status, setStatus] = useState("");
  const [payment, setPayment] = useState("");

  const filteredOrders = dummyOrders.filter((order) => {
    return (
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.phone.includes(search)
    ) &&
    (module ? order.module === module : true) &&
    (status ? order.status === status : true) &&
    (payment ? order.payment === payment : true);
  });

  const totalOrders = filteredOrders.length;
  const totalRevenue = filteredOrders.reduce((sum, o) => sum + o.amount, 0);
  const totalRefunds = filteredOrders.filter((o) => o.status === "Cancelled").length;
  const avgOrderValue = totalOrders ? (totalRevenue / totalOrders).toFixed(2) : 0;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📦 Order Report Page</h2>

      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search Order ID / Customer / Phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />
        
        <div style={{display:"flex",gap:"10px",padding:"0 15px"}}>
          <select value={module} onChange={(e) => setModule(e.target.value)} style={styles.select}>
          <option value="">All Modules</option>
          <option value="Food">Food</option>
          <option value="Water">Water</option>
          <option value="E-Commerce">E-Commerce</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} style={styles.select}>
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <select value={payment} onChange={(e) => setPayment(e.target.value)} style={styles.select}>
          <option value="">All Payment Modes</option>
          <option value="COD">COD</option>
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
        </select>
        </div>

       <div style={{display:"flex",gap:"10px",padding:"0 15px"}}>
         <button style={styles.button}>Export CSV</button>
        <button style={styles.button}>Export PDF</button>
       </div>
      </div>

      <div style={styles.summaryRow}>
        <div style={styles.card}>
          <h4>Total Orders</h4>
          <p>{totalOrders}</p>
        </div>
        <div style={styles.card}>
          <h4>Total Revenue</h4>
          <p>₹{totalRevenue}</p>
        </div>
        <div style={styles.card}>
          <h4>Refunds</h4>
          <p>{totalRefunds}</p>
        </div>
        <div style={styles.card}>
          <h4>Avg Order Value</h4>
          <p>₹{avgOrderValue}</p>
        </div>
      </div>

      <div className="p-3 bg-white rounded border">
        <table style={styles.table}>
        <thead style={{ backgroundColor: "#f2f2f2" ,padding:"10px 0"}}>
          <tr>
            <th style={{padding:"10px 0"}}>Order ID</th>
            <th>Customer</th>
            <th>Phone</th>
            <th>Module</th>
            <th>Vendor</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Payment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id}>
              <td style={{padding:"10px 0"}}>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.phone}</td>
              <td>{order.module}</td>
              <td>{order.vendor}</td>
              <td>{order.date}</td>
              <td>₹{order.amount}</td>
              <td>{order.payment}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "3rem",
    fontFamily: "Arial, sans-serif",
    height: "100vh",
    margin: "0 auto",
  },
  heading: {
    fontSize: "1.8rem",
    textAlign: "center",
    marginBottom: "2rem",
  },
  filters: {
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
    flexWrap: "wrap",
    marginBottom: "1.5rem",
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
    width: "100%",
    borderRadius: "10px",
    marginBottom: "1.2rem",
  },
  select: {
    padding: "0.5rem",
    fontSize: "1rem",
  },
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
   
    gap: "1rem",
    flexWrap: "wrap",
    marginBottom: "1.5rem",
  },
  card: {
    backgroundColor: "#f5f5f5",
    padding: "1rem",
    borderRadius: "8px",
    flex: "1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    marginBottom: "3rem",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  
  },
  th: {
    backgroundColor: "#eee",
    textAlign: "left",
    padding: "0.75rem",
  },
  td: {
    borderBottom: "1px solid #ccc",
    padding: "2.75rem",
  },
};

export default OrderReportPage;
