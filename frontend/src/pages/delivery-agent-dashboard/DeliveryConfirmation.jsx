import React, { useState, useEffect } from 'react';

const DeliveryConfirmationPage = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [otp, setOtp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [proofImage, setProofImage] = useState(null);
  const [note, setNote] = useState('');
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    // Simulate API fetch
    const mockOrder = {
      id: 'ORD12345678',
      customerName: 'Ramesh Kumar',
      address: '123 MG Road, Bangalore',
      phone: '+91 9876543210',
      value: 499,
      paymentMethod: 'COD',
      deliveryType: 'Standard',
      expectedTime: 'Today, 4:30 PM',
    };
    setOrderDetails(mockOrder);
  }, []);

  const handleOtpVerification = () => {
    if (otp === '1234') {
      setIsOtpVerified(true);
      alert('✅ OTP Verified');
    } else {
      alert('❌ Incorrect OTP');
    }
  };

  const handleProofUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProofImage(URL.createObjectURL(file));
    }
  };

  const handleConfirmDelivery = () => {
    if (!isOtpVerified) return alert('Please verify OTP first.');
    setConfirming(true);
    setTimeout(() => {
      alert('✅ Delivery Confirmed Successfully!');
      setConfirming(false);
    }, 1500);
  };

  if (!orderDetails) return <p style={styles.loading}>Loading...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🚚 Delivery Confirmation</h2>

      <div style={styles.card}>
        <h3 style={styles.sectionTitle}>Order #{orderDetails.id}</h3>
        <p><b>Customer:</b> {orderDetails.customerName}</p>
        <p><b>Address:</b> {orderDetails.address}</p>
        <p><b>Phone:</b> <a href={`tel:${orderDetails.phone}`} style={styles.link}>{orderDetails.phone}</a></p>
        <p><b>Total:</b> ₹{orderDetails.value}</p>
        <p><b>Payment:</b> {orderDetails.paymentMethod}</p>
        <p><b>Delivery:</b> {orderDetails.deliveryType} — {orderDetails.expectedTime}</p>
      </div>

      <div style={styles.section}>
        <label style={styles.label}>Enter Delivery OTP</label>
        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="e.g. 1234"
          style={styles.input}
        />
        <button onClick={handleOtpVerification} style={styles.button}>Verify OTP</button>
        {isOtpVerified && <p style={styles.success}>✅ OTP Verified</p>}
      </div>

      <div style={styles.section}>
        <label style={styles.label}>Upload Delivery Proof (Optional)</label>
        <input type="file" accept="image/*" onChange={handleProofUpload} />
        {proofImage && (
          <div>
            <img src={proofImage} alt="Proof" style={styles.imagePreview} />
            <button onClick={() => setProofImage(null)} style={styles.secondaryBtn}>Remove Image</button>
          </div>
        )}
      </div>

      <div style={styles.section}>
        <label style={styles.label}>Delivery Note</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add any delivery note..."
          style={styles.textarea}
        />
      </div>

      <button

        onClick={handleConfirmDelivery}
        disabled={!isOtpVerified || confirming}
        style={{
          ...styles.button,
          backgroundColor: isOtpVerified ? '#28a745' : '#bbb',
          cursor: isOtpVerified ? 'pointer' : 'not-allowed',
        }}
      >
        {confirming ? 'Submitting...' : 'Confirm Delivery'}
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '26px',
    marginBottom: '25px',
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 0 10px rgba(49, 7, 7, 0.25)',
    marginBottom: '25px',
    color: '#444',
  },
  section: {
    marginBottom: '25px',
    padding: '10px 20px',
  },
  sectionTitle: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#333',
  },
  label: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#444',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    minHeight: '80px',
  },
  button: {
    padding: '2px 20px',
    margin: '0 30px ',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
     
  },
  secondaryBtn: {
    marginTop: '10px',
    backgroundColor: '#f44336',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
  imagePreview: {
    width: '100%',
    marginTop: '10px',
    borderRadius: '8px',
  },
  success: {
    color: 'green',
    marginTop: '8px',
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px',
  },
};

export default DeliveryConfirmationPage;
