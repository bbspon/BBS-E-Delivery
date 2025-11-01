import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FaHome, FaTrash, FaCartPlus } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import axios from "axios";

function ProductComparisonPage() {
  const [products, setProducts] = useState([]);
  const [highlightDiff, setHighlightDiff] = useState(false);

  // ✅ Simulate fetch or connect this to real API later
  useEffect(() => {
    const fetchComparisonProducts = async () => {
      // Example: Fetch from localStorage or future API
      const localData = localStorage.getItem("comparisonItems");
      if (localData) {
        setProducts(JSON.parse(localData));
      } else {
        // Replace with API call if needed
        setProducts([
          {
            id: 1,
            name: "Product A",
            image: "https://th.bing.com/th/id/OIP.uzLYivrItoROs3fmFmRoHgHaHa?pid=ImgDetMain",
            price: 120,
            discount: 10,
            rating: 4.2,
            availability: "In Stock",
            specs: {
              Weight: "1.5kg",
              Brand: "BrandX",
              Warranty: "1 Year",
              "Battery Life": "10 hrs",
            },
          },
          {
            id: 2,
            name: "Product B",
            image: "https://pluspng.com/img-png/png-oil-olive-oil-free-png-image-1972.png",
            price: 99,
            discount: 15,
            rating: 3.7,
            availability: "Limited Stock",
            specs: {
              Weight: "1.2kg",
              Brand: "BrandY",
              Warranty: "6 Months",
              "Battery Life": "8 hrs",
            },
          },
        ]);
      }
    };
    fetchComparisonProducts();
  }, []);

  const allSpecKeys = Array.from(new Set(products.flatMap((p) => Object.keys(p.specs))));

  const removeProduct = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("comparisonItems", JSON.stringify(updated));
  };

  const addToCart = async (id) => {
    alert(`Product ${id} added to cart`);
    // Later replace with: await axios.post("/api/cart", { productId: id });
  };

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <CiStar
        key={i}
        className={i < Math.round(rating) ? "text-warning" : "text-muted"}
        style={{ fontSize: "18px", marginRight: "2px" }}
      />
    ));

  const isDiff = (key) => {
    const values = products.map((p) => p.specs[key]);
    return new Set(values).size > 1;
  };

  return (
    <>
      <Header />
      <div className="container mt-4">
        <div className="d-flex align-items-center mb-3 text-muted">
          <FaHome className="me-2" /> Home / Compare
        </div>

        <h2 className="mb-4">Product Comparison</h2>

        {products.length === 0 ? (
          <div className="alert alert-info text-center">
            No products selected for comparison.
          </div>
        ) : (
          <div className="table-responsive border rounded shadow-sm p-3 bg-white">
            <table className="table text-center align-middle">
              <thead>
                <tr>
                  <th></th>
                  {products.map((p) => (
                    <th key={p.id}>
                      <div>
                        <img
                          src={p.image}
                          alt={p.name}
                          className="img-fluid mb-2"
                          style={{ maxHeight: "150px" }}
                        />
                        <h5>{p.name}</h5>
                        <p className="text-muted mb-1">
                          ₹{p.price}{" "}
                          <span className="text-success">
                            ({p.discount}% OFF)
                          </span>
                        </p>
                        <div className="d-flex justify-content-center mb-1">
                          {renderStars(p.rating)}
                        </div>
                        <p className="text-success">{p.availability}</p>
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => addToCart(p.id)}
                          >
                            <FaCartPlus /> Add to Cart
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => removeProduct(p.id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allSpecKeys.map((key) => (
                  <tr key={key} className={highlightDiff && isDiff(key) ? "table-warning" : ""}>
                    <th>{key}</th>
                    {products.map((p) => (
                      <td key={p.id + key}>{p.specs[key] || "—"}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {products.length > 0 && (
          <div className="form-check form-switch mt-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="highlightDiff"
              checked={highlightDiff}
              onChange={() => setHighlightDiff(!highlightDiff)}
            />
            <label className="form-check-label" htmlFor="highlightDiff">
              Highlight Differences
            </label>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ProductComparisonPage;
