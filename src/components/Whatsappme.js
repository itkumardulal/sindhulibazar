import { CommentSharp, Numbers } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./WhatsAppMessageLink.css";

const WhatsAppMessageLink = ({ orderDetails }) => {
  const totalCost = orderDetails.count * orderDetails.price + 150;
  const [currentShift, setCurrentShift] = useState("");
  const [admin, setAdmin] = useState("");

  const currentHour = new Date().getHours();
  const dayShiftStart = 8;
  const dayShiftEnd = 17;

  useEffect(() => {
    const nightShiftStart = dayShiftEnd;
    const nightShiftEnd = 8;
    if (currentHour >= dayShiftStart && currentHour < dayShiftEnd) {
      setCurrentShift("Day Shift");
      setAdmin(+9779703782444);
    } else if (currentHour >= nightShiftStart || currentHour < nightShiftEnd) {
      setCurrentShift("Night Shift");
      setAdmin(+9779703782444);
    } else {
      setCurrentShift("Outside of Day and Night Shifts");
      setAdmin(+9779703782444);
    }
  });

  const phoneNumber = "YOUR_PHONE_NUMBER";
  const defaultMessage = "Hello, This is my order details!";

  const generateWhatsAppLink = () => {
    const url = `https://api.whatsapp.com/send?phone=${admin}&text=${encodeURIComponent(
      defaultMessage +
        "  " +
        "##itemName: " +
        orderDetails.name +
        "  " +
        "##Price per piece: " +
        orderDetails.price +
        " " +
        "##quantity: " +
        orderDetails.count +
        "##Delivery Charge:Rs." +
        150 +
        "##total price:" +
        totalCost
    )}`;
    return url;
  };

  return (
    <div>
      <a
        href={generateWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          sx={{
            mb: 2,
            width: "100%",
            background: "linear-gradient(145deg, #e1b709, #FF9800)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "12px 24px",
            fontSize: {
              xs: "12px", // Smaller font size for extra-small screens
              sm: "14px", // Slightly larger font size for small screens
              md: "16px", // Default font size for medium screens and above
            },
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background 0.3s, transform 0.3s, box-shadow 0.3s",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              background: "linear-gradient(145deg, #FFB300, #FF6F00)",
              transform: "translateY(-3px)",
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
            },
            "&:active": {
              transform: "translateY(0)",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            },
          }}
          size="medium"
          variant="outlined"
        >
          ORDER NOW!
        </Button>
      </a>
    </div>
  );
};

export default WhatsAppMessageLink;
