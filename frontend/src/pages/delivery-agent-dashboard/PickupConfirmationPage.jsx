// File: AdvancedPickupConfirmationPage.jsx
import React, { useState, useEffect } from 'react';
import { GiCardPickup } from "react-icons/gi";

const mockOrder = {
  vendor: {
    name: "FreshMart Grocery",
    address: "123 Main Street, Sector 45, City Center",
    contact: "+91-9876543210",
    location: { lat: 28.6139, lng: 77.2090 }, // mock location
  },
  orderId: "ORD123456789",
  items: [
    { id: 1, name: "Bisleri Water 20L", qty: 2, image: "https://toppng.com/uploads/thumbnail/milk-food-png-free-116683373052lyirnfhaa.png" },
    { id: 2, name: "Organic Milk 1L", qty: 1, image: "https://www.freeiconspng.com/thumbs/water-bottle-png/water-bottle-png-6.png" },
  ],
  paymentMode: "Prepaid",
  otpRequired: true,
  pickupDeadline: new Date(Date.now() + 15 * 60 * 1000), // 15 mins from now
};

const PickupConfirmationPage = () => {
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [error, setError] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [deadline, setDeadline] = useState(mockOrder.pickupDeadline);
  const [timeLeft, setTimeLeft] = useState('');
  const [skipOtp, setSkipOtp] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = deadline - new Date();
      if (diff <= 0) {
        setTimeLeft("Expired");
        clearInterval(interval);
      } else {
        const mins = Math.floor(diff / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        setTimeLeft(`${mins}m ${secs}s`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  const handleOtpVerify = () => {
    if (otp === '1234') {
      setOtpVerified(true);
      setError('');
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    setImageFiles(files);
    setImagePreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleImageRemove = (index) => {
    const updatedFiles = [...imageFiles];
    const updatedPreviews = [...imagePreviews];
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setImageFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
  };

  const canConfirm = () =>
    (otpVerified || skipOtp || !mockOrder.otpRequired) &&
    imageFiles.length > 0 &&
    !confirmed;

  const handlePickupConfirm = () => {
    if (!canConfirm()) {
      setError("Please complete all required steps before confirming.");
      return;
    }

    setConfirmed(true);
    alert("✅ Pickup Confirmed!\nOrder ID: " + mockOrder.orderId);
    console.log({
      orderId: mockOrder.orderId,
      otpVerified,
      imageFiles,
      skippedOtp: skipOtp,
    });
  };

  return (
    <div className="pickup-page-container">
      <h2> <GiCardPickup /> Pickup Confirmation</h2>

      <div className="status-bar">
        <span className={`status ${confirmed ? 'confirmed' : otpVerified ? 'verified' : 'pending'}`}>
          {confirmed ? "✅ Pickup Confirmed" : otpVerified ? "🔐 OTP Verified" : "⏳ Awaiting Confirmation"}
        </span>
        <span className="timer">⏰ Time left: {timeLeft}</span>
      </div>

      <section className="vendor-card">
        <h4>{mockOrder.vendor.name}</h4>
        <p>{mockOrder.vendor.address}</p>
        <p><b>Order ID:</b> {mockOrder.orderId}</p>
        <p><b>Payment Mode:</b> {mockOrder.paymentMode}</p>
        <a href={`tel:${mockOrder.vendor.contact}`} className="call-button"> Call Vendor</a>
      </section>

      <section className="items-section">
        <h5>🛒 Items to Pickup</h5>
        {mockOrder.items.map((item) => (
          <div key={item.id} className="item-row">
            <img src={item.image} alt={item.name} />
            <div>
              <strong>{item.name}</strong>
              <p>Qty: {item.qty}</p>
            </div>
          </div>
        ))}
      </section>

      {mockOrder.otpRequired && !otpVerified && !skipOtp && (
        <section className="otp-section">
          <label>Enter Vendor OTP:</label>
          <div className="otp-input-group">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={4}
              placeholder="1234"
            />
            <button onClick={handleOtpVerify}>Verify</button>
          </div>
          <label className="skip-otp">
            <input
              type="checkbox"
              checked={skipOtp}
              onChange={() => setSkipOtp(!skipOtp)}
            /> Vendor did not provide OTP
          </label>
        </section>
      )}

      {otpVerified && <p className="success-msg">✅ OTP Verified Successfully</p>}

      <section className="image-upload-section">
        <label>Upload Pickup Photo (max 3):</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
        />
        <div className="image-preview-row">
          {imagePreviews.map((src, idx) => (
            <div key={idx} className="preview-box">
              <img src={src} alt={`Proof ${idx + 1}`} />
              <button onClick={() => handleImageRemove(idx)}>✖</button>
            </div>
          ))}
        </div>
      </section>

      {error && <div className="error-msg">{error}</div>}

      <button
        className="confirm-button"
        onClick={handlePickupConfirm}
        disabled={!canConfirm()}
      >
        ✅ Confirm Pickup
      </button>

      <style>{`
        .pickup-page-container {
        
          width: 100%
          margin: auto;
          padding: 30px 60px;
          font-family: 'Segoe UI', sans-serif;
          color: #333;
          background: #f5f5f5;
        }
        .status-bar {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          padding: 10px 40px ;
         
            }
        .status {
          font-weight: bold;
          font-size: 1rem;
        }
        .status.pending { color: #ff9800; }
        .status.verified { color: #4caf50; }
        .status.confirmed { color: #2196f3; }
        .vendor-card {
          padding: 15px;
          background: #f5f5f5;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .call-button {
          color: #007bff;
          text-decoration: none;
        }
        .items-section .item-row {
          display: flex;
          gap: 10px;
          margin-bottom: 10px;
          justify-content: space-between;
          align-items: center;
          padding: 10px 25px;
        }
        .items-section img {
          width: 200px;
          height: 200px;
          border-radius: 4px;
          object-fit: cover;
          padding: 10px;
          border: 1px solid #ccc;
        }
        .otp-section {
          margin-bottom: 20px;
        }
        .otp-input-group {
          display: flex;
          gap: 10px;
          margin-top: 5px;
        }
        .otp-input-group input {
          width: 100px;
          padding: 8px;
        }
        .otp-input-group button {
          padding: 8px 15px;
          background: #4caf50;
          color: white;
          border: none;
        }
        .skip-otp {
          display: block;
          margin-top: 10px;
          font-size: 0.9rem;
        }
          .image-upload-section {
            margin-bottom: 20px;
            padding: 10px 25px;
           label {
            
             padding: 0 10px;
           }
          }
        .image-upload-section input {
          margin-top: 8px;
          padding: 8px 12px;
          border: 1px solid #ccc;
          border-radius: 4px;
          display: block;
        }
        .image-preview-row {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }
        .preview-box {
          position: relative;
        }
        .preview-box img {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 6px;
        }
        .preview-box button {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #f44336;
          color: white;
          border: none;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          font-size: 12px;
        }
        .error-msg {
          color: red;
          margin-top: 10px;
        }
        .success-msg {
          color: green;
        }
        .confirm-button {
          width: 100%;
          padding: 12px;
          background: #007bff;
          color: white;
          font-weight: bold;
          border: none;
          border-radius: 6px;
          margin-top: 20px;
        }
        .confirm-button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        @media (max-width: 600px) {
          .items-section .item-row {
            flex-direction: column;
            align-items: start;
          }
        }
      `}</style>
    </div>
  );
};

export default PickupConfirmationPage;
