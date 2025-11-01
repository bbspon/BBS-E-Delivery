import React from 'react';

const EscrowInfoPage = () => {
  // Sample data - replace with real data or props/API
  const escrowData = {
    totalAmount: 5000,
    heldAmount: 3000,
    releasedAmount: 2000,
    paymentStatus: 'Held', // Can be 'Held', 'Released', 'Pending'
    startDate: '2025-04-01',
    releaseDate: '2025-05-20',
    expiryDate: '2025-06-01',
    releaseConditions: [
      'Buyer confirms receipt of goods',
      'No disputes raised within 7 days',
      'Seller meets quality standards',
    ],
    supportEmail: 'support@escrowapp.com',
    supportPhone: '+1-800-123-4567',
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Escrow Information</h1>

      <div style={styles.summaryCard}>
        <h2>Escrow Summary</h2>
        <div style={styles.summaryRow}>
          <span>Total Amount:</span>
          <strong>${escrowData.totalAmount.toLocaleString()}</strong>
        </div>
        <div style={styles.summaryRow}>
          <span>Amount Held:</span>
          <strong>${escrowData.heldAmount.toLocaleString()}</strong>
        </div>
        <div style={styles.summaryRow}>
          <span>Amount Released:</span>
          <strong>${escrowData.releasedAmount.toLocaleString()}</strong>
        </div>
        <div style={styles.summaryRow}>
          <span>Payment Status:</span>
          <strong style={statusStyles[escrowData.paymentStatus.toLowerCase()]}>
            {escrowData.paymentStatus}
          </strong>
        </div>
      </div>

      <div style={styles.detailsCard}>
        <h2>Important Dates</h2>
        <ul>
          <li><b>Escrow Start Date:</b> {escrowData.startDate}</li>
          <li><b>Expected Release Date:</b> {escrowData.releaseDate}</li>
          <li><b>Escrow Expiry Date:</b> {escrowData.expiryDate}</li>
        </ul>
      </div>

      <div style={styles.detailsCard}>
        <h2>Release Conditions</h2>
        <ol>
          {escrowData.releaseConditions.map((cond, idx) => (
            <li key={idx}>{cond}</li>
          ))}
        </ol>
      </div>

      <div style={styles.detailsCard}>
        <h2>Contact Support</h2>
        <p>If you have any questions regarding the escrow, please contact us:</p>
        <p>
          <strong>Email:</strong> <a href={`mailto:${escrowData.supportEmail}`}>{escrowData.supportEmail}</a><br />
          <strong>Phone:</strong> <a href={`tel:${escrowData.supportPhone}`}>{escrowData.supportPhone}</a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 700,
    margin: '40px auto',
    padding: '0 20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#333',
  },
  heading: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#2874f0',
  },
  summaryCard: {
    backgroundColor: '#f0f4ff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 30,
    boxShadow: '0 2px 8px rgba(40, 116, 240, 0.2)',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 18,
    marginBottom: 10,
  },
  detailsCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 30,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
};

const statusStyles = {
  held: {
    color: '#ff9800',
    fontWeight: '700',
  },
  released: {
    color: '#4caf50',
    fontWeight: '700',
  },
  pending: {
    color: '#2196f3',
    fontWeight: '700',
  },
};

export default EscrowInfoPage;
