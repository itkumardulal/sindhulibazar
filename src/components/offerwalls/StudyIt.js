// StudyIt.js
import React from "react";

const StudyIt = () => {
  const bannerStyle = {
    width: "98%",
    maxWidth: "1400px",
    height: "200px",
    margin: "20px auto",
    backgroundImage: "url('https://i.imgur.com/COz3jZf.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "12px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
    position: "relative",
    overflow: "hidden",
    textAlign: "center",
    padding: "0 15px",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, rgba(228, 20, 20, 0.32), rgba(226, 191, 14, 0.56))",
    zIndex: 0,
    borderRadius: "12px",
    pointerEvents: "none", // allow clicks to pass through overlay
  };

  const textStyle = {
    color: "#fff",
    fontSize: "clamp(18px, 2.5vw, 28px)",
    fontWeight: 700,
    zIndex: 1,
    textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
    marginBottom: "8px",
  };

  const subTextStyle = {
    color: "#fff",
    fontSize: "clamp(14px, 1.8vw, 20px)",
    fontWeight: 500,
    zIndex: 1,
    textShadow: "1px 1px 6px rgba(0,0,0,0.4)",
    marginBottom: "12px",
  };

  const highlightStyle = {
    color: "#ff3c3c",
    fontWeight: 800,
  };

  const buttonStyle = {
    padding: "10px 22px",
    fontSize: "16px",
    fontWeight: 600,
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg, #ff3c3c, #f7d038)",
    color: "#fff",
    zIndex: 1,
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    transition: "transform 0.2s, box-shadow 0.2s",
  };

  return (
    <div style={bannerStyle}>
      <div style={overlayStyle}></div>
      <h2 style={textStyle}>
        Learn Technology, Lead Education – B.Tech.Ed IT Sindhuli in <span style={highlightStyle}>Lower Cost</span>
      </h2>
      <p style={subTextStyle}>
        म प्रविधि र शिक्षामा अध्ययन गर्न चाहन्छु – Be better personal & professional!
      </p>
      <a href="/btech_sindhuli" style={{ textDecoration: "none", zIndex: 2 }}>
        <button
          style={buttonStyle}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.4)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
          }}
        >
          🚀 Explore Career Paths
        </button>
      </a>
    </div>
  );
};

export default StudyIt;
