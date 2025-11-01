import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showInstructions, setShowInstructions] = useState(false);
  const [instructions, setInstructions] = useState("");
  const [selectedModule, setSelectedModule] = useState("Grocery");

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [
      {
        id: 1,
        name: "Grocery Bundle Pack",
        price: 499,
        image:
          "https://th.bing.com/th/id/OIP.nERMm-CaVapjyffMS-wb_gAAAA?rs=1&pid=ImgDetMain",
        rating: 4.5,
        offer: "10% Off",
        deliveryDate: "Tomorrow",
        qty: 1,
      },
      {
        id: 2,
        name: "Vegetable Combo",
        price: 299,
        image:
          "https://static.vecteezy.com/system/resources/previews/047/830/714/non_2x/a-vibrant-assortment-of-fresh-vegetables-including-peppers-onions-lettuce-broccoli-tomatoes-corn-and-garlic-arranged-on-a-white-background-png.png",
        rating: 4.2,
        offer: "Save ₹50",
        deliveryDate: "Today",
        qty: 1,
      },
      {
        id: 3,
        name: "Cooking Oil 5L",
        price: 849,
        image:
          "https://5.imimg.com/data5/SELLER/Default/2022/11/WK/LV/YW/141315510/fortune-refined-soyabean-oil-5ltr-500x500.jpeg",
        rating: 4.7,
        offer: "5% Off",
        deliveryDate: "Tomorrow",
        qty: 1,
      },
    ];
    setCartItems(savedCart);
    localStorage.setItem("cartItems", JSON.stringify(savedCart)); // initialize localStorage if empty

    const savedInstructions = localStorage.getItem("deliveryInstructions") || "";
    setInstructions(savedInstructions);
  }, []);

  const toggleInstructions = () => setShowInstructions(!showInstructions);

  const handleInstructionsChange = (e) => {
    setInstructions(e.target.value);
    localStorage.setItem("deliveryInstructions", e.target.value);
  };

  const handleCheckout = () => {
    const orderData = {
      items: cartItems,
      deliveryInstructions: instructions,
      module: selectedModule,
    };
    console.log("Order Data:", orderData);
    alert("Order placed! Check console for data.");
  };

  const handleQtyChange = (index, delta) => {
    const updatedItems = [...cartItems];
    updatedItems[index].qty = Math.max(1, updatedItems[index].qty + delta);
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const saveForLater = (item) => {
    const existingWishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];
    const updatedWishlist = [...existingWishlist, item];
    localStorage.setItem("wishlistItems", JSON.stringify(updatedWishlist));
    removeFromCart(item.id);
    alert(`${item.name} saved for later`);
  };

  return (
    <>
      <Header />
      <div
        style={{
          maxWidth: 900,
          margin: "30px auto",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          className="d-flex flex-row align-items-center justify-content-between mb-4"
          style={{ borderBottom: "1px solid #ddd", paddingBottom: "10px" }}
        >
          <h2>My Cart - {selectedModule}</h2>
          <div>
            <strong>Delivery Address:</strong> customer address &nbsp;
            <button
              style={{
                padding: "4px 10px",
                fontSize: 12,
                background: "#eee",
                border: "none",
                borderRadius: 4,
              }}
            >
              Change
            </button>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <div>
            <button
              style={{
                padding: "8px 16px",
                border: "1px solid #2874f0",
                backgroundColor:
                  selectedModule === "BBSCART" ? "#2874f0" : "white",
                color: selectedModule === "BBSCART" ? "white" : "#2874f0",
                borderRadius: 4,
                marginRight: 10,
              }}
              onClick={() => setSelectedModule("BBSCART")}
            >
              BBSCART
            </button>
            <button
              style={{
                padding: "8px 16px",
                border: "1px solid #2874f0",
                backgroundColor:
                  selectedModule === "Grocery" ? "#2874f0" : "white",
                color: selectedModule === "Grocery" ? "white" : "#2874f0",
                borderRadius: 4,
              }}
              onClick={() => setSelectedModule("Grocery")}
            >
              Grocery
            </button>
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          {cartItems.map((item, index) => (
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
                  <div style={{ fontSize: 14, color: "#999" }}>
                    Delivery: {item.deliveryDate}
                  </div>
                  <div style={{ marginTop: 6 }}>
                    <button
                      onClick={() => handleQtyChange(index, -1)}
                      style={{ padding: "2px 8px" }}
                    >
                      -
                    </button>
                    <span style={{ margin: "0 8px" }}>{item.qty}</span>
                    <button
                      onClick={() => handleQtyChange(index, 1)}
                      style={{ padding: "2px 8px" }}
                    >
                      +
                    </button>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 600, marginTop: 15, paddingLeft: 10 }}>
                    ₹{item.price * item.qty}
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <button
                      style={{
                        fontSize: 12,
                        color: "#2874f0",
                        background: "none",
                        border: "none",
                        marginRight: 10,
                      }}
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                    <button
                      style={{
                        fontSize: 12,
                        color: "#2874f0",
                        background: "none",
                        border: "none",
                        marginRight: 10,
                      }}
                      onClick={() => saveForLater(item)}
                    >
                      Save for Later
                    </button>
                    <button
                      style={{
                        fontSize: 12,
                        color: "#2874f0",
                        background: "none",
                        border: "none",
                      }}
                      onClick={() => alert("Buy Now feature coming soon")}
                    >
                      Buy This Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          onClick={toggleInstructions}
          style={{
            cursor: "pointer",
            color: "#2874f0",
            fontWeight: "600",
            marginBottom: showInstructions ? 10 : 20,
          }}
        >
          {showInstructions ? "Hide" : "Add"} Delivery Instructions
        </div>

        {showInstructions && (
          <div style={{ marginBottom: 20 }}>
            <textarea
              rows={4}
              value={instructions}
              onChange={handleInstructionsChange}
              placeholder="E.g. Please call on arrival or leave the package with the security guard."
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 4,
                border: "1px solid #ccc",
                resize: "vertical",
                fontSize: 14,
                fontFamily: "inherit",
              }}
            />
            <small style={{ color: "#555" }}>
              These instructions will help the delivery person serve you better.
            </small>
          </div>
        )}

        <button
          onClick={handleCheckout}
          style={{
            backgroundColor: "#fb641b",
            color: "#fff",
            border: "none",
            padding: "12px 25px",
            borderRadius: 3,
            fontWeight: "600",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Place Order
        </button>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
