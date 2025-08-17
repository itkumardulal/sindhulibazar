import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const openPrivacyModal = () => setIsPrivacyOpen(true);
  const closePrivacyModal = () => setIsPrivacyOpen(false);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-columns">
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/">Careers</Link></li>
              <li><Link to="/">Blog</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li><Link to="/contact">Help Center</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li>
                <button className="privacy-btn" onClick={openPrivacyModal}>
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>OTHER Services</h4>
            <ul>
              <li><Link to="/">NLT PRODUCTIONS</Link></li>
              <li><Link to="/">Nepal Leadership Technology PVT. LTD</Link></li>
              <li><Link to="/">App Development</Link></li>
              <li><Link to="/">Digital Marketing</Link></li>
            </ul>
          </div>

          <div className="footer-column social-column">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="https://www.facebook.com/SindhuliBazar" target="_blank" rel="noopener noreferrer">📘 Facebook</a>
              <a href="https://www.youtube.com/@nltproductionss" target="_blank" rel="noopener noreferrer">🎥 YouTube</a>
              <a href="https://www.facebook.com/nitin.dulal/" target="_blank" rel="noopener noreferrer">🧑‍💼 Connect with Creator</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; 2024 Sindhuli Bazar. All Rights Reserved.</span>
        </div>

        {showTopBtn && (
          <button className="back-to-top" onClick={scrollToTop}>
            ⬆ Back to Top
          </button>
        )}

        {/* Privacy Policy Modal */}
        {isPrivacyOpen && (
          <div className="modal-overlay" onClick={closePrivacyModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <h2>Privacy Policy</h2>
              <p>
                At <strong>SindhuliBazar.com</strong>, your privacy is important to us. We only collect the following information when you place an order:
              </p>
              <ul>
                <li>Name and Phone Number</li>
                <li>Billing and Shipping Address</li>
                <li>Order Information (items purchased, quantities, total amount)</li>
                <li>Location Information (if needed for delivery)</li>
              </ul>
              <p>Your information is used only to process and deliver your orders, and to contact you if necessary. We do <strong>not</strong> collect or store any other personal data.</p>
              <p>We do not sell or share your information with third parties, except to service providers needed for order fulfillment.</p>
              <p>If you have questions about your privacy or order information, contact us at:</p>
              <p>📞 +977-9741667448<br />🏠 Kamalamai 5, Sindhuli, Nepal</p>
              <button className="close-modal" onClick={closePrivacyModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
