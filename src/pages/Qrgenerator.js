// File: Qrgenerator.js

import React, { useState, useRef } from "react";
import QRCode from "qrcode";
import "./Qrgenerator.css";
import DrawerAppBar from "../components/Navbar";

// QR Generator component using normal CSS

export default function Qrgenerator({ defaultText = "https://example.com" }) {
  const [text, setText] = useState(defaultText);
  const [size, setSize] = useState(256);
  const [dataUrl, setDataUrl] = useState("");
  const [error, setError] = useState("");
  const canvasRef = useRef(null);

  const generate = async () => {
    setError("");
    if (!text || text.trim() === "") {
      setError("Please enter text to encode.");
      return;
    }
    try {
      const opts = { width: size };
      const url = await QRCode.toDataURL(text, opts);
      setDataUrl(url);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
          canvas.width = size;
          canvas.height = size;
          ctx.drawImage(img, 0, 0, size, size);
        };
        img.src = url;
      }
    } catch (e) {
      console.error(e);
      setError("Failed to generate QR code.");
    }
  };

  const downloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "qr.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <>
      <DrawerAppBar />
      <div className="qr-container">
        <h2>QR Code Generator</h2>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter URL or text"
          className="qr-input"
        />
        <div className="qr-size-control">
          <label>
            Size: {size}px
            <input
              type="range"
              min="128"
              max="512"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
            />
          </label>
        </div>
        <div className="qr-buttons">
          <button onClick={generate}>Generate</button>
          <button onClick={downloadPNG}>Download</button>
        </div>
        {error && <div className="qr-error">{error}</div>}

        <div className="qr-preview">
          {dataUrl ? (
            <img
              src={dataUrl}
              alt="QR preview"
              style={{ width: size, height: size }}
            />
          ) : (
            <p>No QR yet</p>
          )}
        </div>
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </>
  );
}
