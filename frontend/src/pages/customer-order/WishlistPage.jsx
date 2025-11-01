import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];
    setWishlistItems(savedWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updated);
    localStorage.setItem("wishlistItems", JSON.stringify(updated));
  };

  const moveToCart = (item) => {
    const currentCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCart = [...currentCart, { ...item, qty: 1 }];
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    removeFromWishlist(item.id);
    alert(`${item.name} moved to cart`);
  };

  return (
    <>
      <Header />
      <div
        style={{
          maxWidth: 900,
          margin: "30px auto",
          fontFamily: "Arial, sans-serif",
          height: "100vh",
        }}
      >
        <h2 style={{ borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
          My Wishlist
        </h2>

        {wishlistItems.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              marginTop: 40,
              fontSize: 16,
              color: "#777",
            }}
          >
            Your wishlist is empty.
          </div>
        ) : (
          <div style={{ marginTop: 20 }}>
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  gap: "16px",
                  padding: "16px 0",
                  borderBottom: "1px solid #eee",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className="d-flex flex-row align-items-center" style={{ gap: "380px" }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: 200,
                      height: 200,
                      objectFit: "cover",
                      borderRadius: 4,
                      border: "1px solid #ddd",
                    }}
                  />
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    <div style={{ fontSize: 14, color: "#999" }}>
                      ⭐ {item.rating} &nbsp; | &nbsp; {item.offer}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 600, marginTop: 10 }}>
                      ₹{item.price}
                    </div>
                    <div style={{ marginTop: 10 }}>
                      <button
                        style={{
                          fontSize: 12,
                          color: "#2874f0",
                          background: "none",
                          border: "none",
                          marginRight: 10,
                        }}
                        onClick={() => moveToCart(item)}
                      >
                        Move to Cart
                      </button>
                      <button
                        style={{
                          fontSize: 12,
                          color: "#d9534f",
                          background: "none",
                          border: "none",
                        }}
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default WishlistPage;
