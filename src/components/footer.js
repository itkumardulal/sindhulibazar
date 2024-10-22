import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"; // External CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Footer Links */}
        <div className="footer-links">
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/">Careers</Link>
              </li>
              <li>
                <Link to="/">Blog</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li>
                <Link to="/contact">Help Center</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              {/* <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li> */}
            </ul>
          </div>

          <div className="footer-column">
            <h4>Services</h4>
            <ul>
              <li>
                <Link to="/">Web Development</Link>
              </li>
              <li>
                <Link to="/">App Development</Link>
              </li>
              <li>
                <Link to="/">Digital Marketing</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="footer-social">
          <a
            href="https://facebook.com/sindhulibazar"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="hhttps://www.youtube.com/nltproductions"
            target="_blank"
            rel="noopener noreferrer"
          >
            Youtube
          </a>
          <a
            href="https://facebook.com/nltproductions"
            target="_blank"
            rel="noopener noreferrer"
          >
            video Production page
          </a>
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
