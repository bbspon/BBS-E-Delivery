// Page 54: Slot Optimization & Traffic Estimation Page (React.js with inline CSS)
import React, { useState, useEffect } from 'react';

const SlotOptimizationPage = () => {
  const [slots, setSlots] = useState([
    { id: 1, time: '9:00 AM - 11:00 AM', traffic: 'Low', available: true },
    { id: 2, time: '11:00 AM - 1:00 PM', traffic: 'Moderate', available: true },
    { id: 3, time: '1:00 PM - 3:00 PM', traffic: 'High', available: false },
    { id: 4, time: '3:00 PM - 5:00 PM', traffic: 'Moderate', available: true },
    { id: 5, time: '5:00 PM - 9:00 PM', traffic: 'High', available: false },
  ]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSlotSelection = (slotId) => {
    const slot = slots.find((s) => s.id === slotId);
    if (slot && slot.available) {
      setSelectedSlot(slotId);
    }
  };

  const getTrafficColor = (level) => {
    switch (level) {
      case 'Low': return 'green';
      case 'Moderate': return 'orange';
      case 'High': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Slot Optimization & Traffic Estimation</h2>
      <p style={styles.description}>Select a delivery slot based on traffic predictions and availability.</p>

      <div style={styles.slotGrid}>
        {slots.map((slot) => (
          <div
            key={slot.id}
            style={{
              ...styles.slotCard,
              borderColor: selectedSlot === slot.id ? '#007bff' : '#ccc',
              backgroundColor: !slot.available ? '#f8d7da' : '#fff',
            }}
            onClick={() => handleSlotSelection(slot.id)}
          >
            <h4 style={{ margin: '8px 0' }}>{slot.time}</h4>
            <p style={{ color: getTrafficColor(slot.traffic) }}>Traffic: {slot.traffic}</p>
            <p style={{ color: slot.available ? 'green' : 'red' }}>
              {slot.available ? 'Available' : 'Unavailable'}
            </p>
          </div>
        ))}
      </div>

      {selectedSlot && (
        <div style={styles.confirmationBox}>
          <h3>Selected Slot:</h3>
          <p className='mt-2' >{slots.find(s => s.id === selectedSlot)?.time}</p>

          <div className='d-flex gap-3 ' >
            <button style={{ backgroundColor: 'rgb(24, 77, 134)',borderRadius: '5px', color: '#fff' }}>Confirm</button>
            <button onClick={() => setSelectedSlot(null)}>Cancel</button>          
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '24px',
    fontFamily: 'sans-serif',
    backgroundColor: '#f4f6f8',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '12px',
  },
  description: {
    fontSize: '16px',
    marginBottom: '20px',
  },
  slotGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '16px',
  },
  slotCard: {
    border: '2px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  confirmationBox: {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: '#e7f3ff',
    borderLeft: '4px solid #007bff',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignContext: 'center',
  },
};

export default SlotOptimizationPage;
