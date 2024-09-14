import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // External CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Footer Links */}
        <div className="footer-links">
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Services</h4>
            <ul>
              <li><Link to="/web">Web Development</Link></li>
              <li><Link to="/app">App Development</Link></li>
              <li><Link to="/marketing">Digital Marketing</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>

        {/* Footer Bottom Section */}
        <div className="footer-bottom">
          <p>&copy; 2024 Your Company. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
