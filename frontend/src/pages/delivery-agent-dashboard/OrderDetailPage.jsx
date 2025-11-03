import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header";

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newAddress, setNewAddress] = useState("");
  const [otp, setOtp] = useState("");
  const [proofImage, setProofImage] = useState(null);
  const [deliveryNotes, setDeliveryNotes] = useState("");
  console.log("[ReturnRequestForm] build:", new Date().toISOString());

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/api/orders/${orderId}`);
        setOrder(response.data);
        setNewAddress(response.data.deliveryAddress || "");
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleNavigate = () => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      order.customer?.address || ""
    )}`;
    window.open(mapUrl, "_blank");
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/orders/${orderId}/verify-otp`, {
        otp,
      });
      alert("OTP verified successfully!");
    } catch (error) {
      console.error("OTP verification failed:", error);
      alert("Invalid OTP.");
    }
  };

  const handleMarkDelivered = async () => {
    try {
      const formData = new FormData();
      if (proofImage) formData.append("proofImage", proofImage);
      formData.append("notes", deliveryNotes);

      await axios.post(`/api/orders/${orderId}/mark-delivered`, formData);
      alert("Order marked as delivered!");
    } catch (error) {
      console.error("Error marking order as delivered:", error);
      alert("Delivery update failed.");
    }
  };

  if (loading) return <div className="text-center mt-5">Loading order...</div>;
  if (!order) return <div className="text-center mt-5">Order not found.</div>;

  return (
    <>
      <Header />
      <div
        className="container py-4 "
        style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}
      >
        <h2 className="mb-4 text-center">Order Details</h2>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="card p-3 h-100 shadow-sm">
              <h5>Customer Info</h5>
              <p>
                <strong>Name:</strong> {order.customerName}
              </p>
              <p>
                <strong>Phone:</strong> {order.customerPhone}
              </p>
              <p>
                <strong>Address:</strong>
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card p-3 h-100 shadow-sm">
              <h5>Order Info</h5>
              <p>
                <strong>Order ID:</strong> {order.id}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="badge bg-info">{order.status}</span>
              </p>
              <p>
                <strong>Payment:</strong> ₹{order.totalAmount} via{" "}
                {order.paymentMethod}
              </p>
              <p>
                <strong>Order Time:</strong>{" "}
                {new Date(order.timestamp).toLocaleString()}
              </p>
              <p>
                <strong>Estimated Delivery:</strong> {order.estimatedDelivery}
              </p>
              <button className="btn btn-primary" onClick={handleNavigate}>
                Navigate to Location
              </button>
            </div>
          </div>
        </div>

        <div className="card mt-4 p-3 shadow-sm">
          <h5>Items in this Order</h5>
          {order.items?.map((item, idx) => (
            <div
              key={idx}
              className="d-flex justify-content-between border-bottom py-2"
            >
              <div>
                <strong>{item.name}</strong>
                <div className="text-muted">Qty: {item.quantity}</div>
              </div>
              <div>₹{item.price}</div>
            </div>
          ))}
        </div>

        <div className="card mt-4 p-3 shadow-sm">
          <h5>Delivery Instructions</h5>
          <p>{order.instructions || "No special instructions."}</p>
          <form onSubmit={handleOTPSubmit} className="row g-2 mt-3">
            <div className="col-md-6">
              <input
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter Delivery OTP"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-3">
              <button className="btn btn-warning w-100" type="submit">
                Submit OTP
              </button>
            </div>
            <div className="col-md-3">
              <button
                className="btn btn-success w-100"
                type="button"
                onClick={handleMarkDelivered}
              >
                Mark as Delivered
              </button>
            </div>
          </form>
        </div>

        <div className="card mt-4 p-3 shadow-sm">
          <h5>Proof of Delivery</h5>
          <input
            type="file"
            className="form-control mb-2"
            accept="image/*"
            onChange={(e) => setProofImage(e.target.files[0])}
          />
          <textarea
            className="form-control"
            placeholder="Notes about the delivery..."
            rows={3}
            value={deliveryNotes}
            onChange={(e) => setDeliveryNotes(e.target.value)}
          />
        </div>

        <div className="card mt-4 p-3 shadow-sm">
          <h5>Customer Contact Shortcuts</h5>
          <div className="d-flex justify-content-space-between gap-2 mt-2 flex-wrap p-2">
            <a
              href={`tel:${order.customerPhone}`}
              className="btn btn-outline-primary me-2 mb-2"
            >
              Call
            </a>
            <a
              href={`sms:${order.customerPhone}`}
              className="btn btn-outline-secondary me-2 mb-2"
            >
              SMS
            </a>
            <a
              href={`https://wa.me/${order.customerPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-success mb-2"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailPage;
