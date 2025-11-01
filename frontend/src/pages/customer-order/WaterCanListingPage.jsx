import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FaHome } from "react-icons/fa";

function WaterCanListingPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);
  const [meta, setMeta] = useState({ page: 1, totalPages: 2 });

  const prevPage = () => {
    if (meta.page > 1) setMeta({ ...meta, page: meta.page - 1 });
  };

  const nextPage = () => {
    if (meta.page < meta.totalPages) setMeta({ ...meta, page: meta.page + 1 });
  };

  const [products] = useState([
    {
      id: 1,
      image: "https://th.bing.com/th/id/R.2b1e46b637de7f4e8892ec8764313b53?rik=fqcr0RiFgzsK5w&riu=http%3a%2f%2fwww.freepngimg.com%2fdownload%2fwater_bottle%2f3-2-water-bottle-png-picture.png&ehk=2dgGCJ65fyro1Z%2f%2f2uUWoiWgRepic6fW8JGXFbaw7VA%3d&risl=&pid=ImgRaw&r=0",
      name: "One and Two Litre Water Bottle",
      price: 100,
      discount: 10,
      rating: 4.2,
    },
    {
      id: 2,
      image: "https://pngimg.com/d/water_bottle_PNG98935.png",
      name: "Five Litre Water Bottle",
      price: 150,
      discount: 20,
      rating: 4.8,
    },
    {
      id: 3,
      image: "https://subpng.com/images/hd/filtered-water-bottle-png-06212024-9oiuxfu5oof27f7g.jpg",
      name: "Ten Litre Water Bottle",
      price: 120,
      discount: 15,
      rating: 3.9,
    },
    {
      id: 4,
      image: "https://th.bing.com/th/id/OIP.4dPLaMPBjCBzRvwp0q_cWAHaLk?rs=1&pid=ImgDetMain",
      name: "Twenty Litre Water Bottle",
      price: 110,
      discount: 5,
      rating: 4.0,
    },
  ]);

  // 🔍 Filter Logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice =
      (!minPrice || product.price >= parseFloat(minPrice)) &&
      (!maxPrice || product.price <= parseFloat(maxPrice));
    const matchesRating = !selectedRating || product.rating >= selectedRating;
    return matchesSearch && matchesPrice && matchesRating;
  });

  return (
    <>
      <Header />
      <div className="container mt-3">
        <div className="d-flex align-items-center mb-3" style={{ fontSize: "15px", color: "black" }}>
          <FaHome className="me-2" /> Home / Water Cans
        </div>
        <h2 className="mb-4">Water Cans</h2>

        {/* 🔍 Search + Filters */}
        <div className="row mb-4 d-flex justify-content-between" >
          <div className="col-md-3 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="col-md-2 mb-2">
            <input
              type="number"
              className="form-control"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div className="col-md-2 mb-2">
            <input
              type="number"
              className="form-control"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
          <div className="col-md-3 mb-2">
            <select
              className="form-select"
              value={selectedRating || ""}
              onChange={(e) => setSelectedRating(e.target.value ? parseFloat(e.target.value) : null)}
            >
              <option value="">Filter by Rating</option>
              <option value="4">4 stars & up</option>
              <option value="3">3 stars & up</option>
              <option value="2">2 stars & up</option>
            </select>
          </div>
        </div>

        {/* 🛍️ Products Grid */}
        <div className="row">
          {filteredProducts.map((item) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              key={item.id}
              onClick={() => navigate(`/water-can-subscription/${item.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="card bg-gray-100 shadow rounded">
                <img
                  src={item.image}
                  className="card-img-top"
                  style={{ height: "250px", objectFit: "contain", padding: "30px" }}
                  alt={item.name}
                />
                <div className="card-body">
                  <h5 className="card-title text-center mb-2" style={{ fontSize: "17px" }}>{item.name}</h5>
                  <div className="d-flex justify-content-between px-2" style={{ fontSize: "15px" }}>
                    <p>Discount: {item.discount}%</p>
                    <p>Rating: {item.rating}</p>
                    <p>₹{item.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ⏩ Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-4">
          <button onClick={prevPage} className="px-4 py-2 bg-secondary text-white rounded-4" disabled={meta.page === 1}>Prev</button>
          <span>Page {meta.page} / {meta.totalPages}</span>
          <button onClick={nextPage} className="px-4 py-2 bg-secondary text-white rounded" disabled={meta.page === meta.totalPages}>Next</button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default WaterCanListingPage;
// This code defines a WaterCanListingPage component that displays a list of water cans with search and filter functionality.
// It includes a header, a search bar, filters for price and rating, and a grid of products.
// The products are displayed in a responsive grid layout, and pagination controls allow navigation through multiple pages of products.
// The component uses React hooks for state management and navigation, and it includes a footer at the bottom.
// The products are hardcoded for demonstration purposes, but in a real application, they would likely be fetched from an API.
// The component is styled using Bootstrap classes for a clean and modern look.   