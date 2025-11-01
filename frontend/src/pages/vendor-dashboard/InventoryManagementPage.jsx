import React, { useEffect, useState } from "react";
import axios from "axios";

export default function InventoryManagementPage() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [processingId, setProcessingId] = useState(null);
  const [alert, setAlert] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Fetch inventory on mount
  useEffect(() => {
    axios
      .get("/api/vendor/inventory")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setInventory(data);
        setFilteredInventory(data);
        setLoading(false);
      })
      .catch(() => {
        setInventory([]);
        setFilteredInventory([]);
        setLoading(false);
      });
  }, []);

  // Filter inventory by search
  useEffect(() => {
    if (Array.isArray(inventory)) {
      const filtered = inventory.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.sku.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredInventory(filtered);
      setCurrentPage(1);
    } else {
      setFilteredInventory([]);
    }
  }, [search, inventory]);

  // Pagination slice
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInventory.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);

  // Status toggle handler
  const handleToggle = async (id) => {
    setProcessingId(id);
    try {
      // Simulate API call to toggle status
      const updatedItem = inventory.find((i) => i.id === id);
      if (!updatedItem) throw new Error("Item not found");

      const response = await axios.patch(`/api/vendor/inventory/${id}/toggle-status`);
      if (response.status === 200) {
        setInventory((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, active: !item.active } : item
          )
        );
        setAlert({ type: "success", message: `Status updated for "${updatedItem.name}"` });
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      setAlert({ type: "danger", message: error.message });
    }
    setProcessingId(null);
  };

  // Delete handlers
  const confirmDelete = (item) => {
    setDeleteTarget(item);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setProcessingId(deleteTarget.id);
    setShowDeleteModal(false);
    try {
      const response = await axios.delete(`/api/vendor/inventory/${deleteTarget.id}`);
      if (response.status === 200) {
        setInventory((prev) => prev.filter((item) => item.id !== deleteTarget.id));
        setAlert({ type: "success", message: `"${deleteTarget.name}" deleted.` });
      } else {
        throw new Error("Failed to delete item");
      }
    } catch (error) {
      setAlert({ type: "danger", message: error.message });
    }
    setProcessingId(null);
    setDeleteTarget(null);
  };

  return (
    <div className="vh-100  bg-light rounded shadow-sm" style={{ padding:'40px 80px' }}>
      <h2 className="mb-4">Inventory Management</h2>

      {alert && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          {alert.message}
          <button type="button" className="btn-close" onClick={() => setAlert(null)}></button>
        </div>
      )}

      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or SKU"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-6 text-end">
          <button className="btn btn-primary me-2">+ Add New Product</button>
          <button className="btn btn-outline-secondary">Upload Inventory CSV</button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
                
              <th>Name</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Stock Qty</th>
              <th>Unit Cost</th>
              <th>Sell Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : currentItems.length > 0 ? (
              currentItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.sku}</td>
                  <td>{item.category}</td>
                  <td className={item.stock <= item.low_stock_threshold ? "text-danger" : ""}>
                    {item.stock}
                  </td>
                  <td>${item.unit_cost.toFixed(2)}</td>
                  <td>${item.sell_price.toFixed(2)}</td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={item.active}
                        disabled={processingId === item.id}
                        onChange={() => handleToggle(item.id)}
                        id={`toggle-${item.id}`}
                      />
                      <label className="form-check-label" htmlFor={`toggle-${item.id}`}>
                        {item.active ? "Active" : "Inactive"}
                      </label>
                    </div>
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm" role="group" aria-label="Actions">
                      <button className="btn btn-outline-primary" disabled={processingId === item.id}>
                        Edit
                      </button>
                      <button className="btn btn-outline-warning" disabled={processingId === item.id}>
                        Adjust
                      </button>
                      <button className="btn btn-outline-info" disabled={processingId === item.id}>
                        Logs
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        disabled={processingId === item.id}
                        onClick={() => confirmDelete(item)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No inventory found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, idx) => (
              <li
                key={idx + 1}
                className={`page-item ${currentPage === idx + 1 ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => setCurrentPage(idx + 1)}>
                  {idx + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete <strong>{deleteTarget?.name}</strong>?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                  disabled={processingId === deleteTarget?.id}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
