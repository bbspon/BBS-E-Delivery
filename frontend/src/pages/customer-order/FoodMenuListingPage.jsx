// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Header from '../../components/Header';
// import Footer from '../../components/Footer';
// import { FaHome, FaEye, FaEyeSlash } from "react-icons/fa";
// import { LuSettings2 } from "react-icons/lu";
// import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
// import { CiStar } from "react-icons/ci";

// function FoodMenuListingPage() {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [showCategoryOptions, setShowCategoryOptions] = useState(false);
//   const [showFilter, setShowFilter] = useState(false);
//   const [showSortDropdown, setShowSortDropdown] = useState(false);

//   const [meta, setMeta] = useState({ page: 1, totalPages: 2 });
 
//   const [selectedRatings, setSelectedRatings] = useState([]);

//   const toggleRating = (rate) => {
//     setSelectedRatings((prevRatings) =>
//       prevRatings.includes(rate)
//         ? prevRatings.filter((r) => r !== rate)
//         : [...prevRatings, rate]
//     );
//   };

//   const prevPage = () => {
//     if (meta.page > 1) {
//       setMeta({ ...meta, page: meta.page - 1 });
//     }
//   };

//   const nextPage = () => {
//     if (meta.page < meta.totalPages) {
//       setMeta({ ...meta, page: meta.page + 1 });
//     }
//   };

//   const [products, setProducts] = useState([
//     {
//       id: 1,
//       image: "",
//       name: "Apple",
//       price: 100,
//       discount: 10,
//       rating: 4.2,
//     },
//     {
//       id: 2,
//       image: "",
//       name: "Product B",
//       price: 150,
//       discount: 20,
//       rating: 4.8,
//     },
//     {
//       id: 3,
//       image: "",
//       name: "Product C",
//       price: 120,
//       discount: 15,
//       rating: 3.9,
//     },
//     {
//       id: 4,
//       image: "",
//       name: "Product D",
//       price: 110,
//       discount: 5,
//       rating: 4.0,
//     },
//     {
//       id: 5,
//       image: "",
//       name: "Product E",
//       price: 180,
//       discount: 25,
//       rating: 4.6,
//     },
//     {
//       id: 6,
//       image: "",
//       name: "Product F",
//       price: 130,
//       discount: 18,
//       rating: 3.7,
//     },
//       {
//       id: 7,
//       image: "",
//       name: "Product F",
//       price: 130,
//       discount: 18,
//       rating: 3.7,
//     },
//       {
//       id: 8,
//       image: "",
//       name: "Product F",
//       price: 130,
//       discount: 18,
//       rating: 3.7,
//     },
//   ]);

//   const handleSort = (criteria) => {
//     let sorted = [...products];
//     if (criteria === "lowToHigh") {
//       sorted.sort((a, b) => a.price - b.price);
//     } else if (criteria === "highToLow") {
//       sorted.sort((a, b) => b.price - a.price);
//     } else if (criteria === "discount") {
//       sorted.sort((a, b) => b.discount - a.discount);
//     } else if (criteria === "rating") {
//       sorted.sort((a, b) => b.rating - a.rating);
//     }
//     setProducts(sorted);
//     setShowSortDropdown(false);
//   };

//   return (
//     <>
//       <Header />
//       <div className="container mt-3">
//         <div className="d-flex align-items-center mb-3" style={{ fontSize: "15px", color: "black" }}>
//           <FaHome className="me-2" /> Home / Products
//         </div>
//         <h2 className="mb-4">Products</h2>

//         <div className="d-flex align-items-center gap-2 justify-content-between mb-4">
//           <button
//             onClick={() => setShowFilter(!showFilter)}
//             style={{
//               padding: "8px 16px",
//               fontWeight: "bold",
//               backgroundColor: "rgba(34, 29, 29, 0.54)",
//               borderRadius: "8px",
//               border: "none",
//               cursor: "pointer",
//               display: "flex",
//               alignItems: "center",
//               gap: "8px",
//               color: "black",
//             }}
//           >
//             {showFilter ? <><FaEyeSlash /> Hide Filters</> : <><FaEye /> Show Filters</>}
//           </button>

//           <div style={{ position: "relative" }}>
//             <button
//               onClick={() => setShowSortDropdown(!showSortDropdown)}
//               style={{
//                 padding: "8px 16px",
//                 fontWeight: "bold",
//                 backgroundColor: "rgba(34, 29, 29, 0.54)",
//                 borderRadius: "6px",
//                 border: "1px solid #ccc",
//                 cursor: "pointer",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//                 color: "black",
//               }}
//             >
//               Relevance <LuSettings2 />
//             </button>

//             {showSortDropdown && (
//               <div
//                 style={{
//                   position: "absolute",
//                   top: "45px",
//                   right: "-35px",
//                   backgroundColor: "rgba(224, 215, 215, 0.95)",
//                   border: "1px solid #ccc",
//                   borderRadius: "10px",
//                   boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
//                   zIndex: 99,
//                   width: "200px",
//                   padding: "20px 35px",
//                   textAlign: "left",
//                   fontSize: "14px",
//                 }}
//               >
//                 <p onClick={() => handleSort("relevance")} className="sort-option">Relevance</p>
//                 <p onClick={() => handleSort("lowToHigh")} className="sort-option">Price — Low to High</p>
//                 <p onClick={() => handleSort("highToLow")} className="sort-option">Price — High to Low</p>
//                 <p onClick={() => handleSort("discount")} className="sort-option">Discount</p>
//                 <p onClick={() => handleSort("rating")} className="sort-option">Customer Ratings</p>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="row">
//           {showFilter && (
//             <div className="col-md-3 mb-4">
//               <div style={{ border: "2px solid #ccc", padding: "15px", borderRadius: "10px", backgroundColor: "#f9f9f9" }}>
//                 <div className="mb-3 d-flex flex-column gap-2" style={{
//                   fontSize: "15px", color: "black", border: "2px solid #ccc", padding: "25px",
//                   borderRadius: "10px", backgroundColor: "rgba(161, 240, 13, 0.27)",
//                   boxShadow: "0 4px 6px rgba(153, 114, 114, 0.1)"
//                 }}>
//                   <h5 className="mb-3">Grocery Items & More</h5>
//                   {["Atta", "Rice", "Sooji"].map((item, idx) => (
//                     <div className="d-flex align-items-center mb-2" key={idx}>
//                       <label className="d-flex align-items-center m-0">
//                         <input type="checkbox" className="me-2" />{item}
//                       </label>
//                     </div>
//                   ))}
//                 </div>

//                 <h5 className="mb-3 mx-2">Refined by</h5>
//                 <h5
//                   onClick={() => setShowCategoryOptions(!showCategoryOptions)}
//                   className="mb-3"
//                   style={{
//                     color: "black", backgroundColor: "rgba(76, 77, 151, 0.27)", border: "2px solid #ccc",
//                     padding: "25px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(153, 114, 114, 0.1)",
//                     cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center"
//                   }}
//                 >
//                   Product Rate {showCategoryOptions ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
//                 </h5>
//                 {showCategoryOptions && (
//                   <div className="mt-3 mx-2">
//                     {[5, 4, 3, 2].map((rate) => (
//                       <label key={rate} className="d-flex align-items-center mb-3 cursor-pointer px-4">
//                         <input
//                           type="checkbox"
//                           className="me-2"
//                           checked={selectedRatings.includes(rate)}
//                           onChange={() => toggleRating(rate)}
//                         />
//                         <div className="d-flex">
//                           {[...Array(rate)].map((_, i) => (
//                             <CiStar key={`filled-${i}`} className="text-success me-1" />
//                           ))}
//                           {[...Array(5 - rate)].map((_, i) => (
//                             <CiStar key={`empty-${i}`} className="text-muted me-1" />
//                           ))}
//                         </div>
//                       </label>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           <div className={showFilter ? "col-md-9" : "col-md-12"}>
//             <div className="row justify-content-start m-5">
//               {products.map((product) => (
//                 <div
//                   className="col-md-4 mb-4"
//                   key={product.id}
//                   onClick={() => navigate(`/foodItemDetail/${product.id}`)}
//                   style={{ cursor: "pointer" }}
//                 >
//                   <div className="card h-100 shadow">
//                     <img
//                       src={product.image}
//                       className="card-img-top"
//                       style={{ height: "250px", objectFit: "contain", padding: "30px" }}
//                       alt={product.name}
//                     />
//                     <div className="card-body">
//                       <h5 className="card-title text-center">{product.name}</h5>
//                       <div className="d-flex justify-content-between px-2" style={{ fontFamily: "sans-serif", textShadow: "1px 1px 2px #ccc" }}>
//                         <p>Discount: {product.discount}%</p>
//                         <p>Rating: {product.rating}</p>
//                         <p>₹{product.price}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="d-flex justify-content-between align-items-center mt-4">
//               <button onClick={prevPage} className="px-4 py-2 bg-gray-300 rounded-4" disabled={meta.page === 1}>Prev</button>
//               <span>Page {meta.page} / {meta.totalPages}</span>
//               <button onClick={nextPage} className="px-4 py-2 bg-gray-300 rounded" disabled={meta.page === meta.totalPages}>Next</button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default FoodMenuListingPage;


import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { FaHome, FaEye, FaEyeSlash, FaSearch } from "react-icons/fa";
import { LuSettings2 } from "react-icons/lu";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { CiStar } from "react-icons/ci";

function FoodMenuListingPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedRatings, setSelectedRatings] = useState([]);

  const [meta, setMeta] = useState({ page: 1, totalPages: 2 });

  const allProducts = [
    {
      id: 1,
      image: "",
      name: "Apple",
      price: 100,
      discount: 10,
      rating: 4.2,
      category: "Fruits",
      inStock: true,
    },
    {
      id: 2,
      image: "",
      name: "Product B",
      price: 150,
      discount: 20,
      rating: 4.8,
      category: "Vegetables",
      inStock: false,
    },
    {
      id: 3,
      image: "",
      name: "Product C",
      price: 120,
      discount: 15,
      rating: 3.9,
      category: "Fruits",
      inStock: true,
    },
    // ...add more for realistic testing
  ];

  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  // 🔄 Filter logic on state change
  useEffect(() => {
    let filtered = [...allProducts];

    if (searchTerm.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedRatings.length > 0) {
      filtered = filtered.filter((p) =>
        selectedRatings.some((rate) => Math.floor(p.rating) === rate)
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedRatings]);

  const toggleRating = (rate) => {
    setSelectedRatings((prevRatings) =>
      prevRatings.includes(rate)
        ? prevRatings.filter((r) => r !== rate)
        : [...prevRatings, rate]
    );
  };

  const handleSort = (criteria) => {
    let sorted = [...filteredProducts];
    if (criteria === "lowToHigh") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (criteria === "highToLow") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (criteria === "discount") {
      sorted.sort((a, b) => b.discount - a.discount);
    } else if (criteria === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    setFilteredProducts(sorted);
    setShowSortDropdown(false);
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

  return (
    <>
      <Header />
      <div className="container mt-3">
        {/* Breadcrumb */}
        <div className="d-flex align-items-center mb-3" style={{ fontSize: "15px", color: "black" }}>
          <FaHome className="me-2" /> Home / Products
        </div>

        {/* 🔍 Search Bar */}
        <div className="mb-4 d-flex gap-3">
          <input
            type="text"
            className="form-control shadow-sm"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-dark d-flex align-items-center">
            <FaSearch className="me-2" /> Search
          </button>
        </div>

        {/* Header & Actions */}
        <div className="d-flex align-items-center gap-2 justify-content-between mb-4">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="btn btn-outline-secondary d-flex align-items-center gap-2"
          >
            {showFilter ? <FaEyeSlash /> : <FaEye />}
            {showFilter ? "Hide Filters" : "Show Filters"}
          </button>

          {/* Sort Dropdown */}
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
                  padding: "15px",
                  cursor: "pointer",
                }}
              >
                <p onClick={() => handleSort("relevance")} className="sort-option">Relevance</p>
                <p onClick={() => handleSort("lowToHigh")} className="sort-option">Price — Low to High</p>
                <p onClick={() => handleSort("highToLow")} className="sort-option">Price — High to Low</p>
                <p onClick={() => handleSort("discount")} className="sort-option">Discount</p>
                <p onClick={() => handleSort("rating")} className="sort-option">Customer Ratings</p>
              </div>
            )}
          </div>
        </div>

        {/* Page Layout */}
        <div className="row">
          {/* 🧊 Sidebar Filters */}
          {showFilter && (
            <div className="col-md-3 mb-4">
              <div className="p-3 border rounded bg-light">
                <h5>Ratings</h5>
                {[5, 4, 3, 2].map((rate) => (
                  <label key={rate} className="d-flex align-items-center mb-3">
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
              </div>
            </div>
          )}

          {/* 📦 Product Results */}
          <div className={showFilter ? "col-md-9" : "col-md-12"}>
            <div className="row justify-content-start">
              {filteredProducts.map((product) => (
                <div
                  className="col-md-4 mb-4"
                  key={product.id}
                  onClick={() => navigate(`/foodItemDetail/${product.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card h-100 shadow">
                    <img
                      src={product.image || "https://via.placeholder.com/200"}
                      className="card-img-top"
                      style={{ height: "250px", objectFit: "contain", padding: "30px" }}
                      alt={product.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title text-center">{product.name}</h5>
                      <div className="d-flex justify-content-between px-2 small text-muted">
                        <span>₹{product.price}</span>
                        <span>Discount: {product.discount}%</span>
                        <span>⭐ {product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center mt-4">
              <button onClick={prevPage} className="btn btn-outline-secondary" disabled={meta.page === 1}>Prev</button>
              <span>Page {meta.page} / {meta.totalPages}</span>
              <button onClick={nextPage} className="btn btn-outline-secondary" disabled={meta.page === meta.totalPages}>Next</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FoodMenuListingPage;
