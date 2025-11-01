import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams,useNavigate } from "react-router-dom";
import DeliveryMapPage from "../delivery/DeliveryMapPage";

const TrackOrderPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [isMapReady, setIsMapReady] = useState(false);
const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/orders/track/${orderId}`
        );
        console.log("Order fetch success:", res.data);
        setOrder(res.data);
        if (
          res.data.address &&
          res.data.address.coordinates &&
          res.data.address.coordinates.lat &&
          res.data.address.coordinates.lng
        ) {
          setIsMapReady(true);
        } else {
          setError("Map coordinates missing in order data");
        }
      } catch (err) {
        console.error("Tracking fetch error:", err);
        setError("Unable to fetch tracking data");
      }
    };

    fetchOrder();
  }, [orderId]);

  return (
    <div className="track-order-page container mt-4">
      <h2 className="mb-3">Track Your Order</h2>
      <Link to="/agent/failed-deliveries" className="btn btn-primary mb-3">
        Failed Deliveries
      </Link>
      <Link to="/tools/address-resolver" className="btn btn-primary mb-3">
        Address Resolve 📍
      </Link>
      <button
        className="btn btn-primary mb-3"
        onClick={() =>
          navigate("/agent/feedback", {
            state: {
              orderId: order.orderId,
              agentId: order.agentId,
              customer: order.customer,
            },
          })
        }
      >
        Leave Feedback
      </button>
      {error && <div className="alert alert-danger">{error}</div>}
      {order ? (
        <div className="order-info border p-4 rounded shadow-sm bg-light">
          <div>
            <strong>Order ID:</strong> {order.orderId}
          </div>
          <div>
            <strong>Customer:</strong> {order.customer}
          </div>
          <div>
            <strong>Mobile:</strong> {order.mobile}
          </div>
          <div>
            <strong>Status:</strong> {order.status}
          </div>
          <div>
            <strong>Delivery Date:</strong>{" "}
            {new Date(order.deliveryDate).toLocaleDateString()}
          </div>

          <div className="mt-2">
            <strong>Address:</strong>{" "}
            {order.address
              ? `${order.address.line1}, ${order.address.city}, ${order.address.state}, ${order.address.postalCode}`
              : "No address available"}
          </div>

          <div>
            <strong>DigiPIN:</strong>{" "}
            {order.address?.digiPIN || "Not available"}
          </div>

          <div className="mt-3">
            <strong>Items:</strong>
            <ul className="list-group">
              {order.items.map((item, idx) => (
                <li key={item._id || idx} className="list-group-item">
                  {item.productName} × {item.quantity}
                </li>
              ))}
            </ul>
          </div>

          {isMapReady && (
            <div
              className="map-container mt-4"
              style={{ height: "300px", width: "100%" }}
            >
              <iframe
                title="Google Map"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${order.address.coordinates.lat},${order.address.coordinates.lng}&z=15&output=embed`}
                allowFullScreen
              ></iframe>
            </div>
          )}
          <DeliveryMapPage
            selectedOrder={order.orderId}
            selectedAgentId={order.agentId}
          />
        </div>
      ) : (
        !error && <div className="text-muted">Loading order details...</div>
      )}
    </div>
  );
};

export default TrackOrderPage;
