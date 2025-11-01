import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FaClock, FaChevronLeft, FaChevronRight } from "react-icons/fa";

function DealsOffersPage() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  const API_URL = "/api/deals";
  const mockDeals = [
    {
      id: 1,
      name: "Summer Flash Sale - Milk Pack",
      vendor: "Vendor A",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/020/899/515/small_2x/red-apple-isolated-on-white-png.png",
      price: 150,
      discount: 20,
      rating: 4.3,
      endTime: "2025-07-03T18:00:00Z",
    },
    {
      id: 2,
      name: "Flash Deal: Olive Oil Combo",
      vendor: "VendorX",
      image: "https://clipground.com/images/dove-logo-png-1.png",
      price: 200,
      discount: 40,
      rating: 4.5,
      endTime: "2025-07-02T23:59:59Z",
    },
    {
      id: 3,
      name: "Daily Deal: Mixed Dry Fruits",
      vendor: "VendorY",
      image:
        "https://tse3.mm.bing.net/th/id/OIP.ayqmbsi4z9j7cF2B6wAZLAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
      price: 150,
      discount: 20,
      rating: 4.0,
      endTime: "2025-07-02T20:00:00Z",
    },
    {
      id: 4,
      name: "Daily Deal: Mixed Dry Fruits",
      vendor: "VendorY",
      image:
        "https://tse3.mm.bing.net/th/id/OIP.ayqmbsi4z9j7cF2B6wAZLAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
      price: 150,
      discount: 20,
      rating: 4.0,
      endTime: "2025-07-02T20:00:00Z",
    },
        {
      id: 5,
      name: "Daily Deal: Mixed Dry Fruits",
      vendor: "VendorY",
      image:
        "https://tse3.mm.bing.net/th/id/OIP.ayqmbsi4z9j7cF2B6wAZLAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
      price: 150,
      discount: 20,
      rating: 4.0,
      endTime: "2025-07-02T20:00:00Z",
    },
  ];

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const arr = Array.isArray(data) ? data : data.deals || [];
        setDeals(arr.length ? arr : mockDeals);
        setLoading(false);
      })
      .catch(() => {
        setDeals(mockDeals);
        setLoading(false);
      });
  }, []);

  // Sort deals by soonest endTime first
  const sortedDeals = [...deals].sort(
    (a, b) => new Date(a.endTime) - new Date(b.endTime)
  );

  // Countdown renderer
  const renderCountdown = (endTime) => {
    const diff = new Date(endTime) - new Date();
    if (diff <= 0) return <span className="text-danger">Expired</span>;
    const hrs = Math.floor((diff / 3600000) % 24);
    const mins = Math.floor((diff / 60000) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    return (
      <span className="text-success">
        <FaClock className="me-1" />
        {hrs}h {mins}m {secs}s
      </span>
    );
  };

  const slide = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <>
    
      <div className="container fuild py-4 ">
        <h2 className="mb-4">Deals & Offers</h2>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : sortedDeals.length === 0 ? (
          <div className="alert alert-warning text-center">
            No deals available.
          </div>
        ) : (
          <div className="position-relative">
            {/* Prev/Next Buttons */}
            <button
              className="btn btn-dark position-absolute top-50 start-0 translate-middle-y"
              style={{ zIndex: 2 }}
              onClick={() => slide("left")}
            >
              <FaChevronLeft />
            </button>
            <button
              className="btn btn-dark position-absolute top-50 end-0 translate-middle-y"
              style={{ zIndex: 2 }}
              onClick={() => slide("right")}
            >
              <FaChevronRight />
            </button>

            {/* Slider Container */}
            <div
              ref={scrollRef}
              className="d-flex flex-nowrap"
              style={{
                gap: "1rem",
                overflow: "hidden",
                scrollBehavior: "smooth",
                paddingBottom: "1rem",
              }}
            >
              {sortedDeals.map((deal) => (
                <div
                  key={deal.id}
                  className="card flex-shrink-0 shadow-sm"
                 
                >
                  <img
                    src={deal.image}
                    className="card-img-top"
                    alt={deal.name}
                    style={{ height: "250px",width:"250px",boxSizing: "border-box" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{deal.name}</h5>
                    <p className="mb-1">
                      <strong>₹{deal.price}</strong>{" "}
                      <span className="text-success">
                        ({deal.discount}% OFF)
                      </span>
                    </p>
                    <p className="mb-2">{renderCountdown(deal.endTime)}</p>
                    <button className="btn btn-primary mt-auto">
                      Grab Deal
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    
    </>
  );
}

export default DealsOffersPage;
