// components/LoadingOverlay.jsx
import React from "react";

const LoadingOverlay = () => (
  <div
    id="loading-overlay"
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(255,255,255,0.9)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
      flexDirection: "column",
    }}
  >
    <img
      src="https://raw.githubusercontent.com/itkumardulal/sindhulibazar/88367851ab55e1e40038dd2af0ad05a07caa1d10/public/mainlogo3.png"
      alt="Loading"
      style={{ width: 100, marginBottom: 20 }}
    />
    <div style={{ fontSize: 18, color: "#333" }}>Loading... Please wait.</div>
  </div>
);

export default LoadingOverlay;
