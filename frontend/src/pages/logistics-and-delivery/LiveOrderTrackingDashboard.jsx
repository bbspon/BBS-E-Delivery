import React, { useState, useEffect } from 'react';

const mockOrders = [
  {
    id: 'ORD12345',
    customer: 'Ravi Kumar',
    status: 'In Transit',
    rider: 'Ramesh',
    deliveryETA: '10 mins',
    lastUpdated: '2 mins ago',
    location: 'M.G Road, Bangalore',
  },
  {
    id: 'ORD12346',
    customer: 'Sneha Sharma',
    status: 'Delivered',
    rider: 'Ankit',
    deliveryETA: 'Delivered',
    lastUpdated: '20 mins ago',
    location: 'HSR Layout, Bangalore',
  },
  {
    id: 'ORD12347',
    customer: 'John Doe',
    status: 'Cancelled',
    rider: 'Vikas',
    deliveryETA: 'Cancelled',
    lastUpdated: '5 mins ago',
    location: 'Koramangala, Bangalore',
  },
];

const statusColors = {
  'In Transit': '#FFA500',
  Delivered: '#4CAF50',
  Cancelled: '#F44336',
};

const LiveOrderDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulate real-time fetch
    setOrders(mockOrders);
  }, []);

  const filteredOrders = orders.filter(order =>
    (filter === 'All' || order.status === filter) &&
    order.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Live Order Tracking</h2>

      {/* Filter + Search Bar */}
      <div style={styles.toolbar}>
        <div style={styles.filters}>
          {['All', 'In Transit', 'Delivered', 'Cancelled'].map(stat => (
            <button
              key={stat}
              onClick={() => setFilter(stat)}
              style={{
                ...styles.filterButton,
                backgroundColor: filter === stat ? '#007bff' : '#f0f0f0',
                color: filter === stat ? '#fff' : '#000',
              }}
            >
              {stat}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search by customer name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* Order List */}
      <div style={styles.orderList}>
        {filteredOrders.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: 40 }}>No orders found.</p>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} style={styles.orderCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={styles.orderId}>#{order.id}</h3>
                  <p style={styles.detail}><strong>Customer:</strong> {order.customer}</p>
                  <p style={styles.detail}><strong>Status:</strong> 
                    <span style={{ color: statusColors[order.status], fontWeight: '600' }}>
                      {` ${order.status}`}
                    </span>
                  </p>
                  <p style={styles.detail}><strong>ETA:</strong> {order.deliveryETA}</p>
                </div>
                <div>
                  <p style={styles.detail}><strong>Rider:</strong> {order.rider}</p>
                  <p style={styles.detail}><strong>Location:</strong> {order.location}</p>
                  <p style={styles.detail}><strong>Last Updated:</strong> {order.lastUpdated}</p>
                </div>
              </div>
              {/* Future feature placeholder */}
              <div style={styles.timeline}>
                <span style={styles.timelineDot}></span>
                <div style={styles.timelineBar}></div>
                <span style={styles.timelineDot}></span>
                <div style={styles.timelineBar}></div>
                <span style={{ ...styles.timelineDot, backgroundColor: statusColors[order.status] }}></span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: 20,
    fontFamily: 'Arial, sans-serif',
    maxWidth: 1000,
    height: '100vh',
    marginTop: 40,
    margin: 'auto',
  },
  header: {
    fontSize: 26,
    marginBottom: 20,
    textAlign: 'center',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  filters: {
    display: 'flex',
    gap: 10,
    marginBottom: 10,
  },
  filterButton: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontWeight: '600',
  },
  searchInput: {
    padding: 8,
    borderRadius: 4,
    border: '1px solid #ccc',
    flexGrow: 1,
    maxWidth: 300,
  },
  orderList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  orderCard: {
    padding: 20,
    borderRadius: 6,
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  orderId: {
    margin: '0 0 5px 0',
    fontSize: 18,
  },
  detail: {
    margin: '2px 0',
    fontSize: 14,
  },
  timeline: {
    marginTop: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: '50%',
    backgroundColor: '#ccc',
  },
  timelineBar: {
    flexGrow: 1,
    height: 2,
    backgroundColor: '#ddd',
    margin: '0 5px',
  },
};

export default LiveOrderDashboard;
