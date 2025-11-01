import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaHeart,
  FaShoppingCart,
  FaUserAlt,
  FaSearch,
  FaBars,
} from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Logo from "../../public/delivery.png";

const Header = () => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [currency, setCurrency] = useState("INR");
  const [language, setLanguage] = useState("en");

  // Load saved preferences
  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency") || "INR";
    const savedLanguage = localStorage.getItem("language") || "en";
    setCurrency(savedCurrency);
    setLanguage(savedLanguage);
  }, []);

  // Sticky navbar
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY >= 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCurrencyChange = (e) => {
    const selected = e.target.value;
    setCurrency(selected);
    localStorage.setItem("currency", selected);
    // trigger global re-render / conversion later
  };

  const handleLanguageChange = (e) => {
    const selected = e.target.value;
    setLanguage(selected);
    localStorage.setItem("language", selected);
    // trigger i18n switch later
  };

  const getCurrentLocation = async () => {
    setLoading(true);
    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const apiKey = "YOUR_OPENCAGE_API_KEY"; // Replace with real key
          const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
          );
          const address = response.data.results[0]?.formatted;
          setLocation(address || "Location not found");
        } catch (err) {
          setLocation("Location error");
        }
        setLoading(false);
      },
      () => {
        alert("Unable to fetch location.");
        setLoading(false);
      }
    );
  };

  return (
    <header className="bg-white shadow-sm border-bottom">
      {/* Top section with logo + location */}
      <div className="d-flex flex-column flex-md-row align-items-center justify-content-between px-3">
        <div className="d-flex align-items-center">
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "250px", height: "90px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
          <div className="input-group px-3 mx-3" style={{ maxWidth: "350px" }}>
            <button
              className="input-group-text bg-white"
              onClick={getCurrentLocation}
              disabled={loading}
              title="Use current location"
              style={{ zIndex: 2 }}
            >
              <FaLocationCrosshairs className="text-muted" />
            </button>
            <input
              type="text"
              className="form-control text-center"
              disabled
              style={{ borderRadius: "10px" }}
              placeholder="Delivery Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        {/* Mobile hamburger */}
        <button className="btn d-md-none" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <MdCancel size={24} /> : <FaBars size={20} />}
        </button>

        {/* Desktop icons */}
        <div className="d-none d-md-flex align-items-center gap-3">
          <div className="input-group w-50">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search products..."
            />
            <span className="input-group-text bg-white border-start-0">
              <FaSearch className="text-muted" />
            </span>
          </div>
          <button className="btn text-muted" onClick={() => navigate("/wishlist")}>
            <FaHeart />
          </button>
          <button className="btn text-muted position-relative" onClick={() => navigate("/cart")}>
            <FaShoppingCart />
            <span className="position-absolute top-0 start-100 translate-middle badge bg-warning text-dark">
              0
            </span>
          </button>
          <button
            className="btn text-muted d-flex align-items-center"
            onClick={() => navigate("/login")}
          >
            <FaUserAlt className="me-2" />
            <span>Login</span>
          </button>

          {/* Currency & Language */}
          <select
            className="form-select form-select-sm w-auto"
            value={currency}
            onChange={handleCurrencyChange}
          >
            <option value="INR">₹ INR</option>
            <option value="USD">$ USD</option>
            <option value="AED">د.إ AED</option>
            <option value="EUR">€ EUR</option>
          </select>

          <select
            className="form-select form-select-sm w-auto"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="en">🇺🇸 English</option>
            <option value="hi">🇮🇳 Hindi</option>
            <option value="ar">🇦🇪 Arabic</option>
          </select>
        </div>
        
      </div>
       
       
      {/* Mobile nav */}
      {menuOpen && (
        <div className="d-md-none px-3 pb-3">
          <input type="text" className="form-control mb-3" placeholder="Search..." />
          <div className="d-flex justify-content-around gap-3">
            <button onClick={() => navigate("/")}>Home</button>
            <button>About</button>
            <button onClick={() => navigate("/wishlist")}>Contact</button>
          </div>
        </div>
      )}
      
      {/* Sticky Nav Row */}
      <div
        className="d-none d-md-flex justify-between align-items-center px-4 py-2"
        style={{
          backgroundColor: "rgba(65, 217, 0, 1)",
          height: "30px",
          position: "fixed",
          top: isSticky ? "0px" : "100px",
          left: 0,
          zIndex: 999,
          width: "100%",
          color: "black",
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        <div className="w-25" />
        <div className="d-flex gap-4 justify-content-center w-50">
          <span onClick={() => navigate("/")} className="px-2 " style={{ cursor: "pointer" }}>Home</span>
          <span onClick={() => navigate("/about")} className="px-2 " style={{ cursor: "pointer" }}>About Us</span>
          <span onClick={() => navigate("/contact")} className="px-2 " style={{ cursor: "pointer" }}>Contact</span>
        </div>
        <div className="w-25 text-end">
          <a
            href="https://bbs.thia"
            target="_blank"
            rel="noreferrer"
            className="text-decoration-none"
            style={{ color: "black", fontSize: "12px", fontWeight: "bold" }}
          >
            More Pro
          </a>
        </div>
      </div>

      {/* Marquee */}
      <div className="text-black small text-nowrap overflow-hidden w-90  mx-auto pt-5 ">
        <marquee behavior="scroll" direction="left" className="p-2" style={{ fontSize: "14px", fontWeight: "bold" }}>
          Matte Finish Bangles · 22K Necklaces · Antique Temple Jewelry · Lightweight Gold Chains
        </marquee>
      </div>
    </header>
  );
};

export default Header;
