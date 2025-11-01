import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaHome, FaEye, FaEyeSlash, FaSearch } from "react-icons/fa";
import { LuSettings2 } from "react-icons/lu";
import { CiStar } from "react-icons/ci";

function Products() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [meta, setMeta] = useState({ page: 1, totalPages: 2 });

  const categories = ["Fruits", "Beverages", "Snacks", "Vegetables"];

  const allProducts = [
    {
      id: 1,
      name: "Apple",
      image: "https://th.bing.com/th/id/OIP.F-2Gz7LEcPWQ5CSs6gQU0wAAAA?rs=1&pid=ImgDetMain",
      price: 100,
      discount: 10,
      rating: 4.2,
      category: "Fruits",
    },
    {
      id: 2,
      name: "Product B",
      image: "https://png.pngtree.com/png-clipart/20230917/original/pngtree-composition-with-grocery-products-in-shopping-basket-diet-picture-image_13051833.png",
      price: 150,
      discount: 20,
      rating: 4.8,
      category: "Beverages",
    },
    {
      id: 3,
      name: "Product C",
      image: "https://png.pngtree.com/png-clipart/20231017/original/pngtree-groceries-3d-illustration-png-image_13340374.png",
      price: 120,
      discount: 15,
      rating: 3.9,
      category: "Snacks",
    },
    {
      id: 4,
      name: "Product D",
      image: "https://th.bing.com/th/id/R.88c573a8975edee8f222ba6982e70c68?rik=dpk9TGvQU96izg&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f4%2fGrocery-Transparent-Free-PNG.png",
      price: 110,
      discount: 5,
      rating: 4.0,
      category: "Vegetables",
    },
    {
      id: 5,
      name: "Product E",
      image: "https://clipground.com/images/grocery-png-images-5.png",
      price: 180,
      discount: 25,
      rating: 4.6,
      category: "Snacks",
    },
    {
      id: 6,
      name: "Product F",
      image: "https://png.pngtree.com/png-vector/20240314/ourmid/pngtree-grocery-basket-and-a-list-of-products-png-image_11952487.png",
      price: 130,
      discount: 18,
      rating: 3.7,
      category: "Fruits",
    },
  ];

  const [products, setProducts] = useState(allProducts);

  useEffect(() => {
    let filtered = [...allProducts];

    if (searchTerm.trim()) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedRatings.length > 0) {
      filtered = filtered.filter(p =>
        selectedRatings.includes(Math.floor(p.rating))
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    setProducts(filtered);
  }, [searchTerm, selectedRatings, selectedCategory]);

  const toggleRating = (rate) => {
    setSelectedRatings(prev =>
      prev.includes(rate)
        ? prev.filter(r => r !== rate)
        : [...prev, rate]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedRatings([]);
    setSelectedCategory("");
  };

  const handleSort = (criteria) => {
    let sorted = [...products];
    if (criteria === "lowToHigh") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (criteria === "highToLow") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (criteria === "discount") {
      sorted.sort((a, b) => b.discount - a.discount);
    } else if (criteria === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    setProducts(sorted);
    setShowSortDropdown(false);
  };

  return (
    <>
      <Header />
      <div className="container mt-3">
        <div className="d-flex align-items-center mb-3" style={{ fontSize: "15px", color: "black" }}>
          <FaHome className="me-2" /> Home / Products
        </div>
        <h2 className="mb-4">Products</h2>

        <div className="input-group mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="input-group-text bg-dark text-white">
            <FaSearch />
          </span>
        </div>

        <div className="d-flex align-items-center gap-2 justify-content-between mb-4">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="btn btn-outline-secondary d-flex align-items-center gap-2"
          >
            {showFilter ? <FaEyeSlash /> : <FaEye />} {showFilter ? "Hide Filters" : "Show Filters"}
          </button>

          <button onClick={clearFilters} className="btn btn-warning">
            Clear Filters
          </button>

          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="btn btn-outline-dark d-flex align-items-center gap-2"
            >
              Relevance <LuSettings2 />
            </button>

            {showSortDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "45px",
                  right: "-35px",
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  zIndex: 99,
                  width: "200px",
                  padding: "20px",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: "14px",
                }}
              >
                <p onClick={() => handleSort("lowToHigh")}>Price — Low to High</p>
                <p onClick={() => handleSort("highToLow")}>Price — High to Low</p>
                <p onClick={() => handleSort("discount")}>Discount</p>
                <p onClick={() => handleSort("rating")}>Customer Ratings</p>
              </div>
            )}
          </div>
        </div>

        <div className="row">
          {showFilter && (
            <div className="col-md-3 mb-4">
              <div className="p-3 border rounded bg-light">
                <h5>Ratings</h5>
                {[5, 4, 3, 2].map((rate) => (
                  <label key={rate} className="d-flex align-items-center mb-2">
                    <input
                      type="checkbox"
                      className="me-2"
                      checked={selectedRatings.includes(rate)}
                      onChange={() => toggleRating(rate)}
                    />
                    {[...Array(rate)].map((_, i) => (
                      <CiStar key={i} className="text-warning me-1" />
                    ))}
                  </label>
                ))}

                <h5 className="mt-4">Category</h5>
                {categories.map((cat) => (
                  <div key={cat} className="form-check">
                    <input
                      type="radio"
                      name="category"
                      className="form-check-input"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                    />
                    <label className="form-check-label">{cat}</label>
                  </div>
                ))}
                <div className="form-check mt-2">
                  <input
                    type="radio"
                    name="category"
                    className="form-check-input"
                    checked={selectedCategory === ""}
                    onChange={() => setSelectedCategory("")}
                  />
                  <label className="form-check-label">All</label>
                </div>
              </div>
            </div>
          )}

          <div className={showFilter ? "col-md-9" : "col-md-12"}>
            <div className="row justify-content-start m-3">
              {products.length > 0 ? (
                products.map((product) => (
                  <div
                    className="col-md-4 mb-4"
                    key={product.id}
                    onClick={() => navigate(`/productDetail/${product.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card h-100 shadow">
                      <img
                        src={product.image || "https://via.placeholder.com/250x250?text=No+Image"}
                        className="card-img-top"
                        style={{ height: "250px", objectFit: "contain", padding: "30px" }}
                        alt={product.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title text-center">{product.name}</h5>
                        <div className="d-flex justify-content-between px-2 small text-muted">
                          <span>₹{product.price}</span>
                          <span>{product.discount}% off</span>
                          <span>⭐ {product.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-5">No products match your filters.</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Products;
