import React, { useState, useEffect } from "react";

const mockProducts = [
  { id: 1, name: "Apples", sku: "APL123", price: 2.5, stock: 100 },
  { id: 2, name: "Bananas", sku: "BAN456", price: 1.8, stock: 150 },
  { id: 3, name: "Carrots", sku: "CAR789", price: 0.9, stock: 200 },
  // Add more mock products as needed
];

export default function ComboOfferCreationPage() {
  const [comboName, setComboName] = useState("");
  const [comboSKU, setComboSKU] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productQuantities, setProductQuantities] = useState({});
  const [comboPrice, setComboPrice] = useState("");
  const [discountType, setDiscountType] = useState("fixed"); // 'fixed' or 'percentage'
  const [discountPercent, setDiscountPercent] = useState(0);
  const [description, setDescription] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validTo, setValidTo] = useState("");
  const [comboImage, setComboImage] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [maxPurchaseLimit, setMaxPurchaseLimit] = useState("");
  const [eligibility, setEligibility] = useState("all"); // all, new_customers, loyalty_members

  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState("");

  // Generate SKU automatically from comboName (simple slug)
  useEffect(() => {
    if (comboName.trim()) {
      const sku = comboName.trim().toUpperCase().replace(/\s+/g, "-").substring(0, 20);
      setComboSKU(sku);
    } else {
      setComboSKU("");
    }
  }, [comboName]);

  // Calculate suggested price (sum of product prices * quantities)
  const suggestedPrice = selectedProducts.reduce((total, prodId) => {
    const product = mockProducts.find(p => p.id === prodId);
    const qty = productQuantities[prodId] || 1;
    return total + (product ? product.price * qty : 0);
  }, 0);

  // Calculate combo price if discount is percentage
  const computedComboPrice = discountType === "percentage"
    ? (suggestedPrice * (100 - discountPercent)) / 100
    : comboPrice === "" ? suggestedPrice : Number(comboPrice);

  // Handle product selection
  function toggleProductSelection(productId) {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
      const newQuantities = { ...productQuantities };
      delete newQuantities[productId];
      setProductQuantities(newQuantities);
    } else {
      setSelectedProducts([...selectedProducts, productId]);
      setProductQuantities({ ...productQuantities, [productId]: 1 });
    }
  }

  // Handle quantity change for selected product
  function handleQuantityChange(productId, value) {
    const val = Number(value);
    if (val < 1) return;
    if (val > mockProducts.find(p => p.id === productId)?.stock) {
      alert("Quantity exceeds available stock!");
      return;
    }
    setProductQuantities({ ...productQuantities, [productId]: val });
  }

  // Handle image upload
  function handleImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      setComboImage(URL.createObjectURL(e.target.files[0]));
    }
  }

  // Validate form before submit
  function validateForm() {
    const errs = {};
    if (!comboName.trim()) errs.comboName = "Combo name is required";
    if (selectedProducts.length === 0) errs.products = "At least one product must be selected";
    if (computedComboPrice <= 0) errs.comboPrice = "Combo price must be greater than zero";
    if (discountType === "percentage" && (discountPercent < 0 || discountPercent > 100)) errs.discountPercent = "Discount % must be between 0 and 100";
    if (validFrom && validTo && new Date(validTo) < new Date(validFrom)) errs.validity = "End date must be after start date";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  // Submit handler
  function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    // Prepare combo data
    const comboData = {
      name: comboName.trim(),
      sku: comboSKU,
      products: selectedProducts.map(id => ({
        id,
        quantity: productQuantities[id]
      })),
      price: computedComboPrice,
      discountType,
      discountPercent: discountType === "percentage" ? discountPercent : 0,
      description,
      validFrom: validFrom || null,
      validTo: validTo || null,
      active: isActive,
      maxPurchaseLimit: maxPurchaseLimit ? Number(maxPurchaseLimit) : null,
      eligibility,
      imageUrl: comboImage || null,
    };

    console.log("Submitting combo data:", comboData);

    // Simulate API call
    setSubmissionStatus("Submitting...");
    setTimeout(() => {
      setSubmissionStatus("Combo saved successfully!");
      // Reset form or keep data?
      // Here we keep data for further edits
    }, 1500);
  }

  return (
    <div className=" py-4 bg-light rounded shadow-sm border  background-color:rgb(11, 118, 224);"  
    style={{ margin: "50px 60px",padding: "40px", border: "1px solid #ccc", borderRadius: "8px", boxShadow: "0 2px 4px rgba(41, 39, 39, 0.38)" }}>
      <h2 className="text-center mb-4"> Combo / Offer Creation (Grocery Only)</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* Combo Name and SKU */}
        <div className="mb-3">
          <label htmlFor="comboName" className="form-label">Combo Name *</label>
          <input
            type="text"
            className={`form-control ${errors.comboName ? "is-invalid" : ""}`}
            id="comboName"
            value={comboName}
            onChange={(e) => setComboName(e.target.value)}
            placeholder="Enter combo name"
          />
          <div className="invalid-feedback">{errors.comboName}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="comboSKU" className="form-label">Combo SKU</label>
          <input
            type="text"
            className="form-control"
            id="comboSKU"
            value={comboSKU}
            readOnly
          />
          <div className="form-text">Automatically generated from combo name.</div>
        </div>

        {/* Product Selection */}
        <div className="mb-3">
          <label className="form-label">Select Products *</label>
          {errors.products && <div className=" mb-1">{errors.products}</div>}
          <div className="list-group" style={{ maxHeight: "300px", overflowY: "auto" }}>
            {mockProducts.map(product => (
              <label
                key={product.id}
                className={`list-group-item d-flex justify-content-between align-items-center ${
                  selectedProducts.includes(product.id) ? "active" : ""
                }`}
                style={{ cursor: "pointer" }}
              >
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => toggleProductSelection(product.id)}
                />
                <div>
                  <strong>{product.name}</strong> (SKU: {product.sku}) - ${product.price.toFixed(2)} - Stock: {product.stock}
                </div>
                {selectedProducts.includes(product.id) && (
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={productQuantities[product.id]}
                    onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                    className="form-control form-control-sm w-25 ms-3"
                    title="Quantity"
                  />
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Discount Type and Price */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">Discount Type</label>
            <select
              className="form-select"
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
            >
              <option value="fixed">Fixed Price</option>
              <option value="percentage">Percentage Discount</option>
            </select>
          </div>

          {discountType === "fixed" && (
            <div className="col-md-4">
              <label htmlFor="comboPrice" className="form-label">Combo Price ($) *</label>
              <input
                type="number"
                className={`form-control ${errors.comboPrice ? "is-invalid" : ""}`}
                id="comboPrice"
                value={comboPrice}
                min="0"
                step="0.01"
                onChange={(e) => setComboPrice(e.target.value)}
                placeholder={`Suggested: $${suggestedPrice.toFixed(2)}`}
              />
              <div className="invalid-feedback">{errors.comboPrice}</div>
              <div className="form-text">Suggested price (sum of selected products): ${suggestedPrice.toFixed(2)}</div>
            </div>
          )}

          {discountType === "percentage" && (
            <div className="col-md-4">
              <label htmlFor="discountPercent" className="form-label">Discount % *</label>
              <input
                type="number"
                className={`form-control ${errors.discountPercent ? "is-invalid" : ""}`}
                id="discountPercent"
                value={discountPercent}
                min="0"
                max="100"
                step="1"
                onChange={(e) => setDiscountPercent(e.target.value)}
                placeholder="0 to 100"
              />
              <div className="invalid-feedback">{errors.discountPercent}</div>
              <div className="form-text">
                Combo price will be calculated as {100 - discountPercent}% of total product price.
              </div>
              <div className="mt-1"><strong>Combo Price: ${computedComboPrice.toFixed(2)}</strong></div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description / Details</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter combo description"
          />
        </div>

        {/* Validity */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="validFrom" className="form-label">Valid From</label>
            <input
              type="date"
              className={`form-control ${errors.validity ? "is-invalid" : ""}`}
              id="validFrom"
              value={validFrom}
              onChange={(e) => setValidFrom(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="validTo" className="form-label">Valid To</label>
            <input
              type="date"
              className={`form-control ${errors.validity ? "is-invalid" : ""}`}
              id="validTo"
              value={validTo}
              onChange={(e) => setValidTo(e.target.value)}
            />
            <div className="invalid-feedback">{errors.validity}</div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="mb-3">
          <label htmlFor="comboImage" className="form-label">Upload Combo Image</label>
          <input
            className="form-control"
            type="file"
            id="comboImage"
            accept="image/*"
            onChange={handleImageChange}
          />
          {comboImage && (
            <div className="mt-3">
              <img src={comboImage} alt="Combo" className="img-thumbnail" style={{ maxWidth: "200px" }} />
            </div>
          )}
        </div>

        {/* Additional Settings */}
        <div className="row mb-3">
          <div className="col-md-4 form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="isActive"
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
            />
            <label className="form-check-label" htmlFor="isActive">Active</label>
          </div>

          <div className="col-md-4">
            <label htmlFor="maxPurchaseLimit" className="form-label">Max Purchase Limit (per customer)</label>
            <input
              type="number"
              className="form-control"
              id="maxPurchaseLimit"
              value={maxPurchaseLimit}
              min="1"
              onChange={(e) => setMaxPurchaseLimit(e.target.value)}
              placeholder="No limit"
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="eligibility" className="form-label">Eligibility</label>
            <select
              className="form-select"
              id="eligibility"
              value={eligibility}
              onChange={(e) => setEligibility(e.target.value)}
            >
              <option value="all">All Customers</option>
              <option value="new_customers">New Customers Only</option>
              <option value="loyalty_members">Loyalty Members Only</option>
            </select>
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary">Save Combo / Offer</button>
        {submissionStatus && <div className="mt-3 alert alert-info">{submissionStatus}</div>}
      </form>
    </div>
  );
}
