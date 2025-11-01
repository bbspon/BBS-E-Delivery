import React, { useState } from "react";

const initialMenu = [
  { id: 1, name: "Burger", price: 5.99 },
  { id: 2, name: "Pizza", price: 8.99 },
  { id: 3, name: "Pasta", price: 7.49 },
  { id: 4, name: "Salad", price: 4.99 }
];

export default function MenuBuilderPage() {
  const [menuItems, setMenuItems] = useState(initialMenu);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");

  function addMenuItem() {
    if (!newName.trim() || isNaN(parseFloat(newPrice)) || parseFloat(newPrice) < 0) return;
    const newItem = {
      id: menuItems.length ? menuItems[menuItems.length - 1].id + 1 : 1,
      name: newName.trim(),
      price: parseFloat(newPrice)
    };
    setMenuItems([...menuItems, newItem]);
    setNewName("");
    setNewPrice("");
  }

  function removeMenuItem(id) {
    setMenuItems(menuItems.filter(item => item.id !== id));
  }

  function updateMenuItem(id, field, value) {
    setMenuItems(menuItems.map(item => item.id === id ? { ...item, [field]: value } : item));
  }

  // Calculate total price of all menu items
  const totalPrice = menuItems.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);

  const canAdd = newName.trim() !== "" && !isNaN(parseFloat(newPrice)) && parseFloat(newPrice) >= 0;

  return (
    <div className="container mt-5 vh-100">
      <h2 className="mb-5">Menu Builder (Food Only)</h2>

      <table className="table table-bordered " >
        <thead  >
          <tr >
            <th>Name</th>
            <th      >Price ($)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map(({ id, name, price }) => (
            <tr key={id}>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={e => updateMenuItem(id, "name", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={price}
                  step="0.01"
                  min="0"
                  onChange={e => updateMenuItem(id, "price", parseFloat(e.target.value) || 0)}
                />
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeMenuItem(id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}

          <tr>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="New item name"
                value={newName}
                onChange={e => setNewName(e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={newPrice}
                step="0.01"
                min="0"
                onChange={e => setNewPrice(e.target.value)}
              />
            </td>
            <td>
              <button
                className="btn btn-primary btn-sm"
                onClick={addMenuItem}
                disabled={!canAdd}
              >
                Add
              </button>
            </td>
          </tr>

          {/* Total Price Row */}
          <tr>
            <td className="text-center fw-bold">Total Price:</td>
            <td colSpan="2" className="fw-bold">${totalPrice.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
