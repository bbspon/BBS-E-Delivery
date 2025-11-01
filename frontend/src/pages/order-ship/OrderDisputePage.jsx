import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const MAX_FILES = 5;
const MAX_FILE_SIZE_MB = 10;

const OrderDisputeResolutionPage = () => {
  const [selectedOrder, setSelectedOrder] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [disputeType, setDisputeType] = useState("");
  const [description, setDescription] = useState("");
  const [proofFiles, setProofFiles] = useState([]);
  const [contactPreference, setContactPreference] = useState("");
  const [resolutionType, setResolutionType] = useState("");
  const [complaints, setComplaints] = useState([]);

  const handleProofUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => {
      const isValidType =
        file.type.startsWith("image") || file.type.startsWith("video");
      const isValidSize = file.size <= MAX_FILE_SIZE_MB * 1024 * 1024;
      return isValidType && isValidSize;
    });

    if (validFiles.length + proofFiles.length > MAX_FILES) {
      alert(`Max ${MAX_FILES} files allowed.`);
      return;
    }

    const rejected = files.length - validFiles.length;
    if (rejected > 0) {
      alert(`${rejected} file(s) rejected (unsupported type or too large).`);
    }

    setProofFiles((prev) => [...prev, ...validFiles]);
  };

  const removeProofFile = (index) => {
    setProofFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newComplaint = {
      id: Math.floor(Math.random() * 100000),
      selectedOrder,
      selectedProducts,
      disputeType,
      description,
      proofFiles,
      contactPreference,
      resolutionType,
      status: "Pending",
    };
    setComplaints((prev) => [newComplaint, ...prev]);
    alert("Dispute Submitted Successfully!");
    resetForm();
  };

  const resetForm = () => {
    setSelectedOrder("");
    setSelectedProducts([]);
    setDisputeType("");
    setDescription("");
    setProofFiles([]);
    setContactPreference("");
    setResolutionType("");
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        <h2 className="mb-4 text-warning border-bottom pb-2">
          Order Dispute Resolution
        </h2>

        <form onSubmit={handleFormSubmit}>
          {/* Order Selection */}
          <div className="mb-3">
            <label className="form-label fw-bold">Select Order</label>
            <select
              className="form-select"
              value={selectedOrder}
              onChange={(e) => setSelectedOrder(e.target.value)}
              required
            >
              <option value="">-- Select an Order --</option>
              <option value="ORD123">#ORD123 - Water Bottle Combo</option>
              <option value="ORD124">#ORD124 - Grocery Kit</option>
              <option value="ORD125">#ORD125 - Smartwatch</option>
            </select>
          </div>

          {/* Product Selection */}
          <div className="mb-3">
            <label className="form-label fw-bold">Select Products</label>
            <input
              type="text"
              className="form-control"
              placeholder="Type product names..."
              value={selectedProducts.join(", ")}
              onChange={(e) =>
                setSelectedProducts(
                  e.target.value.split(",").map((item) => item.trim())
                )
              }
              required
            />
          </div>

          {/* Dispute Category */}
          <div className="mb-3">
            <label className="form-label fw-bold">Dispute Type</label>
            <select
              className="form-select"
              value={disputeType}
              onChange={(e) => setDisputeType(e.target.value)}
              required
            >
              <option value="">-- Select Issue Type --</option>
              <option value="undelivered">Undelivered</option>
              <option value="damaged">Damaged Item</option>
              <option value="wrong">Wrong Product</option>
              <option value="missing">Missing Item</option>
              <option value="defective">Defective / Not Working</option>
              <option value="expired">Expired / Spoiled</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label fw-bold">Describe the Issue</label>
            <textarea
              className="form-control"
              rows={4}
              placeholder="Write details about the issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Proof Upload */}
          <div className="mb-3">
            <label className="form-label fw-bold">Upload Proof (Images/Videos)</label>

            {/* Drag & Drop Zone */}
            <div
              className="border border-dashed p-4 rounded text-center "
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const droppedFiles = Array.from(e.dataTransfer.files);
                handleProofUpload({ target: { files: droppedFiles } });
              }}
              style={{ cursor: "pointer" }}
              onClick={() =>
                document.getElementById("proofUploadInput").click()
              }
            >
              Drag & Drop files here or{" "}
              <span className="text-primary">Click to Browse</span>
              <br />
              <small className="text-muted">
                (Max 5 files, 10MB each | JPG, PNG, MP4)
              </small>
            </div>

            {/* Hidden Input */}
            <input
              type="file"
              className="d-none"
              id="proofUploadInput"
              multiple
              accept="image/*,video/*"
              onChange={handleProofUpload}
            />

            {/* Previews */}
            <div className="row mt-3">
              {proofFiles.map((file, index) => {
                const fileURL = URL.createObjectURL(file);
                const isImage = file.type.startsWith("image");
                const isVideo = file.type.startsWith("video");

                return (
                  <div className="col-md-3 mb-3" key={index}>
                    <div className="border p-2 rounded shadow-sm position-relative">
                      <button
                        type="button"
                        className="btn-close position-absolute top-0 end-0 m-1"
                        aria-label="Remove"
                        onClick={() => removeProofFile(index)}
                      ></button>

                      {isImage ? (
                        <img
                          src={fileURL}
                          alt={file.name}
                          className="img-fluid rounded p-4"
                        />
                      ) : isVideo ? (
                        <video width="100%"  controls>
                          <source src={fileURL} type={file.type} />
                        </video>
                      ) : (
                        <p>{file.name}</p>
                      )}
                      <small className="d-block text-center mt-1 text-muted">
                        {file.name}
                      </small>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Preference */}
          <div className="mb-3">
            <label className="form-label fw-bold">Contact Preference</label>
            <select
              className="form-select"
              value={contactPreference}
              onChange={(e) => setContactPreference(e.target.value)}
              required
            >
              <option value="">-- Choose --</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="in-app">In-App Notifications</option>
            </select>
          </div>

          {/* Resolution Preference */}
          <div className="mb-3">
            <label className="form-label fw-bold">Expected Resolution</label>
            <select
              className="form-select"
              value={resolutionType}
              onChange={(e) => setResolutionType(e.target.value)}
              required
            >
              <option value="">-- Select --</option>
              <option value="refund">Refund</option>
              <option value="replacement">Replacement</option>
              <option value="exchange">Exchange with another item</option>
              <option value="feedback">Just Feedback</option>
            </select>
          </div>

          <button type="submit" className="btn btn-warning fw-bold">
            Submit Dispute
          </button>
        </form>

        {/* Complaint History */}
        <div className="mt-5">
          <h4 className="text-secondary mb-3 border-bottom pb-2">
            My Previous Disputes
          </h4>
          {complaints.length === 0 ? (
            <p>No disputes raised yet.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Ticket ID</th>
                    <th>Order</th>
                    <th>Issue</th>
                    <th>Status</th>
                    <th>Resolution</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((c) => (
                    <tr key={c.id}>
                      <td>#{c.id}</td>
                      <td>{c.selectedOrder}</td>
                      <td>{c.disputeType}</td>
                      <td>{c.status}</td>
                      <td>{c.resolutionType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderDisputeResolutionPage;
