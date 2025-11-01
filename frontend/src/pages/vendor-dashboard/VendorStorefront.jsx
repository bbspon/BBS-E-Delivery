import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaStar,
  FaHeart,
  FaShoppingCart,
  FaFilter,
  FaShareAlt,
} from "react-icons/fa";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

const VendorStorefront = () => {
  const { vendorSlug } = useParams();

  const [vendor, setVendor] = useState({});
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(true);

  useEffect(() => {
    const mockVendor = {
      name: "Golden Traders",
      banner: "/images/vendor-banner.jpg",
      logo: "/images/vendor-logo.png",
      verified: true,
      rating: 4.6,
      totalReviews: 128,
      description: "Premium quality goods from a trusted vendor since 2015.",
      categories: ["Groceries", "Beverages", "Health", "Personal Care"],
      socialLinks: {
        facebook: "#",
        instagram: "#",
        whatsapp: "#",
      },
    };
    setVendor(mockVendor);

    fetch("/data/vendorProducts.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((err) => console.error("Failed to load product data:", err));
  }, [vendorSlug]);

  useEffect(() => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      result = result.filter((p) => p.category === categoryFilter);
    }

    if (ratingFilter) {
      result = result.filter((p) => p.rating >= ratingFilter);
    }

    if (sortOption === "priceLowHigh") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighLow") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "ratingHighLow") {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(result);
  }, [searchTerm, categoryFilter, ratingFilter, sortOption, products]);

  return (
    <>
      <Header />

      {/* Vendor Banner */}
      <div
        className="vendor-banner position-relative"
        style={{
          backgroundImage: `url(${vendor.banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "250px",
         
        }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center ps-5">
          <img
            src={vendor.logo}
            alt="Vendor Logo"
            className="rounded-circle border border-light me-4"
            style={{ width: "200px", height: "200px" }}
          />
          <div className="text-white">
            <h2>
              {vendor.name}{" "}
              {vendor.verified && (
                <span className="badge bg-success ms-2">Verified</span>
              )}
            </h2>
            <div>
              <FaStar className="text-warning" /> {vendor.rating} (
              {vendor.totalReviews}+ reviews)
            </div>
            <p className="mt-2">{vendor.description}</p>
            <button className="btn btn-outline-light btn-sm me-2">
              Contact Vendor
            </button>
            <button className="btn btn-outline-light btn-sm">
              <FaShareAlt /> Share
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Product Layout */}
      <div className="border rounded  p-3 mt-5 m-4">
        <div className="row">
          {/* Left Filter Sidebar */}
          {filtersVisible && (
            <div className="col-md-3 mb-4">
              <div className="p-3 border rounded sticky-top" style={{ top: "80px" }}>
                <button
                  className="btn btn-sm btn-outline-primary w-100 mb-3"
                  onClick={() => setFiltersVisible(false)}
                >
                  Hide Filters
                </button>

                <h5><FaFilter className="me-2" />Filters</h5>

                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Search Products"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <h6>Category</h6>
                {vendor.categories?.map((cat, idx) => (
                  <div className="form-check" key={idx}>
                    <input
                      type="radio"
                      className="form-check-input"
                      name="category"
                      checked={categoryFilter === cat}
                      onChange={() => setCategoryFilter(cat)}
                    />
                    <label className="form-check-label">{cat}</label>
                  </div>
                ))}
                <div className="form-check mt-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="category"
                    checked={categoryFilter === ""}
                    onChange={() => setCategoryFilter("")}
                  />
                  <label className="form-check-label">All</label>
                </div>

                <h6 className="mt-3">Minimum Rating</h6>
                {[5, 4, 3].map((r) => (
                  <div className="form-check" key={r}>
                    <input
                      type="radio"
                      className="form-check-input"
                      name="rating"
                      checked={ratingFilter === r}
                      onChange={() => setRatingFilter(r)}
                    />
                    <label className="form-check-label">{r} Stars & above</label>
                  </div>
                ))}

                <h6 className="mt-3">Sort By</h6>
                <select
                  className="form-select"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="">Default</option>
                  <option value="priceLowHigh">Price: Low to High</option>
                  <option value="priceHighLow">Price: High to Low</option>
                  <option value="ratingHighLow">Rating: High to Low</option>
                </select>
              </div>
            </div>
          )}

          {/* Product Content Area */}
          <div className={filtersVisible ? "col-md-9" : "col-12"}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Products</h4>
              <div>
                {!filtersVisible && (
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => setFiltersVisible(true)}
                  >
                    Show Filters
                  </button>
                )}
                <span className="ms-3 text-muted">
                  {filteredProducts.length} items found
                </span>
              </div>
            </div>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
              {filteredProducts.map((product) => (
                <div className="col" key={product._id}>
                  <div className="card h-100 shadow-sm">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h6 className="card-title">{product.name}</h6>
                      <p className="text-muted mb-1">
                        ₹{product.price}{" "}
                        <span className="text-danger ms-2">
                          ({product.discount}% OFF)
                        </span>
                      </p>
                      <p className="mb-1">
                        <FaStar className="text-warning" /> {product.rating}
                      </p>
                      <div className="mt-auto d-flex justify-content-between">
                        <button className="btn btn-sm btn-outline-success">
                          <FaShoppingCart /> Add to Cart
                        </button>
                        <button className="btn btn-sm btn-outline-danger">
                          <FaHeart />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-12 text-center py-5">
                  <p>No products found for the selected filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default VendorStorefront;
