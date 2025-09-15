
import React from "react";
import DrawerAppBar from "../Navbar";
import Footer from "../footer";



export default function PromoCardGiftForFriend({ onOrderNow }) {
  return (
    <>
    <DrawerAppBar>
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>🎉 Welcome to Gifts & Celebrations!</h2>
        <p style={descStyle}>
          Celebrate your friends and loved ones with beautiful gifts from 
          <strong> SindhuliBazar.com</strong>. Play our fun gift-spin game, create personalized 
          online gift cards, and send thoughtful gift links to make someone's day extra special!
        </p>
        <button style={buttonStyle} onClick={onOrderNow}>
          Order for Friend Now
        </button>
      </div>
    </div>
  
    </DrawerAppBar>
     <Footer/>
     </>
  );
}

// Inline styles (you can move to CSS or Tailwind)
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // padding: "40px 20px",
  minHeight: "80vh",
 
  
  // background: "linear-gradient(100deg, #f5f5f565, #d496323f)",
  textAlign: "center",

};

const cardStyle = {
  maxWidth: "500px",
  background: "#fff",
  borderRadius: "16px",
  padding: "30px 20px",
  boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
};

const titleStyle = {
  fontSize: "24px",
  marginBottom: "16px",
  color: "#ff4081",
};

const descStyle = {
  fontSize: "16px",
  color: "#333",
  marginBottom: "24px",
  lineHeight: "1.6",
};

const buttonStyle = {
  padding: "12px 24px",
  fontSize: "16px",
  color: "#fff",
  background: "#ff4081",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 0.3s ease",
};
