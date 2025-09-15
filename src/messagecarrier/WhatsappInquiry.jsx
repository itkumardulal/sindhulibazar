import React from "react";

export default function WhatsappInquiry({ message, phone }) {
  const encodedMessage = encodeURIComponent(message);
  const waLink = `https://wa.me/${phone}?text=${encodedMessage}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-block",
        padding: "10px 16px",
        backgroundColor: "#25D366",
        color: "#fff",
        borderRadius: "6px",
        textDecoration: "none",
        fontWeight: "600",
        marginTop: "12px",
      }}
    >
      Send via WhatsApp
    </a>
  );
}
