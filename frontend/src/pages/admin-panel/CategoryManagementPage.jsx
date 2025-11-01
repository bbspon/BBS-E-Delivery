// CategoryManagementPage.jsx

import React, { useState, useEffect } from "react";

const mockCategories = [
  {
    id: 1,
    name: "Fruits & Vegetables",
    description: "Fresh fruits and veggies",
    status: "active",
    imageUrl: "https://wallpaperaccess.com/full/1537398.jpg",
  },
  {
    id: 2,
    name: "Dairy Products",
    description: "Milk, cheese, and more",
    status: "inactive",
    imageUrl: "https://thumbs.dreamstime.com/b/milk-21098718.jpg",
  },
  {
    id: 3,
    name: "Beverages",
    description: "Juices, soda, and drinks",
    status: "active",
    imageUrl: "https://st2.depositphotos.com/1875851/7411/i/450/depositphotos_74118935-stock-photo-row-of-various-beverages.jpg",
  },
  // Add more mock data as needed
];

export default function CategoryManagementPage() {
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "active",
    imageUrl: "",
    imageFile: null,
  });

  // Load initial categories (simulate API call)
  useEffect(() => {
    setCategories(mockCategories);
  }, []);

  // Filter + search logic
  useEffect(() => {
    let result = [...categories];
    if (statusFilter !== "all") {
      result = result.filter((c) => c.status === statusFilter);
    }
    if (searchText.trim() !== "") {
      const lower = searchText.toLowerCase();
      result = result.filter((c) => c.name.toLowerCase().includes(lower));
    }
    setFiltered(result);
    setPage(1);
  }, [categories, searchText, statusFilter]);

  // Pagination helpers
  const pageCount = Math.ceil(filtered.length / pageSize);
  const paginatedData = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Handle select toggle
  const toggleSelect = (id) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  // Handle select all on current page
  const toggleSelectAll = () => {
    const allOnPage = paginatedData.every((c) => selectedIds.has(c.id));
    const newSet = new Set(selectedIds);
    if (allOnPage) {
      paginatedData.forEach((c) => newSet.delete(c.id));
    } else {
      paginatedData.forEach((c) => newSet.add(c.id));
    }
    setSelectedIds(newSet);
  };

  // Handle delete category (soft delete)
  const deleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((c) => c.id !== id));
      setSelectedIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  // Bulk delete
  const bulkDelete = () => {
    if (selectedIds.size === 0) return alert("No categories selected");
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedIds.size} selected categories?`
      )
    ) {
      setCategories(categories.filter((c) => !selectedIds.has(c.id)));
      setSelectedIds(new Set());
    }
  };

  // Bulk activate/deactivate
  const bulkChangeStatus = (newStatus) => {
    if (selectedIds.size === 0) return alert("No categories selected");
    setCategories(
      categories.map((c) =>
        selectedIds.has(c.id) ? { ...c, status: newStatus } : c
      )
    );
    setSelectedIds(new Set());
  };

  // Form handlers
  const openAddForm = () => {
    setEditingCategory(null);
    setFormData({
      name: "",
      description: "",
      status: "active",
      imageUrl: "",
      imageFile: null,
    });
  };

  const openEditForm = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      status: category.status,
      imageUrl: category.imageUrl || "",
      imageFile: null,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      const file = files[0];
      if (file) {
        setFormData((fd) => ({
          ...fd,
          imageFile: file,
          imageUrl: URL.createObjectURL(file),
        }));
      }
    } else {
      setFormData((fd) => ({ ...fd, [name]: value }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() === "") {
      return alert("Category name is required");
    }

    if (editingCategory) {
      // Edit existing
      setCategories((cats) =>
        cats.map((c) =>
          c.id === editingCategory.id
            ? {
                ...c,
                name: formData.name,
                description: formData.description,
                status: formData.status,
                imageUrl: formData.imageUrl,
              }
            : c
        )
      );
      alert("Category updated!");
    } else {
      // Add new
      const newCategory = {
        id: Math.max(0, ...categories.map((c) => c.id)) + 1,
        name: formData.name,
        description: formData.description,
        status: formData.status,
        imageUrl: formData.imageUrl,
      };
      setCategories([newCategory, ...categories]);
      alert("Category added!");
    }
    setEditingCategory(null);
    setFormData({
      name: "",
      description: "",
      status: "active",
      imageUrl: "",
      imageFile: null,
    });
  };

  return (
    <>
      <style>{`
        .container {
          margin: 20px auto;
          padding: 15px;
          font-family: Arial, sans-serif;
          width: 100%;
          height: 100vh;
        }
        h2 {
          margin-bottom: 20px;
        }
        .filters {
          display: flex;
          justify-content: space-between;
          margin-bottom: 35px;
          flex-wrap: wrap;
          gap: 10px;
        }
        .filters input[type="text"] {
          flex: 1;
          padding: 8px;
          font-size: 1rem;
        }
        .filters select {
          padding: 8px;
          font-size: 1rem;
          min-width: 140px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 10px;
        }
        table th,
        table td {
          border: 1px solid #ddd;
          padding: 15px 25px;
          text-align: left;
          vertical-align: middle;
        }
        table th {
          background-color:rgba(128, 106, 106, 0.4);
        }
        img.category-image {
          width: 80px;
          height:60px;
          object-fit: cover;
          border-radius: 4px;
        }
        .actions button {
          margin-right: 6px;
          padding: 5px 10px;
          cursor: pointer;
          font-size: 0.9rem;
        }
        .bulk-actions {
          margin-bottom: 15px;
        }
        .pagination {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 15px;
          flex-wrap: wrap;
        }
        .pagination button {
          padding: 6px 12px;
          cursor: pointer;
          font-size: 1rem;
        }
        .pagination button:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
        form {
          max-width: 500px;
          margin: 20px auto;
          padding: 15px;
          border: 1px solid #ccc;
          border-radius: 6px;
          background: #fafafa;
        }
        form label {
          display: block;
          margin-bottom: 6px;
          font-weight: 600;
        }
        form input[type="text"],
        form textarea,
        form select {
          width: 100%;
          padding: 8px;
          margin-bottom: 12px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          resize: vertical;
        }
        form textarea {
          min-height: 60px;
        }
        form img.preview {
          max-width: 100px;
          max-height: 100px;
          margin-bottom: 12px;
          border-radius: 6px;
          object-fit: cover;
          border: 1px solid #ccc;
        }
        form button {
          padding: 8px 16px;
          font-size: 1rem;
          cursor: pointer;
          border: none;
          border-radius: 4px;
          background-color: #007bff;
          color: white;
        }
        form button.cancel {
          background-color: #999;
          margin-left: 10px;
        }
        @media (max-width: 600px) {
          .filters {
            flex-direction: column;
          }
          .actions button {
            margin-bottom: 6px;
          }
          form {
            margin: 10px;
          }
        }
      `}</style>

      <div style={{ backgroundImage: `url('')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
       }}>
        <div className="container">
        <h2 >Category Management</h2>

        {/* Filters */}
        <div className="filters">
          <input
            type="text"
            placeholder="Search categories by name..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button onClick={openAddForm}>Add New Category</button>
        </div>

        {/* Bulk Actions */}
        {selectedIds.size > 0 && (
          <div className="bulk-actions">
            <button onClick={bulkDelete}>Delete Selected</button>
            <button onClick={() => bulkChangeStatus("active")}>
              Set Active
            </button>
            <button onClick={() => bulkChangeStatus("inactive")}>
              Set Inactive
            </button>
          </div>
        )}

        {/* Categories Table */}
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={toggleSelectAll}
                  checked={
                    paginatedData.length > 0 &&
                    paginatedData.every((c) => selectedIds.has(c.id))
                  }
                />
              </th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th style={{ minWidth: "180px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                  No categories found.
                </td>
              </tr>
            ) : (
              paginatedData.map((category) => (
                <tr key={category.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(category.id)}
                      onChange={() => toggleSelect(category.id)}
                    />
                  </td>
                  <td>
                    {category.imageUrl ? (
                      <img
                        src={category.imageUrl}
                        alt={category.name}
                        className="category-image"

                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td
                    style={{
                      color:
                        category.status === "active" ? "green" : "crimson",
                      fontWeight: "600",
                    }}
                  >
                    {category.status}
                  </td>
                  <td className="actions">
                    <button onClick={() => openEditForm(category)}>Edit</button>
                    <button
                      onClick={() => deleteCategory(category.id)}
                      style={{ backgroundColor: "crimson", color: "white" }}
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
        {pageCount > 1 && (
          <div className="pagination">
            <button onClick={() => setPage(1)} disabled={page === 1}>
              {"<<"}
            </button>
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
              {"<"}
            </button>
            <span>
              Page {page} of {pageCount}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={page === pageCount}
            >
              {">"}
            </button>
            <button onClick={() => setPage(pageCount)} disabled={page === pageCount}>
              {">>"}
            </button>
          </div>
        )}

        {/* Add / Edit Form */}
        {(editingCategory !== null || formData.name !== "") && (
          <form onSubmit={handleFormSubmit}>
            <h3>{editingCategory ? "Edit Category" : "Add New Category"}</h3>
            <label htmlFor="name">Category Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>

            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <label htmlFor="imageFile">Category Image</label>
            {formData.imageUrl && (
              <img src={formData.imageUrl} alt="preview" className="preview" />
            )}
            <input
              id="imageFile"
              name="imageFile"
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md m-4"
            />

            <button type="submit">{editingCategory ? "Update" : "Add"}</button>
            <button
              type="button"
              className="cancel"
              onClick={() => {
                setEditingCategory(null);
                setFormData({
                  name: "",
                  description: "",
                  status: "active",
                  imageUrl: "",
                  imageFile: null,
                });
              }}
            >
              Cancel
            </button>
          </form>
        )}
      </div>
      </div>
    </>
  );
}
