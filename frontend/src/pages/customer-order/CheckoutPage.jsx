import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCreditCard, FaMoneyBill, FaMobileAlt, FaBoxOpen } from "react-icons/fa";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const CheckoutPage = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [payment, setPayment] = useState("card");
  const [giftCode, setGiftCode] = useState("");
  const [giftCardApplied, setGiftCardApplied] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [finalTotal, setFinalTotal] = useState(0);

  const cart = [
    {
      id: 1,
      name: "iPhone 15",
      qty: 1,
      price: 79990,
      image:
        "https://png.pngtree.com/png-clipart/20231007/original/pngtree-iphone-15-blue-png-image_13289457.png",
    },
    {
      id: 2,
      name: "Sony WH-1000XM5 Headphones",
      qty: 1,
      price: 29990,
      image:
        "https://th.bing.com/th/id/OIP.pEFfyZagbX3Q3iKYJN9vrgHaHa?rs=1&pid=ImgDetMain",
    },
  ];

  const total = cart.reduce((acc, item) => acc + item.qty * item.price, 0);

  useEffect(() => {
    setFinalTotal(total);
  }, [total]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleApplyGiftCard = () => {
    const stored = localStorage.getItem(`giftcard:${giftCode}`);
    if (!stored) {
      setErrorMsg("Gift card not found.");
      return;
    }

    const parsed = JSON.parse(stored);
    const today = new Date().toISOString().split("T")[0];

    if (parsed.isUsed || parsed.balance <= 0) {
      setErrorMsg("This gift card has already been used.");
      return;
    }

    if (parsed.expiry < today) {
      setErrorMsg("This gift card has expired.");
      return;
    }

    const deduction = Math.min(total, parsed.balance);
    const newTotal = total - deduction;

    parsed.balance -= deduction;
    if (parsed.balance <= 0) parsed.isUsed = true;

    localStorage.setItem(`giftcard:${giftCode}`, JSON.stringify(parsed));

    setGiftCardApplied({
      code: giftCode,
      amountUsed: deduction,
      remainingBalance: parsed.balance,
    });

    setFinalTotal(newTotal);
    setErrorMsg("");
  };

  const submitOrder = (e) => {
    e.preventDefault();
    alert("Order Placed!");
    console.log({ form, payment });
  };

  return (
    <>
      <Header />
      <div
        style={{
          background: "rgba(39, 43, 21, 0.46)",
          padding: "30px 10%",
          paddingBottom: "100px",
        }}
      >
        <div className="mb-4 d-flex justify-content-center">
          <h2
            style={{
              fontSize: "40px",
              color: "white",
              fontFamily: "roboto",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              padding: "10px 20px",
              borderRadius: "10px",
              backgroundColor: "rgba(17, 11, 11, 0.87)",
            }}
          >
            Checkout
          </h2>
        </div>

        <form onSubmit={submitOrder} className="row g-4">
          {/* Shipping Address */}
          <div className="col-lg-6 mb-4">
            <div className="card shadow p-4 rounded-4 h-100">
              <h5 className="mb-3 text-dark">
                <FaBoxOpen className="me-2" />
                Shipping Address
              </h5>
              {["name", "phone", "address", "city", "state", "zip"].map((field) => (
                <input
                  key={field}
                  name={field}
                  placeholder={field[0].toUpperCase() + field.slice(1)}
                  className="form-control mb-3 mt-3 p-3"
                  onChange={handleChange}
                  required
                />
              ))}
            </div>
          </div>

          {/* Payment & Order Summary */}
          <div className="col-lg-6">
            {/* Payment Method */}
            <div className="card shadow p-4 mb-4 rounded-4">
              <h5 className="mb-3 text-dark">
                <FaCreditCard className="me-2" />
                Payment Method
              </h5>
              {[
                { value: "card", label: "Credit / Debit Card", icon: <FaCreditCard /> },
                { value: "upi", label: "UPI / Wallet", icon: <FaMobileAlt /> },
                { value: "cod", label: "Cash on Delivery", icon: <FaMoneyBill /> },
              ].map(({ value, label, icon }) => (
                <div className="form-check mb-2" key={value}>
                  <input
                    className="form-check-input"
                    type="radio"
                    value={value}
                    id={value}
                    checked={payment === value}
                    onChange={() => setPayment(value)}
                  />
                  <label className="form-check-label" htmlFor={value}>
                    {icon} <span className="ms-2">{label}</span>
                  </label>
                </div>
              ))}

              {/* Conditional Payment Fields */}
              {payment === "card" && (
                <div className="mt-4">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Card Number"
                    maxLength="16"
                    required
                  />
                  <div className="d-flex gap-3">
                    <input
                      type="text"
                      className="form-control mb-3"
                      placeholder="MM/YY"
                      maxLength="5"
                      required
                    />
                    <input
                      type="text"
                      className="form-control mb-3"
                      placeholder="CVV"
                      maxLength="4"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Cardholder Name"
                    required
                  />
                </div>
              )}

              {payment === "upi" && (
                <div className="mt-4">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter your UPI ID (e.g., username@upi)"
                    required
                  />
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="card shadow p-4 rounded-4">
              <h5 className="mb-3 text-dark">Order Summary</h5>
              {cart.map((item) => (
                <div
                  className="d-flex justify-content-between align-items-center mb-3"
                  key={item.id}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="img-thumbnail me-3"
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="flex-grow-1">
                    <span className="fw-semibold">
                      {item.name} x {item.qty}
                    </span>
                  </div>
                  <div className="text-end">
                    <span className="text-dark">
                      ₹{(item.qty * item.price).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}

              {/* Gift Card Redemption */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Apply Gift Card</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Gift Card Code"
                    value={giftCode}
                    onChange={(e) => setGiftCode(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleApplyGiftCard}
                  >
                    Apply
                  </button>
                </div>
                {giftCardApplied && (
                  <div className="text-success mt-2">
                    Gift Card applied: ₹{giftCardApplied.amountUsed} deducted.
                    {giftCardApplied.remainingBalance > 0 && (
                      <div className="small text-muted">
                        Remaining balance: ₹{giftCardApplied.remainingBalance}
                      </div>
                    )}
                  </div>
                )}
                {errorMsg && <div className="text-danger mt-2">{errorMsg}</div>}
              </div>

              <hr />
              <div className="d-flex justify-content-between fs-5 fw-bold">
                <span>Total:</span>
                <span>₹{finalTotal.toLocaleString()}</span>
              </div>
              <button
                type="submit"
                className="btn btn-warning mt-4 w-100 fw-bold rounded-pill shadow"
              >
                Place Your Order
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
