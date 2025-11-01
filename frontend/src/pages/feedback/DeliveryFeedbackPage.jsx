import React, { useState } from "react";
import axios from "axios";

const DeliveryFeedbackPage = () => {
  const [formData, setFormData] = useState({
    orderId: "",
    agentId: "",
    customer: "",
    rating: "",
    comments: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitFeedback = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/feedback",
        formData
      );
      setSuccessMsg("✅ Feedback submitted successfully.");
      setFormData({
        orderId: "",
        agentId: "",
        customer: "",
        rating: "",
        comments: "",
      });
    } catch (err) {
      setErrorMsg(err.response?.data?.error || "Submission failed.");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h2>📋 Delivery Feedback</h2>

      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

      <form onSubmit={submitFeedback}>
        <div className="form-group mb-3">
          <label>Order ID</label>
          <input
            type="text"
            className="form-control"
            name="orderId"
            value={formData.orderId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Agent ID</label>
          <input
            type="text"
            className="form-control"
            name="agentId"
            value={formData.agentId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Customer Name</label>
          <input
            type="text"
            className="form-control"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Rating (1 to 5)</label>
          <select
            name="rating"
            className="form-select"
            value={formData.rating}
            onChange={handleChange}
            required
          >
            <option value="">Select Rating</option>
            {[1, 2, 3, 4, 5].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group mb-3">
          <label>Comments</label>
          <textarea
            className="form-control"
            name="comments"
            rows="3"
            maxLength="500"
            value={formData.comments}
            onChange={handleChange}
            placeholder="Optional comments..."
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default DeliveryFeedbackPage;
