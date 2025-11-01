import React, { useState, useEffect } from "react";

const mockVendors = ["All Vendors", "Vendor A", "Vendor B", "Vendor C"];

// Mock fetchOrders simulating API data fetch
const fetchOrders = async ({
  page,
  pageSize,
  search,
  vendor,
  sortKey,
  sortOrder,
}) => {
  // Simulate some orders (replace with your API call)
  const allOrders = [
    {
      id: "ORD001",
      customer: "John Doe",
      vendor: "Vendor A",
      date: "2025-06-01T10:00:00Z",
      status: "Pending",
      paymentStatus: "Paid",
      totalAmount: 50.0,
      deliveryMethod: "Delivery",
    },
    {
      id: "ORD002",
      customer: "Jane Smith",
      vendor: "Vendor B",
      date: "2025-06-02T14:30:00Z",
      status: "Confirmed",
      paymentStatus: "Pending",
      totalAmount: 75.5,
      deliveryMethod: "Pickup",
    },
    // Add more mock orders as needed...
  ];

  // Filter by search & vendor
  let filtered = allOrders.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) &&
      (vendor === "All Vendors" || o.vendor === vendor)
  );

  // Sort
  if (sortKey) {
    filtered.sort((a, b) => {
      let valA = a[sortKey];
      let valB = b[sortKey];

      if (sortKey === "date") {
        valA = new Date(valA);
        valB = new Date(valB);
      } else if (typeof valA === "string") {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }

  // Pagination
  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  return {
    orders: paginated,
    total,
  };
};

const OrderManagementPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState(new Set());
  const [search, setSearch] = useState("");
  const [vendorFilter, setVendorFilter] = useState("All Vendors");
  const [sort, setSort] = useState({ key: "date", order: "desc" });
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const loadOrders = async () => {
      const { orders: fetchedOrders, total } = await fetchOrders({
        page,
        pageSize,
        search,
        vendor: vendorFilter,
        sortKey: sort.key,
        sortOrder: sort.order,
      });
      setOrders(fetchedOrders);
      setTotalOrders(total);
      setSelectedOrders(new Set());
    };
    loadOrders();
  }, [page, pageSize, search, vendorFilter, sort]);

  const totalPages = Math.ceil(totalOrders / pageSize);

  const toggleSelectOrder = (id) => {
    const newSet = new Set(selectedOrders);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedOrders(newSet);
  };

  const toggleSelectAll = () => {
    if (selectedOrders.size === orders.length) {
      setSelectedOrders(new Set());
    } else {
      setSelectedOrders(new Set(orders.map((o) => o.id)));
    }
  };

  const handleChangeStatus = (orderId, newStatus) => {
    // Implement API call to update order status here
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleBulkChangeStatus = (newStatus) => {
    // Implement bulk status update API call here
    setOrders((prev) =>
      prev.map((order) =>
        selectedOrders.has(order.id) ? { ...order, status: newStatus } : order
      )
    );
    setSelectedOrders(new Set());
  };

  const handleSortChange = (key) => {
    setSort((prev) => {
      if (prev.key === key) {
        return { key, order: prev.order === "asc" ? "desc" : "asc" };
      }
      return { key, order: "asc" };
    });
  };

  return (
    <div
      style={{
        height: "100vh",
        maxWidth: 1200,
        margin: "40px auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#333",
        background: "#fff",
        padding: "24px 32px",
        borderRadius: 8,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        
      }}
    >
      <h1 style={{ marginBottom: 20, fontWeight: 700, fontSize: 28 }}>
        Order Management (All Orders)
      </h1>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <input
          type="text"
          placeholder="Search by Order ID"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          style={{
            flex: "1 1 250px",
            padding: "8px 12px",
            fontSize: 16,
            borderRadius: 4,
            border: "1px solid #ccc",
          }}
        />

        <select
          value={vendorFilter}
          onChange={(e) => {
            setVendorFilter(e.target.value);
            setPage(1);
          }}
          style={{
            flex: "0 0 180px",
            padding: "8px 12px",
            fontSize: 16,
            borderRadius: 4,
            border: "1px solid #ccc",
          }}
        >
          {mockVendors.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>

        {selectedOrders.size > 0 && (
          <select
            onChange={(e) => {
              if (e.target.value) {
                handleBulkChangeStatus(e.target.value);
                e.target.value = "";
              }
            }}
            defaultValue=""
            style={{
              flex: "0 0 180px",
              padding: "8px 12px",
              fontSize: 16,
              borderRadius: 4,
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            <option value="" disabled>
              Change Status for Selected
            </option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Returned">Returned</option>
          </select>
        )}
      </div>

      {/* Orders Table */}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: 850,
          }}
        >
          <thead style={{ backgroundColor: "#f8f9fa" }}>
            <tr>
              <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>
                <input
                  type="checkbox"
                  onChange={toggleSelectAll}
                  checked={selectedOrders.size === orders.length && orders.length > 0}
                  aria-label="Select all orders"
                />
              </th>
              {[
                { label: "Order ID", key: "id" },
                { label: "Customer", key: "customer" },
                { label: "Vendor", key: "vendor" },
                { label: "Date", key: "date" },
                { label: "Status" },
                { label: "Payment Status" },
                { label: "Total Amount" },
                { label: "Delivery Method" },
                { label: "Actions" },
              ].map(({ label, key }) => (
                <th
                  key={label}
                  style={{
                    padding: "10px",
                    borderBottom: "2px solid #dee2e6",
                    cursor: key ? "pointer" : "default",
                    userSelect: "none",
                    textAlign: key === "totalAmount" ? "right" : "left",
                    minWidth: key === "actions" ? 140 : "auto",
                  }}
                  onClick={key ? () => handleSortChange(key) : undefined}
                >
                  {label}
                  {key && sort.key === key && (
                    <span style={{ marginLeft: 6 }}>
                      {sort.order === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    fontStyle: "italic",
                    color: "#777",
                  }}
                >
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id}
                  style={{
                    backgroundColor: selectedOrders.has(order.id)
                      ? "#e7f1ff"
                      : "transparent",
                  }}
                >
                  <td style={{ padding: "10px", textAlign: "center" }}>
                    <input
                      type="checkbox"
                      checked={selectedOrders.has(order.id)}
                      onChange={() => toggleSelectOrder(order.id)}
                      aria-label={`Select order ${order.id}`}
                    />
                  </td>
                  <td style={{ padding: "10px" }}>{order.id}</td>
                  <td style={{ padding: "10px" }}>{order.customer}</td>
                  <td style={{ padding: "10px" }}>{order.vendor}</td>
                  <td style={{ padding: "10px" }}>
                    {new Date(order.date).toLocaleString()}
                  </td>
                  <td style={{ padding: "10px" }}>{order.status}</td>
                  <td style={{ padding: "10px" }}>{order.paymentStatus}</td>
                  <td style={{ padding: "10px", textAlign: "right" }}>
                    ${order.totalAmount.toFixed(2)}
                  </td>
                  <td style={{ padding: "10px" }}>{order.deliveryMethod}</td>
                  <td style={{ padding: "10px" }}>
                    <select
                      value={order.status}
                      onChange={(e) => handleChangeStatus(order.id, e.target.value)}
                      style={{
                        padding: "6px",
                        borderRadius: 4,
                        border: "1px solid #ccc",
                        fontSize: 14,
                        cursor: "pointer",
                        width: "100%",
                      }}
                    >
                      <option>Pending</option>
                      <option>Confirmed</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                      <option>Returned</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div
        style={{
          marginTop: 24,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          style={{
            padding: "8px 12px",
            borderRadius: 4,
            border: "1px solid #ccc",
            background: page === 1 ? "#f0f0f0" : "#fff",
            cursor: page === 1 ? "not-allowed" : "pointer",
            userSelect: "none",
          }}
          aria-label="First page"
        >
          {"<<"}
        </button>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          style={{
            padding: "8px 12px",
            borderRadius: 4,
            border: "1px solid #ccc",
            background: page === 1 ? "#f0f0f0" : "#fff",
            cursor: page === 1 ? "not-allowed" : "pointer",
            userSelect: "none",
          }}
          aria-label="Previous page"
        >
          {"<"}
        </button>
        <span style={{ fontWeight: "600" }}>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          style={{
            padding: "8px 12px",
            borderRadius: 4,
            border: "1px solid #ccc",
            background: page === totalPages ? "#f0f0f0" : "#fff",
            cursor: page === totalPages ? "not-allowed" : "pointer",
            userSelect: "none",
          }}
          aria-label="Next page"
        >
          {">"}
        </button>
        <button
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
          style={{
            padding: "8px 12px",
            borderRadius: 4,
            border: "1px solid #ccc",
            background: page === totalPages ? "#f0f0f0" : "#fff",
            cursor: page === totalPages ? "not-allowed" : "pointer",
            userSelect: "none",
          }}
          aria-label="Last page"
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default OrderManagementPage;
