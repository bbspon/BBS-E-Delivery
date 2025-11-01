import React, { useState } from 'react';

const initialAddresses = [
  {
    id: 1,
    name: 'John Doe',
    type: 'Home',
    mobile: '9876543210',
    street: '221B Baker Street',
    area: 'Central',
    city: 'London',
    pincode: '560001',
    isDefault: true,
  },
  {
    id: 2,
    name: 'Office Desk',
    type: 'Work',
    mobile: '9876543211',
    street: 'Tech Hub Building',
    area: 'Whitefield',
    city: 'Bangalore',
    pincode: '560066',
    isDefault: false,
  },
];

const MyAddressesPage = () => {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Home',
    mobile: '',
    street: '',
    area: '',
    city: '',
    pincode: '',
    isDefault: false,
  });

  const handleOpenModal = (edit = false, address = null) => {
    setEditMode(edit);
    setModalOpen(true);
    if (edit && address) {
      setFormData(address);
      setEditingId(address.id);
    } else {
      setFormData({
        name: '',
        type: 'Home',
        mobile: '',
        street: '',
        area: '',
        city: '',
        pincode: '',
        isDefault: false,
      });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(addresses.filter(addr => addr.id !== id));
    }
  };

  const handleSave = () => {
    const required = ['name', 'mobile', 'street', 'area', 'city', 'pincode'];
    for (let key of required) {
      if (!formData[key]) {
        alert(`Please fill ${key} field.`);
        return;
      }
    }

    if (formData.isDefault) {
      addresses.forEach(addr => addr.isDefault = false);
    }

    if (isEditMode) {
      setAddresses(addresses.map(addr => (addr.id === editingId ? { ...formData, id: editingId } : addr)));
    } else {
      setAddresses([...addresses, { ...formData, id: Date.now() }]);
    }

    setModalOpen(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Addresses</h2>

      {addresses.map((addr) => (
        <div key={addr.id} style={styles.card}>
          <div style={styles.cardHeader}>
            <strong>{addr.name}</strong> <span style={styles.tag}>{addr.type}</span>
            {addr.isDefault && <span style={styles.default}>Default</span>}
          </div>
          <div style={styles.addressLine}>
            {addr.street}, {addr.area}, {addr.city} – {addr.pincode}
          </div>
          <div style={styles.mobile}>📞 {addr.mobile}</div>
          <div style={styles.actions}>
            <button onClick={() => handleOpenModal(true, addr)} style={styles.editBtn}>Edit</button>
            <button onClick={() => handleDelete(addr.id)} style={styles.delBtn}>Delete</button>
          </div>
        </div>
      ))}

      {/* Add Address Button */}
      <button style={styles.fab} onClick={() => handleOpenModal(false)}>+ Add Address</button>

      {/* Modal */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>{isEditMode ? 'Edit Address' : 'Add New Address'}</h3>
            <div style={styles.form}>
              <input placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                <option>Home</option>
                <option>Work</option>
                <option>Other</option>
              </select>
              <input placeholder="Mobile Number" value={formData.mobile} onChange={e => setFormData({ ...formData, mobile: e.target.value })} />
              <input placeholder="Street" value={formData.street} onChange={e => setFormData({ ...formData, street: e.target.value })} />
              <input placeholder="Area" value={formData.area} onChange={e => setFormData({ ...formData, area: e.target.value })} />
              <input placeholder="City" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} />
              <input placeholder="Pincode" value={formData.pincode} onChange={e => setFormData({ ...formData, pincode: e.target.value })} />
              <label style={{ marginTop: 10 }}>
                <input type="checkbox" checked={formData.isDefault} onChange={e => setFormData({ ...formData, isDefault: e.target.checked })} />
                {' '}Set as default
              </label>
              <div style={styles.modalActions}>
                <button onClick={handleSave} style={styles.saveBtn}>Save</button>
                <button onClick={() => setModalOpen(false)} style={styles.cancelBtn}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding:'5% 60px', height: '100vh',width: '100%', margin: '0 auto', fontFamily: 'Segoe UI, sans-serif', backgroundColor: 'gray' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { border: '1px solid #ccc', borderRadius: 8, padding: 16, marginBottom: 15, background: '#fafafa' },
  cardHeader: { fontSize: 16, marginBottom: 6 },
  tag: { marginLeft: 10, padding: '2px 6px', background: '#eee', borderRadius: 4, fontSize: 12 },
  default: { marginLeft: 10, padding: '2px 6px', background: '#2874f0', color: 'white', borderRadius: 4, fontSize: 12 },
  addressLine: { fontSize: 14, color: '#555', marginBottom: 4 },
  mobile: { fontSize: 13, color: '#777' },
  actions: { marginTop: 10, display: 'flex', gap: 10 },
  editBtn: { background: '#2874f0', color: 'white', border: 'none', padding: '6px 10px', borderRadius: 4, cursor: 'pointer' },
  delBtn: { background: '#e53935', color: 'white', border: 'none', padding: '6px 10px', borderRadius: 4, cursor: 'pointer' },
  fab: { position: 'fixed', bottom: 30, right: 70, padding: '14px 20px', borderRadius: 30, background: '#2874f0', color: 'white', fontSize: 16, border: 'none', cursor: 'pointer' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  modal: { background: 'white', padding: 20, borderRadius: 8, width: 400, boxShadow: '0 2px 10px rgba(0,0,0,0.2)' },
  form: { display: 'flex', flexDirection: 'column', gap: 10 },
  modalActions: { display: 'flex', gap: 10, marginTop: 10 },
  saveBtn: { background: '#2874f0', color: 'white', border: 'none', padding: '8px 14px', borderRadius: 4, cursor: 'pointer' },
  cancelBtn: { background: '#aaa', color: 'white', border: 'none', padding: '8px 14px', borderRadius: 4, cursor: 'pointer' },
};

export default MyAddressesPage;
