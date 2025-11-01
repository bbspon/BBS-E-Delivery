import React, { useState, useEffect } from "react";

const PAGE_SIZE = 5;

const ManageCustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortField, setSortField] = useState(null); // "name" or "status"
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"
  const [currentPage, setCurrentPage] = useState(1);
  const [viewCustomer, setViewCustomer] = useState(null);

  useEffect(() => {
    // Simulated fetch
    const data = [
      { id: 1, name: "Alice Johnson", email: "alice@example.com", status: "Active" },
      { id: 2, name: "Bob Smith", email: "bob@example.com", status: "Inactive" },
      { id: 3, name: "Charlie Lee", email: "charlie@example.com", status: "Active" },
      { id: 4, name: "Diana Prince", email: "diana@example.com", status: "Inactive" },
      { id: 5, name: "Ethan Hunt", email: "ethan@example.com", status: "Active" },
      { id: 6, name: "Fiona Gallagher", email: "fiona@example.com", status: "Active" },
      { id: 7, name: "George Martin", email: "george@example.com", status: "Inactive" },
      { id: 8, name: "Hannah Baker", email: "hannah@example.com", status: "Active" },
      { id: 9, name: "Ian Malcolm", email: "ian@example.com", status: "Active" },
      { id: 10, name: "Jane Doe", email: "jane@example.com", status: "Inactive" },
    ];
    setCustomers(data);
  }, []);

  // Apply filtering, searching, sorting
  useEffect(() => {
    let data = [...customers];

    // Filter by status
    if (statusFilter !== "All") {
      data = data.filter((c) => c.status === statusFilter);
    }

    // Search filter
    if (searchTerm.trim() !== "") {
      data = data.filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortField) {
      data.sort((a, b) => {
        let compA = a[sortField];
        let compB = b[sortField];
        if (typeof compA === "string") compA = compA.toLowerCase();
        if (typeof compB === "string") compB = compB.toLowerCase();
        if (compA < compB) return sortOrder === "asc" ? -1 : 1;
        if (compA > compB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFiltered(data);
    setCurrentPage(1); // Reset to first page on filter change
  }, [customers, statusFilter, searchTerm, sortField, sortOrder]);

  // Pagination controls
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const pagedData = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const changeSort = (field) => {
    if (sortField === field) {
      // toggle order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter((c) => c.id !== id));
      alert("Customer deleted");
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setSortField(null);
    setSortOrder("asc");
  };

  return (
  <>
  <div style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/3d-customer-data-management-background-image-rendered_18199-177.jpg')" 
  , backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  height: "100vh"
  }}>
      <div className="container p-5">
      <h2 className="mb-4 font-weight-bold">Manage Customers</h2>

      <div className="d-flex justify-content-between mb-5">
        <div className="col-md-4 mb-2">
          <input
            type="text"
            placeholder="Search customers by name..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="col-md-3 mb-2 ">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="col-md-2 mb-2">
          <button className="btn btn-secondary w-100" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      </div>

      <table className="table table-bordered table-hover ">
        <thead className="table-light ">
          <tr>
            <th>#</th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => changeSort("name")}
            >
              Name{" "}
              {sortField === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
            </th>
            <th>Email</th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => changeSort("status")}
            >
              Status{" "}
              {sortField === "status"
                ? sortOrder === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pagedData.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No customers found.
              </td>
            </tr>
          ) : (
            pagedData.map((cust, index) => (
              <tr key={cust.id}>
                <td>{(currentPage - 1) * PAGE_SIZE + index + 1}</td>
                <td>{cust.name}</td>
                <td>{cust.email}</td>
                <td>
                  <span
                    className={
                      cust.status === "Active"
                        ? "badge bg-success"
                        : "badge bg-secondary"
                    }
                  >
                    {cust.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-info me-2"
                    onClick={() => setViewCustomer(cust)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() =>
                      alert(`Edit functionality for ${cust.name} here`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(cust.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <nav className="mt-4 d-flex justify-content-end">
        <ul className="pagination justify-content-center gap-2">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            >
              Previous
            </button>
          </li>
                    
          {[...Array(pageCount).keys()].map((n) => (
            <li
              key={n + 1}
              className={`page-item ${currentPage === n + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(n + 1)}
              >
                {n + 1}
              </button>
            </li>
          ))}

          <li
            className={`page-item ${
              currentPage === pageCount || pageCount === 0 ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, pageCount))}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>

      {/* View Modal */}
      {viewCustomer && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
          onClick={() => setViewCustomer(null)}
        >
          <div
            className="modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Customer Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setViewCustomer(null)}
                />
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> {viewCustomer.name}</p>
                <p><strong>Email:</strong> {viewCustomer.email}</p>
                <p><strong>Status:</strong> {viewCustomer.status}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setViewCustomer(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    
    </div></>
  );
};

export default ManageCustomersPage;
