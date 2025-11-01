import React, { useState, useEffect } from 'react';

const RiderAllocationPage = () => {
  const [riders, setRiders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState('');
  const [assignModal, setAssignModal] = useState(false);

  useEffect(() => {
    // Mock data
    setRiders([
      { id: 1, name: 'Ravi Kumar', phone: '9876543210', status: 'Available' },
      { id: 2, name: 'Sneha Reddy', phone: '7894561230', status: 'On Delivery' },
      { id: 3, name: 'Ajay Singh', phone: '9998887770', status: 'Available' },
    ]);
    setOrders([
      { id: 'ORD001', customer: 'Anita Verma', items: 3, area: 'Sector 12', status: 'Pending' },
      { id: 'ORD002', customer: 'Manoj Sharma', items: 2, area: 'MG Road', status: 'Pending' },
    ]);
  }, []);

  const handleAssign = (order) => {
    setSelectedOrder(order);
    setAssignModal(true);
  };

  const confirmAssign = (rider) => {
    alert(`Order ${selectedOrder.id} assigned to ${rider.name}`);
    setAssignModal(false);
    setSelectedOrder(null);
  };

  const filteredRiders = riders.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Rider Allocation</h2>

      <div style={styles.section}>
        <h3 style={styles.subheading}>Orders to Assign</h3>
        {orders.map((order) => (
          <div key={order.id} style={styles.card}>
            <div>
              <strong>Order ID:</strong> {order.id}<br />
              <strong>Customer:</strong> {order.customer}<br />
              <strong>Area:</strong> {order.area}
            </div>
            <button style={styles.button} onClick={() => handleAssign(order)}>
              Assign Rider
            </button>
          </div>
        ))}
      </div>

      {assignModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Assign Rider for Order {selectedOrder.id}</h3>
            <input
              type="text"
              placeholder="Search Rider..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.input}
            />
            <div style={{ maxHeight: 200, overflowY: 'auto' }}>
              {filteredRiders.map((rider) => (
                <div key={rider.id} style={styles.riderCard}>
                  <div>
                    <strong>{rider.name}</strong><br />
                    {rider.phone} ({rider.status})
                  </div>
                  <button
                    style={styles.smallButton}
                    disabled={rider.status !== 'Available'}
                    onClick={() => confirmAssign(rider)}
                  >
                    Assign
                  </button>
                </div>
              ))}
            </div>
            <button style={styles.cancelButton} onClick={() => setAssignModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    height: '100vh',
    maxHeight: '90vh',
    margin: '0 auto',
  },
  title: {
    fontSize: '34px',
    marginBottom: '20px',
    textAlign: 'center',
   
  },
  subheading: {
    fontSize: '18px',
    marginBottom: '20px',
    color: '#333',
    paddingLeft: '15px',
  },
  section: {
    marginBottom: '30px',
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    border: '1px solid #ccc',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '10px',
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: 'rgba(23, 65, 133, 0.79)',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '10px 20px',
    marginTop:'15px',
    width: '200px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',

 
  },
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '10px',
    width: '400px',
    maxHeight: '80vh',
    overflowY: 'auto',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  riderCard: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    padding: '10px',
    background: '#f1f1f1',
    borderRadius: '6px',
  },
  smallButton: {
    padding: '6px 10px',
    fontSize: '14px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    marginTop: '10px',
    backgroundColor: '#999',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default RiderAllocationPage;
