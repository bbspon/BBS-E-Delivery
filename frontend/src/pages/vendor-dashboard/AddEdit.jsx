import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Col,
  Row,
  InputGroup,
  ToggleButton,
  Alert
} from "react-bootstrap";

export default function AddEditProductPage({ productId = null }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    sku: "",
    price: "",
    discountPrice: "",
    stock: "",
    unit: "pcs",
    tags: "",
    productType: "general",
    featured: false,
    isActive: true
  });

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productId) {
      // Fetch product for editing
      setLoading(true);
      fetch(`/api/vendor/products/${productId}`)
        .then(res => res.json())
        .then(data => {
          setFormData({ ...data });
          setLoading(false);
        });
    }
  }, [productId]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    const method = productId ? "PUT" : "POST";
    const url = productId
      ? `/api/vendor/products/${productId}`
      : "/api/vendor/products";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        setMessage({ type: "success", text: "Product saved successfully." });
        setLoading(false);
      })
      .catch(() => {
        setMessage({ type: "danger", text: "Failed to save product." });
        setLoading(false);
      });
  };

  return (
    <div className="container border p-5 border rounded" style={{ maxWidth: "800px" , backgroundColor: "lightgreen" }}>
      <h2 className="mb-4">
        {productId ? "Edit Product" : "Add New Product"}
      </h2>

      {message && <Alert variant={message.type}>{message.text}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="food">Food</option>
                <option value="grocery">Grocery</option>
                <option value="ecommerce">E-Commerce</option>
                <option value="water">Water</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Discount Price</Form.Label>
              <Form.Control
                type="number"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>SKU</Form.Label>
              <Form.Control
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Unit</Form.Label>
              <Form.Select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
              >
                <option value="pcs">Pcs</option>
                <option value="kg">Kg</option>
                <option value="ltr">Litre</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Row>
          <Col md={4}>
            <Form.Check
              type="checkbox"
              label="Featured"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="mb-3"
            />
          </Col>
          <Col md={4}>
            <Form.Check
              type="checkbox"
              label="Active"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="mb-3"
            />
          </Col>
        </Row>

        <Button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? "Saving..." : productId ? "Update Product" : "Create Product"}
        </Button>
      </Form>
    </div>
  );
}
