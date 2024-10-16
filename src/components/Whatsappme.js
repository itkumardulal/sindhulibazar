import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import "./WhatsAppMessageLink.css";

const WhatsAppMessageLink = ({ orderDetails }) => {
  const deliveryCharge = 150;
  const totalCost = orderDetails.count * orderDetails.price + deliveryCharge;
  const [currentShift, setCurrentShift] = useState("");
  const [admin, setAdmin] = useState("");

  const dayShiftStart = 8;
  const dayShiftEnd = 17;

  useEffect(() => {
    const currentHour = new Date().getHours();

    // Setting admin contact based on the current shift
    if (currentHour >= dayShiftStart && currentHour < dayShiftEnd) {
      setCurrentShift("Day Shift");
      setAdmin("+9779703782444"); // Adjust admin number accordingly
    } else {
      setCurrentShift("Night Shift");
      setAdmin("+9779703782444");
    }
  }, []);

  const generateWhatsAppLink = () => {
    const message = `Hello, This is my order details!
    ## Item Name: ${orderDetails.name}
    ## Price per piece: Rs.${orderDetails.price}
    ## Quantity: ${orderDetails.count}
    ## Delivery Charge: Rs.${deliveryCharge}
    ## Total Price: Rs.${totalCost}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${admin}&text=${encodedMessage}`;
    return whatsappUrl;
  };

  return (
    <div>
      <a
        href={generateWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Send WhatsApp order to admin ${admin} with details of ${orderDetails.name}`}
      >
        <Button
          sx={{
            mb: 2,
            width: "100%", // Make the button a bit smaller
            background: "linear-gradient(90deg, #FDB813 0%, #FF5714 100%)",
            color: "white",
            borderRadius: "10px", // Slightly smaller border radius
            padding: "5px 5px", // Reduced padding
            top: "5px",
            fontSize: {
              xs: "14px", // Smaller font size
              sm: "16px",
              md: "18px",
            },

            fontWeight: "bold",
            textTransform: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px", // Reduced gap between icon and text
            transition: "all 0.3s ease-in-out", // Slightly faster transition
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", // Reduced shadow for a smaller look
            "&:hover": {
              background: "linear-gradient(90deg, #FF7B00 0%, #FF2400 100%)",
              transform: "translateY(-2px)", // Slight adjustment in hover effect
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.5)", // Adjusted shadow on hover
            },
            "&:active": {
              transform: "translateY(0)",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", // Reduced active shadow
            },
          }}
          size="small" // Use small size for the button
          variant="contained"
        >
          <img
            src="https://i.imgur.com/DECyii1.png"
            alt="WhatsApp Icon"
            style={{
              width: "35px", // Reduced icon size
              height: "35px",
              transition: "transform 0.3s ease",
            }}
            className="whatsapp-icon"
          />
          <span style={{ textDecoration: "underline", fontSize: "16px" }}>
            SEND ORDER
          </span>
        </Button>
      </a>
    </div>
  );
};

export default WhatsAppMessageLink;
