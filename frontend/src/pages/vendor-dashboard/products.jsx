import React, { useEffect, useState } from "react";

export default function ProductManagementPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortKey, setSortKey] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetch("/api/vendor/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter & Search
  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || p.module === filter;
    return matchesSearch && matchesFilter;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;
    let aVal = a[sortKey];
    let bVal = b[sortKey];
    if (typeof aVal === "string") aVal = aVal.toLowerCase();
    if (typeof bVal === "string") bVal = bVal.toLowerCase();

    if (aVal > bVal) return sortAsc ? 1 : -1;
    if (aVal < bVal) return sortAsc ? -1 : 1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function handleSort(key) {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  function toggleSelect(id) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function toggleSelectAll() {
    const pageIds = paginated.map((p) => p.id);
    const allSelected = pageIds.every((id) => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedIds((prev) => [...new Set([...prev, ...pageIds])]);
    }
  }

  function deleteProducts(ids) {
    if (ids.length === 0) return alert("No products selected");
    if (
      !window.confirm(
        `Are you sure you want to delete ${ids.length} product${ids.length > 1 ? "s" : ""}? This action cannot be undone.`
      )
    )
      return;

    // Simulate delete call; replace with actual API call
    setProducts((prev) => prev.filter((p) => !ids.includes(p.id)));
    setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)));
  }

  return (
    <div className="container pt-5 vh-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Product Management</h1>
     <button 
  className="btn btn-primary"
  onClick={() => (window.location.href = "/add-edit-product/:id")}
>
  + Add New Product
</button>

      </div>

      <div className="row mb-3 g-2">
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Modules</option>
            <option value="ecom">E-commerce</option>
            <option value="grocery">Grocery</option>
            <option value="food">Food</option>
            <option value="water">Water</option>
            <option value="service">Service</option>
          </select>
        </div>
        <div className="col-md-3 d-flex">
          <button
            className="btn btn-outline-secondary flex-grow-1"
            onClick={() => {
              setSearch("");
              setFilter("all");
            }}
          >
            Clear
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th scope="col">
                <input
                  type="checkbox"
                  checked={
                    paginated.length > 0 &&
                    paginated.every((p) => selectedIds.includes(p.id))
                  }
                  onChange={toggleSelectAll}
                />
              </th>
              {[
                { key: "name", label: "Name" },
                { key: "category", label: "Category" },
                { key: "price", label: "Price" },
                { key: "stock", label: "Stock" },
                { key: "status", label: "Status" },
                { key: "module", label: "Module" },
                { key: "actions", label: "Actions" },
              ].map(({ key, label }) => (
                <th
                  key={key}
                  role={key !== "actions" ? "button" : undefined}
                  onClick={() => key !== "actions" && handleSort(key)}
                  style={{ userSelect: "none" }}
                  className={key !== "actions" ? "text-primary" : ""}
                >
                  {label}{" "}
                  {sortKey === key && (sortAsc ? "▲" : "▼")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  Loading products...
                </td>
              </tr>
            ) : paginated.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No products found.
                </td>
              </tr>
            ) : (
              paginated.map((product) => (
                <tr key={product.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(product.id)}
                      onChange={() => toggleSelect(product.id)}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>₹{product.price.toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td>
                    <span
                      className={`badge ${
                        product.status === "active"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="text-capitalize">{product.module}</td>
                  <td>
                    <button
                      className="btn btn-link p-0 me-3"
                      onClick={() =>
                        (window.location.href = `/vendor/products/edit/${product.id}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-link p-0 text-danger"
                      onClick={() => deleteProducts([product.id])}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedIds.length > 0 && (
        <div className="mb-3">
          <button
            className="btn btn-danger"
            onClick={() => deleteProducts(selectedIds)}
          >
            Delete Selected ({selectedIds.length})
          </button>
        </div>
      )}

      {/* Pagination */}
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </button>
          </li>
          <li className="page-item disabled">
            <span className="page-link">
              Page {currentPage} of {totalPages}
            </span>
          </li>
          <li
            className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
          >
            <button
              className="page-link"
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
