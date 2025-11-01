import React, { useState } from "react";
import RouteOptimizationPage from "../order-ship/RouteOptimizationPage";
import AgentLiveLocationPage from "../order-ship/AgentLiveLocationPage";
import DeliveryAnalyticsPage from "../agent/DeliveryAnalyticsPage";
import DeliveryHistoryPage from "./DeliveryHistoryPage";
import TrackOrderPage from "../order-ship/TrackOrderPage";

const mockOrders = [
  {
    id: "ORD123456",
    customerName: "Ramesh Kumar",
    mobile: "9876543210",
    address: "45 MG Road, Indiranagar, Bangalore",
    items: 3,
    time: "10:15 AM",
  },
  {
    id: "ORD123457",
    customerName: "Priya Singh",
    mobile: "9876501234",
    address: "12 Residency Road, Bangalore",
    items: 2,
    time: "10:45 AM",
  },
];

const DeliveryAgentDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [online, setOnline] = useState(true);
  const [orders, setOrders] = useState(mockOrders);

  const handleDelivered = (id) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return (
          <>
            <div style={styles.header}>
              <h2>Welcome, Delivery Agent</h2>
              <div>
                <label style={{ fontWeight: 500, marginRight: 8 }}>
                  Status:
                </label>
                <input
                  type="checkbox"
                  checked={online}
                  onChange={() => setOnline(!online)}
                />
                <span style={{ marginLeft: 5 }}>
                  {online ? "Online" : "Offline"}
                </span>
              </div>
            </div>

            <div style={styles.cardsGrid}>
              <div style={styles.card}>
                <h4>Deliveries Today</h4>
                <p>5</p>
              </div>
              <div style={styles.card}>
                <h4>Pending Orders</h4>
                <p>{orders.length}</p>
              </div>
              <div style={styles.card}>
                <h4>Earnings Today</h4>
                <p>₹350</p>
              </div>
            </div>
          </>
        );

      case "My Deliveries":
        return (
          <div>
            <h3>Live Orders</h3>
            {online ? (
              orders.length > 0 ? (
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Mobile</th>
                      <th>Address</th>
                      <th>Items</th>
                      <th>Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.customerName}</td>
                        <td>{order.mobile}</td>
                        <td>{order.address}</td>
                        <td>{order.items}</td>
                        <td>{order.time}</td>
                        <td>
                          <button
                            style={styles.actionBtn}
                            onClick={() => handleDelivered(order.id)}
                          >
                            Mark as Delivered
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={{ color: "#777" }}>No live orders assigned.</p>
              )
            ) : (
              <p style={{ color: "red" }}>You are currently offline.</p>
            )}
          </div>
        );
      case "📍 Route Optimization":
        return <RouteOptimizationPage />;
        // case "Live Location":
        //   return <AgentLiveLocationPage />;
      case "Analytics":
        return <DeliveryAnalyticsPage />;
      case "History":
        return <DeliveryHistoryPage />;
      case "TrackOrder":
        return <TrackOrderPage />;
      case "Earnings":
        return (
          <div>
            <h3>Today's Earnings</h3>
            <p>Total Deliveries: 5</p>
            <p>Total Amount: ₹350</p>
            <p>Delivery Bonus: ₹50</p>
            <p>Net Payout: ₹400</p>
          </div>
        );

      case "Profile":
        return (
          <div>
            <h3>Agent Profile</h3>
            <p>Name: Ramesh Kumar</p>
            <p>Mobile: 9876543210</p>
            <p>Email: ramesh.agent@bbscart.com</p>
            <p>Vehicle: Bike</p>
          </div>
        );

      case "Logout":
        alert("You have been logged out.");
        // In real app, you'd clear auth and redirect
        return <p>Logging out...</p>;

      default:
        return <p>Invalid Option</p>;
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>BBSCART</h2>
        <nav style={styles.nav}>
          {[
            "Dashboard",
            "My Deliveries",
            "📍 Route Optimization",
            // "Live Location",
            "Analytics",
            "Earnings",
            "Profile",
            "History",
            "Logout",
          ].map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                ...styles.navItem,
                background: activeTab === tab ? "#3d4f58" : "transparent",
              }}
            >
              {tab}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>{renderContent()}</main>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Segoe UI, sans-serif",
  },
  sidebar: {
    width: 220,
    background: "#2f3e46",
    color: "#fff",
    padding: 20,
  },
  logo: {
    marginBottom: 30,
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  navItem: {
    color: "#eee",
    padding: "10px 14px",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 15,
  },
  main: {
    flex: 1,
    background: "#f9f9f9",
    padding: 30,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 20,
    marginTop: 20,
  },
  card: {
    background: "#fff",
    border: "1px solid #ddd",
    padding: 20,
    borderRadius: 8,
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  table: {
    width: "100%",
    height: "100%",
    margin: 20,
    borderRadius: 8,
    overflow: "hidden",
    background: "#fff",
    borderCollapse: "collapse",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  actionBtn: {
    background: "#2874f0",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: 4,
    cursor: "pointer",
  },
};

export default DeliveryAgentDashboard;
