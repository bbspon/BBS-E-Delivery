import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FaHome, FaEye, FaEyeSlash } from "react-icons/fa";
import { LuSettings2 } from "react-icons/lu";
import { CiStar } from "react-icons/ci";

function ComboOffersPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [showFilter, setShowFilter] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 2 });

  const toggleRating = (rate) => {
    setSelectedRatings((prevRatings) =>
      prevRatings.includes(rate)
        ? prevRatings.filter((r) => r !== rate)
        : [...prevRatings, rate]
    );
  };

  const prevPage = () => {
    if (meta.page > 1) {
      setMeta({ ...meta, page: meta.page - 1 });
    }
  };

  const nextPage = () => {
    if (meta.page < meta.totalPages) {
      setMeta({ ...meta, page: meta.page + 1 });
    }
  };

  const [products, setProducts] = useState([
    {
      id: 1,
      image: "https://pngimg.com/d/basket_PNG13.png",
      name: "Apple Combo Pack",
      price: 100,
      discount: 10,
      rating: 4.2,
    },
    {
      id: 2,
      image: "https://pngimg.com/d/basket_PNG15.png",
      name: "Breakfast Combo",
      price: 150,
      discount: 20,
      rating: 4.8,
    },
    {
      id: 3,
      image: "https://pngimg.com/d/basket_PNG23.png",
      name: "Grocery Mega Pack",
      price: 120,
      discount: 15,
      rating: 3.9,
    },
    {
      id: 4,
      image: "https://pngimg.com/d/basket_PNG17.png",
      name: "Dry Fruits Combo",
      price: 110,
      discount: 5,
      rating: 2.0,
    },
  ]);

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

  // Filtered product list
  const filteredProducts = products.filter((product) => {
    const matchName = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRating =
      selectedRatings.length === 0 ||
      selectedRatings.some((r) => Math.floor(product.rating) === r);
    return matchName && matchRating;
  });

  return (
    <>
      <Header />
      <div className="container mt-3">
        <div className="d-flex align-items-center mb-3" style={{ fontSize: "15px", color: "black" }}>
          <FaHome className="me-2" /> Home / Combo Offers
        </div>
        <h2 className="mb-4">Combo Offers</h2>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Search combo offers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="d-flex align-items-center gap-2 justify-content-between mb-4">
          <button
            onClick={() => setShowFilter(!showFilter)}
            style={{
              padding: "8px 16px",
              fontWeight: "bold",
              backgroundColor: "rgba(34, 29, 29, 0.54)",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "black",
            }}
          >
            {showFilter ? <><FaEyeSlash /> Hide Filters</> : <><FaEye /> Show Filters</>}
          </button>

          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              style={{
                padding: "8px 16px",
                fontWeight: "bold",
                backgroundColor: "rgba(34, 29, 29, 0.54)",
                borderRadius: "6px",
                border: "1px solid #ccc",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "black",
              }}
            >
              Relevance <LuSettings2 />
            </button>

            {showSortDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "45px",
                  right: "-35px",
                  backgroundColor: "rgba(224, 215, 215, 0.95)",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  zIndex: 99,
                  width: "200px",
                  padding: "20px 35px",
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
    <h5 className="mb-3">Filter by Rating</h5>
    {[5, 4, 3, 2,1].map((rate) => (
      <label className="d-flex align-items-center mb-2" key={rate}>
        <input
          type="checkbox"
          className="me-2"
          checked={selectedRatings.includes(rate)}
          onChange={() => toggleRating(rate)}
        />
        <div className="d-flex">
          {[...Array(5)].map((_, i) => (
            <CiStar
              key={i}
              className={i < rate ? "text-warning" : "text-muted"}
              style={{ fontSize: "18px", marginRight: "2px" }}
            />
          ))}
          <span className="ms-2">({rate})</span>
        </div>
      </label>
    ))}
  </div>
</div>

          )}

          <div className={showFilter ? "col-md-9" : "col-md-12"}>
            <div className="row">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    className="col-md-4 mb-4"
                    key={product.id}
                    onClick={() => navigate(`/comboDetail/${product.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card h-100 shadow">
                      <img
                        src={product.image}
                        className="card-img-top"
                        style={{ height: "250px", objectFit: "contain", padding: "30px" }}
                        alt={product.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title text-center">{product.name}</h5>
                        <div className="d-flex justify-content-between px-2">
                          <p>Discount: {product.discount}%</p>
                          <p>₹{product.price}</p>
                        </div>
                        <div className="d-flex justify-content-center mt-2">
                          {[...Array(5)].map((_, index) => (
                            <CiStar
                              key={index}
                              className={index < Math.round(product.rating) ? "text-warning" : "text-muted"}
                              style={{ fontSize: "18px", marginRight: "2px" }}
                            />
                          ))}
                          <span className="ms-2">({product.rating})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center text-muted py-5">
                  No products match your filter.
                </div>
              )}
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <button
                onClick={prevPage}
                className="px-4 py-2 bg-gray-300 rounded-4"
                disabled={meta.page === 1}
              >
                Prev
              </button>
              <span>Page {meta.page} / {meta.totalPages}</span>
              <button
                onClick={nextPage}
                className="px-4 py-2 bg-gray-300 rounded"
                disabled={meta.page === meta.totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ComboOffersPage;
