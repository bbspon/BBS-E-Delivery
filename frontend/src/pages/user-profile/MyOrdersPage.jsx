import React, { useState, useEffect } from 'react';

const mockOrders = [
  {
    id: 'ORD1001',
    date: '2025-05-20 14:35',
    module: 'Grocery',
    vendor: 'Fresh Mart',
    items: ['Rice', 'Atta'],
    total: 549,
    status: 'Delivered',
    deliveryDate: '2025-05-22',
  },
  {
    id: 'ORD1002',
    date: '2025-05-21 12:10',
    module: 'Food',
    vendor: 'Spice Kitchen',
    items: ['Burger', 'Coke'],
    total: 299,
    status: 'Cancelled',
    deliveryDate: 'N/A',
  },
  {
    id: 'ORD1003',
    date: '2025-05-22 09:15',
    module: 'Water Can',
    vendor: 'Bisleri Vendor',
    items: ['20L Bisleri Can'],
    total: 120,
    status: 'In Transit',
    deliveryDate: '2025-05-27',
  },
];

const modules = ['All', 'Grocery', 'Food', 'Water Can', 'Cancelled'];

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    // Simulate fetch
    setOrders(mockOrders);
  }, []);

  const getIcon = (module) => {
    switch (module) {
      case 'Grocery': return '🛒';
      case 'Food': return '🍔';
      case 'Water Can': return '💧';
      default: return '📦';
    }
  };

  const filteredOrders = orders.filter(order =>
    filter === 'All' ? true :
    filter === 'Cancelled' ? order.status === 'Cancelled' :
    order.module === filter
  );

  const handleReorder = (order) => {
    console.log('Reordering:', order);
    alert(`Items from Order #${order.id} added to cart.`);
  };

  return (
    <div style={styles.container}>
        <div style={styles.title} className=' d-flex justify-content-between align-items-center pe-3 '>
             <h2 >My Orders</h2>
             <span style={{cursor:'pointer'}}>Back</span>
         </div>
      {/* Filters */}
      <div style={styles.filterTabs}>
        {modules.map((mod) => (
          <button
            key={mod}
            onClick={() => setFilter(mod)}
            style={{
              ...styles.tab,
              backgroundColor: filter === mod ? '#2874f0' : '#eee',
              color: filter === mod ? '#fff' : '#333',
            }}
          >
            {mod}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div>
        {filteredOrders.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: 40 }}>No orders found.</p>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} style={styles.card}>
              <div style={styles.cardTop}>
                <div style={styles.icon}>{getIcon(order.module)}</div>
                <div>
                  <div style={styles.vendor}>{order.vendor}</div>
                  <div style={styles.meta}>{order.items.length} items – {order.items.join(', ')}</div>
                </div>
                <div style={styles.status}>{order.status}</div>
              </div>
              <div style={styles.details}>
                <span><strong>Order ID:</strong> {order.id}</span>
                <span><strong>Date:</strong> {order.date}</span>
                <span><strong>Total:</strong> ₹{order.total}</span>
                <span><strong>Delivery:</strong> {order.deliveryDate}</span>
              </div>
              <div style={styles.actions}>
                <button style={styles.detailBtn}>View Details</button>
                <button style={styles.reorderBtn} onClick={() => handleReorder(order)}>Reorder</button>
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
    
    width: '100%',
    height: '100vh',
    margin: '40px auto',
    padding: '0 20px',
    fontFamily: 'Segoe UI, sans-serif',
  },
  title: {
    fontSize: 20,
    
    marginBottom: 20,
    borderBottom: '2px solid #eee',
    paddingBottom: 10,
  },
  filterTabs: {
    display: 'flex',
    gap: 10,
    marginBottom: 25,
    flexWrap: 'wrap',
  },
  tab: {
    padding: '8px 16px',
    borderRadius: 20,
    border: 'none',
    cursor: 'pointer',
    fontWeight: 500,
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
    margin:"35px 20px",
  },
  cardTop: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
    marginBottom: 10,
  },
  icon: {
    fontSize: 24,
  },
  vendor: {
    fontWeight: 600,
    fontSize: 16,
  },
  meta: {
    fontSize: 13,
    color: '#666',
  },
  status: {
    marginLeft: 'auto',
    fontWeight: 600,
    color: '#2874f0',
    fontSize: 14,
  },
  details: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 20,
    fontSize: 13,
    color: '#555',
    marginTop: 8,
    marginBottom: 10,
  },
  actions: {
    display: 'flex',
    gap: 10,
  },
  detailBtn: {
    padding: '6px 12px',
    border: '1px solid #ccc',
    background: '#fff',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 14,
  },
  reorderBtn: {
    padding: '6px 12px',
    border: 'none',
    background: '#fb641b',
    color: '#fff',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 14,
  },
};

export default MyOrdersPage;
