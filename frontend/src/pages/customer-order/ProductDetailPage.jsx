import { useState } from "react";
import ModalImage from "react-modal-image";
import { FaHeart, FaShoppingCart, FaBolt, FaShareAlt } from "react-icons/fa";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ProductDetailPage = () => {
  const [paymentOption, setPaymentOption] = useState("full");
  const [currentIndex, setCurrentIndex] = useState(0);

  const product = {
    id: 101,
    title: "22K Temple Gold Necklace",
    code: "GRT-22KGOLD123",
    price: 96700,
    originalPrice: 102000,
    discount: "5% OFF",
    description: "Intricately carved with Lakshmi motifs and antique finish.",
    metal: "Gold",
    purity: "22K",
    weight: {
      net: "72.8",
      gross: "74.2",
    },
    isNewArrival: true,
    quickDelivery: true,
    images: [
      "https://th.bing.com/th/id/R.dfd2fa28b2f425b4d6e6a4026681d63b?rik=kOd8zY6%2bDT8PHQ&riu=http%3a%2f%2fwww.pngmart.com%2ffiles%2f7%2fGroceries-PNG-Pic.png&ehk=bRAmsXXSOzw6MIQmJy7iWQVgGk2ogP5wGbelP6nzXkY%3d&risl=&pid=ImgRaw&r=0",
      "https://th.bing.com/th/id/R.866829a783238248b97c714ff44c8695?rik=CvuALdJZCmOW%2fA&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f4%2fGrocery-PNG-Clipart.png&ehk=I8WOyYBcEtXGwb6p%2bFZEUm3pu7nJebCvzC46I405BXk%3d&risl=&pid=ImgRaw&r=0",
      "https://freepngimg.com/thumb/grocery/53973-6-grocery-free-hq-image.png",
      "https://th.bing.com/th/id/R.f08138539e84b2cba6abcbd0a09b2561?rik=bZrSinF3bKr4cQ&riu=http%3a%2f%2fwww.pngplay.com%2fwp-content%2fuploads%2f7%2fGrocery-Items-Transparent-Background.png&ehk=E2Q%2f7mohBR3NmaIxN8OfdmrFFW%2f7FZcagUVKv3%2be6wg%3d&risl=&pid=ImgRaw&r=0",
    ],
  };

  const images = product.images;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const isAlreadyInCart = existingCart.some((item) => item.id === product.id);

    if (!isAlreadyInCart) {
      const cartItem = {
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.images[0],
        rating: 4.5,
        offer: product.discount,
        deliveryDate: "Tomorrow",
        qty: 1,
      };
      localStorage.setItem("cartItems", JSON.stringify([...existingCart, cartItem]));
      alert("Added to cart!");
    } else {
      alert("Already in cart");
    }
  };

  const buyNow = () => {
    addToCart();
    alert("Proceeding to checkout...");
    // Redirect to checkout page (placeholder):
    // window.location.href = "/checkout";
  };

  const addToWishlist = () => {
    const existingWishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];
    const isAlreadyWishlisted = existingWishlist.some((item) => item.id === product.id);

    if (!isAlreadyWishlisted) {
      const wishlistItem = {
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.images[0],
        rating: 4.5,
        offer: product.discount,
        deliveryDate: "Tomorrow",
      };
      localStorage.setItem("wishlistItems", JSON.stringify([...existingWishlist, wishlistItem]));
      alert("Added to wishlist!");
    } else {
      alert("Already in wishlist");
    }
  };

  return (
    <>
      <Header />
      <div className="container py-4">
        <div className="mb-4 d-flex justify-content-between align-items-center">
          <h2 className="h4 fw-bold">Product Card</h2>
        </div>

        <div className="card shadow-sm p-4 mb-5">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="position-relative mb-3">
                <ModalImage
                  small={images[currentIndex]}
                  large={images[currentIndex]}
                  alt={product.title}
                  className="w-100 p-5"
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "contain",
                  }}
                />
                <button
                  onClick={goToPrevious}
                  className="btn btn-light position-absolute top-50 start-0 translate-middle-y"
                  style={{ height: "60px", width: "40px" }}
                >
                  ‹
                </button>
                <button
                  onClick={goToNext}
                  className="btn btn-light position-absolute top-50 end-0 translate-middle-y"
                  style={{ height: "60px", width: "40px" }}
                >
                  ›
                </button>
              </div>

              <div className="d-flex justify-content-center gap-2 mt-2">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumb ${index}`}
                    onClick={() => handleThumbnailClick(index)}
                    className={`img-thumbnail me-2 ${index === currentIndex ? "border-warning" : ""}`}
                    style={{ width: "60px", height: "60px", cursor: "pointer" }}
                  />
                ))}
              </div>
            </div>

            <div className="col-md-6">
              <h2 className="h5 fw-bold">{product.title}</h2>
              <p className="text-muted small mb-1">Product Code: {product.code}</p>

              <div className="text-warning fs-4 fw-semibold">
                ₹{product.price.toLocaleString()}
              </div>
              <div className="text-muted text-decoration-line-through">
                ₹{product.originalPrice.toLocaleString()}
              </div>
              <div className="text-success fw-semibold mb-2">{product.discount}</div>

              <p className="mb-1">{product.description}</p>
              <p>
                <strong>Metal:</strong> {product.metal} | <strong>Purity:</strong> {product.purity}
              </p>
              <p>
                <strong>Weight:</strong> Net {product.weight.net} g / Gross {product.weight.gross} g
              </p>

              <div className="form-check mt-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  checked={paymentOption === "full"}
                  onChange={() => setPaymentOption("full")}
                />
                <label className="form-check-label">Full Payment</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  checked={paymentOption === "partial"}
                  onChange={() => setPaymentOption("partial")}
                />
                <label className="form-check-label">Partial Payment (40%)</label>
              </div>

              <div className="d-flex flex-wrap gap-2 mt-4">
                <button className="btn btn-warning text-white d-flex align-items-center gap-2" onClick={addToCart}>
                  <FaShoppingCart /> Add to Cart
                </button>
                <button className="btn btn-success text-white d-flex align-items-center gap-2" onClick={buyNow}>
                  <FaBolt /> Buy Now
                </button>
                <button className="btn btn-outline-secondary d-flex align-items-center gap-2" onClick={addToWishlist}>
                  <FaHeart /> Wishlist
                </button>
              </div>

              <div className="d-flex flex-wrap gap-3 mt-3 small">
                <button className="btn btn-link p-0">Notify Price Drop</button>
                <button className="btn btn-link p-0">View Similar</button>
                <button className="btn btn-link p-0">View Collection</button>
                <button className="btn btn-link p-0 d-flex align-items-center gap-1">
                  <FaShareAlt /> Share
                </button>
              </div>

              <div className="d-flex align-items-center gap-2 mt-4">
                <input type="text" className="form-control form-control-sm w-auto" placeholder="Enter Pincode" />
                <button className="btn btn-success btn-sm">Check Delivery</button>
                <button className="btn btn-success btn-sm">WhatsApp Us</button>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h5 className="fw-semibold">Product Description</h5>
            <p className="text-muted">{product.description}</p>
          </div>

          <div className="mt-4">
            <h5 className="fw-semibold">Product Information</h5>
            <ul className="text-muted list-unstyled ms-3">
              <li>• Metal: {product.metal}</li>
              <li>• Purity: {product.purity}</li>
              <li>• Net Weight: {product.weight.net} g</li>
              <li>• Gross Weight: {product.weight.gross} g</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailPage;
