import React, { useState } from 'react';

const InventoryRefillPage = () => {
  const [inventoryRequests, setInventoryRequests] = useState([
    { id: 1, itemName: 'Bisleri 20L', quantity: 30, status: 'Pending' },
    { id: 2, itemName: 'LED Bulbs', quantity: 15, status: 'Approved' },
  ]);
  const [newItem, setNewItem] = useState({ itemName: '', quantity: '' });
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState({ itemName: '', quantity: '' });

  const handleAdd = () => {
    if (!newItem.itemName || !newItem.quantity) return alert('All fields are required');
    const newRequest = {
      id: Date.now(),
      itemName: newItem.itemName,
      quantity: parseInt(newItem.quantity),
      status: 'Pending',
    };
    setInventoryRequests([newRequest, ...inventoryRequests]);
    setNewItem({ itemName: '', quantity: '' });
  };

  const handleEdit = (id) => {
    const item = inventoryRequests.find((req) => req.id === id);
    setEditingId(id);
    setEditValue({ itemName: item.itemName, quantity: item.quantity });
  };

  const handleSave = (id) => {
    const updated = inventoryRequests.map((req) =>
      req.id === id
        ? { ...req, itemName: editValue.itemName, quantity: parseInt(editValue.quantity) }
        : req
    );
    setInventoryRequests(updated);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure to delete this item?')) {
      setInventoryRequests(inventoryRequests.filter((req) => req.id !== id));
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Inventory Refill Request</h2>

      {/* Add New Refill Request */}
      <div style={styles.addBox}>
        <input
          type="text"
          placeholder="Item name"
          value={newItem.itemName}
          onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
          style={styles.input}
        />
        <button onClick={handleAdd} style={styles.addButton}>Add</button>
      </div>

      {/* Inventory Table */}
      <table style={styles.table}>
        <thead>
          <tr style={styles.theadRow}>
            <th style={styles.th}>#</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventoryRequests.map((req, index) => (
            <tr key={req.id} style={styles.tbodyRow}>
              <td>{index + 1}</td>
              <td>
                {editingId === req.id ? (
                  <input
                    value={editValue.itemName}
                    onChange={(e) => setEditValue({ ...editValue, itemName: e.target.value })}
                    style={styles.editInput}
                  />
                ) : (
                  req.itemName
                )}
              </td>
              <td>
                {editingId === req.id ? (
                  <input
                    type="number"
                    value={editValue.quantity}
                    onChange={(e) => setEditValue({ ...editValue, quantity: e.target.value })}
                    style={styles.editInput}
                  />
                ) : (
                  req.quantity
                )}
              </td>
              <td>{req.status}</td>
              <td>
                {editingId === req.id ? (
                  <>
                    <button onClick={() => handleSave(req.id)} style={styles.saveButton}>Save</button>
                    <button onClick={handleCancel} style={styles.cancelButton}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(req.id)} style={styles.editButton}>Edit</button>
                    <button onClick={() => handleDelete(req.id)} style={styles.deleteButton}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryRefillPage;

// Inline CSS
const styles = {
  container: {
    padding: '30px',
    maxWidth: '1100px',
    height: '100vh',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
    padding: '45px',
  },
  heading: {
    fontSize: '30px',
    marginBottom: '25px',
    borderBottom: '2px solid #ddd',
    paddingBottom: '10px',
  },
  addBox: {
    display: 'flex',
    gap: '30px',
    marginBottom: '20px',
    marginTop: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    flex: '1',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#2196f3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    padding: '10px',
    marginBottom: '10px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  },
  theadRow: {
    backgroundColor: '#f5f5f5',
    textAlign: 'left',
  },
  tbodyRow: {
    borderBottom: '1px solid #eee',
    padding: '10px',
  },
  editInput: {
    padding: '6px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  editButton: {
    padding: '6px 10px',
    backgroundColor: '#ffc107',
    color: '#000',
    border: 'none',
    borderRadius: '4px',
    marginRight: '5px',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '6px 10px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  saveButton: {
    padding: '6px 10px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    marginRight: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '6px 10px',
    backgroundColor: '#9e9e9e',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
