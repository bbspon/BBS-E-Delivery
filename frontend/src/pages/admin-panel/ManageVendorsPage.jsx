import React, { useState, useEffect, useMemo } from "react";

// Sample vendor data format
const sampleVendors = [
  {
    id: 1,
    name: "Fresh Farm Groceries",
    category: "Grocery",
    location: "New York",
    status: "Active",
    rating: 4.5,
    totalSales: 1200,
    walletBalance: 3500,
    joinDate: "2023-01-15",
  },
  {
    id: 2,
    name: "Tech Gadget Store",
    category: "Electronics",
    location: "San Francisco",
    status: "Suspended",
    rating: 3.8,
    totalSales: 800,
    walletBalance: 1200,
    joinDate: "2022-11-08",
  },
    {
    id: 3,
    name: "Tech Gadget Store",
    category: "Electronics",
    location: "San Francisco",
    status: "Suspended",
    rating: 3.8,
    totalSales: 800,
    walletBalance: 1200,
    joinDate: "2022-11-08",
  },
  
  {
    id: 4,
    name: "Tech Gadget Store",
    category: "Electronics",
    location: "San Francisco",
    status: "Suspended",
    rating: 3.8,
    totalSales: 800,
    walletBalance: 1200,
    joinDate: "2022-11-08",
  },

  {
    id: 5,
    name: "Tech Gadget Store",
    category: "Electronics",
    location: "San Francisco",
    status: "Suspended",
    rating: 3.8,
    totalSales: 800,
    walletBalance: 1200,
    joinDate: "2022-11-08",
  },

  {
    id: 6,
    name: "Tech Gadget Store",
    category: "Electronics",
    location: "San Francisco",
    status: "Suspended",
    rating: 3.8,
    totalSales: 800,
    walletBalance: 1200,
    joinDate: "2022-11-08",
  },
];

// Utility: sort array by key
const sortByKey = (array, key, ascending = true) => {
  return [...array].sort((a, b) => {
    if (a[key] < b[key]) return ascending ? -1 : 1;
    if (a[key] > b[key]) return ascending ? 1 : -1;
    return 0;
  });
};

export default function ManageVendorsPage() {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortKey, setSortKey] = useState("name");
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedVendors, setSelectedVendors] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [modalVendor, setModalVendor] = useState(null);

  useEffect(() => {
    setVendors(sampleVendors);
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 on filter/search change
  }, [searchTerm, filterStatus, filterCategory]);

  const filteredVendors = useMemo(() => {
    let filtered = vendors;

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (v) =>
          v.name.toLowerCase().includes(term) ||
          v.location.toLowerCase().includes(term)
      );
    }

    if (filterStatus !== "All") {
      filtered = filtered.filter((v) => v.status === filterStatus);
    }

    if (filterCategory !== "All") {
      filtered = filtered.filter((v) => v.category === filterCategory);
    }

    return sortByKey(filtered, sortKey, sortAsc);
  }, [vendors, searchTerm, filterStatus, filterCategory, sortKey, sortAsc]);

  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);
  const paginatedVendors = filteredVendors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSelectVendor = (id) => {
    const newSet = new Set(selectedVendors);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    setSelectedVendors(newSet);
  };

  const toggleSelectAll = () => {
    const allSelected = paginatedVendors.every((v) =>
      selectedVendors.has(v.id)
    );
    const newSet = new Set(selectedVendors);
    paginatedVendors.forEach((v) =>
      allSelected ? newSet.delete(v.id) : newSet.add(v.id)
    );
    setSelectedVendors(newSet);
  };

  const bulkChangeStatus = (newStatus) => {
    setVendors((prev) =>
      prev.map((v) =>
        selectedVendors.has(v.id) ? { ...v, status: newStatus } : v
      )
    );
    setSelectedVendors(new Set());
  };

  const openVendorModal = (vendor) => setModalVendor(vendor);
  const closeVendorModal = () => setModalVendor(null);
  const saveVendorChanges = (updated) => {
    setVendors((prev) =>
      prev.map((v) => (v.id === updated.id ? updated : v))
    );
    closeVendorModal();
  };

  const distinctCategories = useMemo(() => {
    const cats = new Set(vendors.map((v) => v.category));
    return ["All", ...cats];
  }, [vendors]);

  const distinctStatuses = useMemo(() => {
    const stats = new Set(vendors.map((v) => v.status));
    return ["All", ...stats];
  }, [vendors]);

  return (
   <>
   <div>
     <div className="vh-100 p-5" style={{ padding: 30, fontFamily: "Arial" }}>
      <h2>📦 Manage Vendors</h2>

      {/* Filters */}
      <div className="d-flex justify-content-between p-2" style={{ marginBottom: 20 }}>
        <input
          placeholder="Search name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: 8, marginRight: 10, width: 220 }}
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ padding: 8, marginRight: 10 }}
        >
          {distinctStatuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          style={{ padding: 8, marginRight: 10 }}
        >
          {distinctCategories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          style={{ padding: 8, marginRight: 10 }}
        >
          <option value="name">Sort by Name</option>
          <option value="rating">Sort by Rating</option>
          <option value="totalSales">Sort by Sales</option>
          <option value="joinDate">Sort by Join Date</option>
          <option value="walletBalance">Sort by Wallet</option>
        </select>
        <button
          onClick={() => setSortAsc((prev) => !prev)}
          style={{ padding: 8 }}
        >
          {sortAsc ? "⬆️ Asc" : "⬇️ Desc"}
        </button>
      </div>

      {/* Bulk Actions */}
      {selectedVendors.size > 0 && (
        <div style={{ marginBottom: 15 }}>
          <strong>{selectedVendors.size} selected:</strong>
          <button onClick={() => bulkChangeStatus("Active")} style={btnStyle}>
            Activate
          </button>
          <button onClick={() => bulkChangeStatus("Inactive")} style={btnStyle}>
            Deactivate
          </button>
          <button onClick={() => bulkChangeStatus("Suspended")} style={btnStyle}>
            Suspend
          </button>
        </div>
      )}

      {/* Table */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th className="p-3">
              <input
                type="checkbox"
                checked={
                  paginatedVendors.length > 0 &&
                  paginatedVendors.every((v) => selectedVendors.has(v.id))
                }
                onChange={toggleSelectAll}
              />
            </th>
            <th >Name</th>
            <th>Category</th>
            <th>Location</th>
            <th>Status</th>
            <th>Rating</th>
            <th>Sales</th>
            <th>Wallet</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedVendors.length === 0 ? (
            <tr>
              <td colSpan="10" style={{ textAlign: "center" }}>
                No vendors found.
              </td>
            </tr>
          ) : (
            paginatedVendors.map((v) => (
              <tr
                key={v.id}
                style={{
                  backgroundColor:
                    v.status === "Suspended"
                      ? "#ffe6e6"
                      : v.status === "Inactive"
                      ? "#fff6e6"
                      : "white",
                }}
              >
                <td className="p-3 ">
                  <input
                    type="checkbox"
                    checked={selectedVendors.has(v.id)}
                    onChange={() => toggleSelectVendor(v.id)}
                  />
                </td>
                <td>{v.name}</td>
                <td>{v.category}</td>
                <td>{v.location}</td>
                <td>{v.status}</td>
                <td>{v.rating.toFixed(1)}</td>
                <td>{v.totalSales}</td>
                <td>${v.walletBalance.toFixed(2)}</td>
                <td>{v.joinDate}</td>
                <td>
                  <button onClick={() => openVendorModal(v)}>Edit</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div  className="d-flex justify-content-end align-items-center" style={{ marginTop: 20 }}>
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          style={btnStyle}
          className="me-2"
        >
          ◀ Prev
        </button>
         {currentPage} of {totalPages}
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          style={btnStyle}
        >
          Next ▶
        </button>
      </div>

      {modalVendor && (
        <VendorModal
          vendor={modalVendor}
          onClose={closeVendorModal}
          onSave={saveVendorChanges}
        />
      )}
    </div>
   </div>
   </>
  );
}

// Modal
function VendorModal({ vendor, onClose, onSave }) {
  const [editVendor, setEditVendor] = useState({ ...vendor });

  const hasChanges =
    editVendor.name !== vendor.name || editVendor.status !== vendor.status;

  useEffect(() => {
    const handleEscape = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Edit Vendor</h3>
        <div style={{ marginBottom: 10 }}>
          <label>
            Name:{" "}
            <input
              type="text"
              value={editVendor.name}
              onChange={(e) =>
                setEditVendor((prev) => ({ ...prev, name: e.target.value }))
              }
              style={{ width: "100%", padding: 6 }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label>
            Status:{" "}
            <select
              value={editVendor.status}
              onChange={(e) =>
                setEditVendor((prev) => ({ ...prev, status: e.target.value }))
              }
              style={{ width: "100%", padding: 6 }}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
          </label>
        </div>
        <div style={{ textAlign: "right" }}>
          <button
            onClick={() => onSave(editVendor)}
            disabled={!hasChanges}
            style={{ ...btnStyle, marginRight: 10 }}
          >
            Save
          </button>
          <button onClick={onClose} style={btnStyle}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// Styling
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  border: "3px solid #ccc",
  marginBottom: 10,

};

const btnStyle = {
  marginLeft: 10,
  padding: "6px 12px",
  cursor: "pointer",
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

const modalStyle = {
  backgroundColor: "white",
  padding: 20,
  borderRadius: 8,
  width: 400,
  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
};

