// src/components/LoadingOverlay.js
import React from "react";
import "./LoadingOverlay.css"; // styling below
import logo from "../assets/logo.png"; // your logo path

const LoadingOverlay = () => (
  <div className="loading-overlay">
    <img src={logo} alt="Loading..." className="loading-logo" />
  </div>
);

export default LoadingOverlay;
