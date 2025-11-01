import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-light text-dark border-top pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">

          {/* 1. Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-dark text-decoration-none d-block mb-2">About Thiaworld</a></li>
              <li><a href="#" className="text-dark text-decoration-none d-block mb-2">Thia Secure Plan</a></li>
              <li><a href="#" className="text-dark text-decoration-none d-block mb-2">Terms & Conditions</a></li>
              <li><a href="#" className="text-dark text-decoration-none d-block mb-2 ">Privacy Policy</a></li>
              <li><a href="/customersupport" className="text-dark text-decoration-none d-block mb-2">Customer Support</a></li>
              <li><a href="/cms" className="text-dark text-decoration-none d-block mb-2">CMS Page Manager</a></li>
            </ul>
          </div>

          {/* 2. Newsletter Signup */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-3">Subscribe</h5>
            <p>Get exclusive updates and offers in your inbox.</p>
            <form className="d-flex flex-column flex-sm-row gap-2">
              <input
                type="email"
                className="form-control"
                placeholder="Your email address"
              />
              <button type="submit" className="btn btn-warning text-white">
                Subscribe
              </button>
            </form>
          </div>

          {/* 3. Social & Contact Info */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-3">Connect With Us</h5>
            <div className="d-flex mb-3 gap-3">
              <a href="#" className="text-dark fs-5"><FaFacebookF /></a>
              <a href="#" className="text-dark fs-5"><FaInstagram /></a>
              <a href="#" className="text-dark fs-5"><FaYoutube /></a>
            </div>
            <p className="mb-1 pb-2">📧 support@thiaworld.com</p>
            <p>📍 Second Cross, Bharathi Street extension, Ellaipillaichavady, Anna Nagar, Puducherry</p>
          </div>
        </div>

        {/* Back to Top */}
        <div className="text-center mt-4">
          <button
            onClick={handleBackToTop}
            className="btn btn-link text-warning text-decoration-none"
          >
            ⬆ Back to Top
          </button>
        </div>

        {/* Bottom Note */}
        <div className="text-center text-muted small mt-3">
          © {new Date().getFullYear()} Thiaworld. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
