import React, { useEffect, useState } from "react";
import axios from "axios";

const FailedDeliveriesPage = () => {
  const [failedDeliveries, setFailedDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFailedDeliveries = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/failed-deliveries"
      );
      setFailedDeliveries(res.data);
    } catch (err) {
      console.error("Fetch failed deliveries error:", err);
      setError("Could not fetch failed deliveries");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/failed-deliveries/${id}/retry`
      );
      fetchFailedDeliveries(); // refresh
    } catch (err) {
      console.error("Retry failed:", err);
      alert("Could not mark as retried");
    }
  };

  useEffect(() => {
    fetchFailedDeliveries();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">❌ Failed Deliveries</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Order ID</th>
              <th>Agent ID</th>
              <th>Customer</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Attempted</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {failedDeliveries.map((item) => (
              <tr key={item._id}>
                <td>{item.orderId}</td>
                <td>{item.agentId}</td>
                <td>{item.customer}</td>
                <td>{item.mobile}</td>
                <td>{item.deliveryAddress}</td>
                <td>{item.reason}</td>
                <td>
                  <span
                    className={`badge ${
                      item.status === "Failed" ? "bg-danger" : "bg-success"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>{new Date(item.attemptedDate).toLocaleString()}</td>
                <td>
                  {item.status === "Failed" && (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleRetry(item._id)}
                    >
                      Mark Retried
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FailedDeliveriesPage;
