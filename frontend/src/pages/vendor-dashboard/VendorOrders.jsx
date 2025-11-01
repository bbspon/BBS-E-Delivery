import React, { useEffect, useState } from "react";

const ORDER_STATUSES = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Refunded",
];

// Mock data inside the component (standalone example)
const MOCK_ORDERS = [
  {
    id: 101,
    customerName: "Alice Johnson",
    productName: "Organic Apples",
    quantity: 3,
    price: 15.0,
    status: "Pending",
    date: "2025-06-01T10:15:00Z",
  },
  {
    id: 102,
    customerName: "Bob Smith",
    productName: "Wireless Earbuds",
    quantity: 1,
    price: 59.99,
    status: "Shipped",
    date: "2025-05-30T14:22:00Z",
  },
  {
    id: 103,
    customerName: "Carla Gomez",
    productName: "Fitness Tracker",
    quantity: 2,
    price: 99.95,
    status: "Delivered",
    date: "2025-05-28T08:30:00Z",
  },
  {
    id: 104,
    customerName: "David Lee",
    productName: "Bluetooth Speaker",
    quantity: 1,
    price: 45.5,
    status: "Cancelled",
    date: "2025-05-29T12:00:00Z",
  },
  {
    id: 105,
    customerName: "Emily Davis",
    productName: "Instant Coffee",
    quantity: 5,
    price: 25.0,
    status: "Processing",
    date: "2025-06-02T09:10:00Z",
  },
   {
    id: 106,
    customerName: "Emily Davis",
    productName: "Instant Coffee",
    quantity: 5,
    price: 25.0,
    status: "Processing",
    date: "2025-06-02T09:10:00Z",
  },
   {
    id: 107,
    customerName: "Emily Davis",
    productName: "Instant Coffee",
    quantity: 5,
    price: 25.0,
    status: "Processing",
    date: "2025-06-02T09:10:00Z",
  },
   {
    id: 108,
    customerName: "Emily Davis",
    productName: "Instant Coffee",
    quantity: 5,
    price: 25.0,
    status: "Processing",
    date: "2025-06-02T09:10:00Z",
  },
   {
    id: 109,
    customerName: "Emily Davis",
    productName: "Instant Coffee",
    quantity: 5,
    price: 25.0,
    status: "Processing",
    date: "2025-06-02T09:10:00Z",
  },
  {
    id: 110,
    customerName: "Emily Davis",
    productName: "Instant Coffee",
    quantity: 5,
    price: 25.0,
    status: "Processing",
    date: "2025-06-02T09:10:00Z",
  },
];

function VendorOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedOrders, setSelectedOrders] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    // Instead of fetching, load mock data
    setOrders(MOCK_ORDERS);
    setFilteredOrders(MOCK_ORDERS);
  }, []);

  useEffect(() => {
    let filtered = [...orders];
    if (filterStatus) {
      filtered = filtered.filter((o) => o.status === filterStatus);
    }
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (o) =>
          o.id.toString().includes(term) ||
          o.customerName.toLowerCase().includes(term) ||
          o.productName.toLowerCase().includes(term)
      );
    }
    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [filterStatus, searchTerm, orders]);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const toggleSelectOrder = (id) => {
    const newSelected = new Set(selectedOrders);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedOrders(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedOrders.size === currentOrders.length) {
      setSelectedOrders(new Set());
    } else {
      setSelectedOrders(new Set(currentOrders.map((o) => o.id)));
    }
  };

  const handleBulkCancel = () => {
    setOrders((prev) =>
      prev.map((o) =>
        selectedOrders.has(o.id) ? { ...o, status: "Cancelled" } : o
      )
    );
    setSelectedOrders(new Set());
  };

  const updateOrderStatus = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="container my-4" style={{ height: "100vh" , padding: "20px"}}>
      <h2 className="mb-4">Vendor Orders</h2>

      {/* Filters & Search */}
      <div className="d-flex align-items-start mb-4 justify-content-between gap-1">
        <div className="col-md-3">
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Filter by Status</option>
            {ORDER_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="d-flex gap-1 col-md-6 align-items-end  align-items-md-end flex-column"> 
             <div className="col-md-5">
          <input
            type="text"
            className="form-control" style={{ width: "320px", height: "40px",marginLeft:"-55px" }}
            placeholder="Search by Order ID, Customer, Product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-6 text-end mt-2">
          {selectedOrders.size > 0 && (
            <button
              className="btn btn-danger"
              onClick={handleBulkCancel}
              title="Cancel selected orders"
            >
              Cancel Selected Orders
            </button>
          )}
        </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={
                    selectedOrders.size > 0 &&
                    selectedOrders.size === currentOrders.length
                  }
                  onChange={toggleSelectAll}
                />
              </th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status</th>
              <th>Date</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center">
                  No orders found.
                </td>
              </tr>
            )}
            {currentOrders.map((order) => (
              <tr key={order.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedOrders.has(order.id)}
                    onChange={() => toggleSelectOrder(order.id)}
                  />
                </td>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>${order.price.toFixed(2)}</td>
                <td>
                  <span
                    className={`badge ${
                      order.status === "Pending"
                        ? "bg-warning text-dark"
                        : order.status === "Processing"
                        ? "bg-info text-dark"
                        : order.status === "Shipped"
                        ? "bg-primary"
                        : order.status === "Delivered"
                        ? "bg-success"
                        : order.status === "Cancelled"
                        ? "bg-danger"
                        : "bg-secondary"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>
                  <select
                    className="form-select"
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  >
                    {ORDER_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <nav aria-label="Page navigation example" className="mt-4 d-flex justify-content-end">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link me-4"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages).keys()].map((num) => (
            <li
              key={num + 1}
              className={`page-item ${currentPage === num + 1 ? "active" : ""}`}
            >
              <button
                className="page-link me-2"
                onClick={() => setCurrentPage(num + 1)}
              >
                {num + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
          >
            <button
              className="page-link ms-4"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default VendorOrdersPage;
