import React, { useState, useEffect } from "react";

const exportToCSV = (data, filename = "food-items.csv") => {
  if (data.length === 0) {
    alert("No data to export");
    return;
  }
  const csvRows = [];
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(","));

  for (const row of data) {
    const values = headers.map((h) => {
      const escaped = ("" + row[h]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(","));
  }

  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const FoodItemMasterPage = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterVendor, setFilterVendor] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const vendors = [
    { id: "v1", name: "Vendor A" },
    { id: "v2", name: "Vendor B" },
    { id: "v3", name: "Vendor C" },
  ];

  const categories = [
    { id: "c1", name: "Appetizers" },
    { id: "c2", name: "Main Course" },
    { id: "c3", name: "Desserts" },
  ];

  useEffect(() => {
    const initialData = [
      {
        id: "f1",
        name: "Spring Rolls",
        description: "Crispy vegetable rolls",
        category: "Appetizers",
        vendor: "Vendor A",
        price: 5.99,
        status: "active",
        imageUrl: "",
      },
      {
        id: "f2",
        name: "Grilled Chicken",
        description: "Succulent grilled chicken breast",
        category: "Main Course",
        vendor: "Vendor B",
        price: 12.99,
        status: "inactive",
        imageUrl: "",
      },
      {
        id: "f3",
        name: "Grilled Chicken",
        description: "Succulent grilled chicken breast",
        category: "Main Course",
        vendor: "Vendor B",
        price: 12.99,
        status: "inactive",
        imageUrl: "",
      },{
        id: "f4",
        name: "Grilled Chicken",
        description: "Succulent grilled chicken breast",
        category: "Main Course",
        vendor: "Vendor B",
        price: 12.99,
        status: "inactive",
        imageUrl: "",
      },{
        id: "f5",
        name: "Grilled Chicken",
        description: "Succulent grilled chicken breast",
        category: "Main Course",
        vendor: "Vendor B",
        price: 12.99,
        status: "inactive",
        imageUrl: "",
      },{
        id: "f6",
        name: "Grilled Chicken",
        description: "Succulent grilled chicken breast",
        category: "Main Course",
        vendor: "Vendor B",
        price: 12.99,
        status: "inactive",
        imageUrl: "",
      },
      // Add more sample items if needed
    ];
    setFoodItems(initialData);
  }, []);

  useEffect(() => {
    let items = [...foodItems];

    if (searchText.trim()) {
      const s = searchText.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(s) ||
          item.description.toLowerCase().includes(s)
      );
    }

    if (filterCategory) {
      items = items.filter((item) => item.category === filterCategory);
    }

    if (filterVendor) {
      items = items.filter((item) => item.vendor === filterVendor);
    }

    if (filterStatus) {
      items = items.filter((item) => item.status === filterStatus);
    }

    items.sort((a, b) => {
      let compare = 0;
      if (typeof a[sortField] === "string") {
        compare = a[sortField].localeCompare(b[sortField]);
      } else {
        compare = a[sortField] - b[sortField];
      }
      return sortOrder === "asc" ? compare : -compare;
    });

    setFilteredItems(items);
    setCurrentPage(1);
  }, [
    foodItems,
    searchText,
    filterCategory,
    filterVendor,
    filterStatus,
    sortField,
    sortOrder,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSelectItem = (id) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const toggleSelectAll = () => {
    if (
      paginatedItems.length > 0 &&
      selectedItems.size === paginatedItems.length
    ) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(paginatedItems.map((item) => item.id)));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this item?")) {
      setFoodItems(foodItems.filter((item) => item.id !== id));
      setSelectedItems((prev) => {
        const newSelected = new Set(prev);
        newSelected.delete(id);
        return newSelected;
      });
    }
  };

  const handleBulkDelete = () => {
    if (selectedItems.size === 0) {
      alert("No items selected for bulk delete");
      return;
    }
    if (
      window.confirm(`Are you sure to delete ${selectedItems.size} items?`)
    ) {
      setFoodItems(foodItems.filter((item) => !selectedItems.has(item.id)));
      setSelectedItems(new Set());
    }
  };

  const toggleStatus = (id) => {
    setFoodItems(
      foodItems.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "active" ? "inactive" : "active",
            }
          : item
      )
    );
  };

  const handleAddNew = () => {
    alert("Add new food item - implement form or navigation.");
  };

  const handleEdit = (id) => {
    alert(`Edit food item ${id} - implement form or navigation.`);
  };

  return (
    <>
      <style>{`
        .container {
          font-family: Arial, sans-serif;
          height: 100vh;
          width: 100%;
          padding: 40px;
        }
        h2 {
          margin-bottom: 30px;
        }
        .controls {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 35px;
          justify-content: center;
        }
        .controls input[type="text"],
        .controls select {
          padding: 6px 10px;
          font-size: 14px;
        }
        button {
          padding: 6px 12px;
          font-size: 14px;
          cursor: pointer;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 15px;
        }
        table th, table td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: center;
          vertical-align: middle;
        }
        table th {
          background-color: #f4f4f4;
        }
        img {
          border-radius: 4px;
          object-fit: cover;
        }
        .pagination {
          text-align: center;
          margin-top: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
          gap: 5px;
        }
        .pagination button {
          margin: 0 5px;
        }
      `}</style>
      <div className="container">
        <h2>Food Item Master Page</h2>

        <div className="controls">
          <input
            type="text"
            placeholder="Search by name or description"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={filterVendor}
            onChange={(e) => setFilterVendor(e.target.value)}
          >
            <option value="">All Vendors</option>
            {vendors.map((v) => (
              <option key={v.id} value={v.name}>
                {v.name}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="status">Sort by Status</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>

          <button onClick={handleAddNew}>Add New</button>
          <button onClick={() => exportToCSV(filteredItems)}>Export CSV</button>
          <button onClick={handleBulkDelete} disabled={selectedItems.size === 0}>
            Delete Selected
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={
                    paginatedItems.length > 0 &&
                    selectedItems.size === paginatedItems.length
                  }
                  onChange={toggleSelectAll}
                />
              </th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Vendor</th>
              <th>Price ($)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.length === 0 ? (
              <tr>
                <td colSpan="9">No food items found.</td>
              </tr>
            ) : (
              paginatedItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedItems.has(item.id)}
                      onChange={() => toggleSelectItem(item.id)}
                    />
                  </td>
                  <td>
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        width={50}
                        height={50}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.category}</td>
                  <td>{item.vendor}</td>
                  <td>{item.price.toFixed(2)}</td>
                  <td>
                    <button onClick={() => toggleStatus(item.id)}>
                      {item.status === "active" ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleEdit(item.id)}>Edit</button>{" "}
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </button>
          Page {currentPage} of {totalPages}
          <button
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default FoodItemMasterPage;
