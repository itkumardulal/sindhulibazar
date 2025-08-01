import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import "./WhatsAppMessageLink.css";

const WhatsAppMessageLink = ({ orderDetails }) => {
  const [currentShift, setCurrentShift] = useState("");
  const [admin, setAdmin] = useState("");
  const [deliveryCharge, setDeliveryCharge] = useState(0); // Initialize to 0

  const dayShiftStart = 8;
  const dayShiftEnd = 20;

  useEffect(() => {
    const currentHour = new Date().getHours();

    // Setting admin contact based on the current shift
    if (currentHour >= dayShiftStart && currentHour < dayShiftEnd) {
      setCurrentShift("Day Shift");
      setAdmin("+9779703782444"); // Adjust admin number accordingly
      setDeliveryCharge(50); // Set delivery charge for day shift
    } else {
      setCurrentShift("Night Shift");
      setAdmin("+9779703782444");
      setDeliveryCharge(120); // Set delivery charge for night shift
    }
  }, []);

  const totalCost = orderDetails.count * orderDetails.price + deliveryCharge;

  const generateWhatsAppLink = () => {
    const message = `नमस्ते, यो मेरो अर्डर विवरण हो!

\`\`\`
Shift:        ${currentShift}
----------------------------------------
Item Name     | Quantity | Price/piece
----------------------------------------
${orderDetails.name.padEnd(12)} | ${orderDetails.count
      .toString()
      .padEnd(8)} | Rs.${orderDetails.price.toString().padEnd(10)}
----------------------------------------
Delivery Charge: Rs.${deliveryCharge}
Total Price:    Rs.${totalCost}
\`\`\`
`;

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
            width: "100%",
            background: "linear-gradient(90deg, #FDB813 100%, #FF5714 100%)",
            color: "white",
            borderRadius: "5px",
            top: "10px",
            fontSize: {
              xs: "14px",
              sm: "16px",
              md: "18px",
            },
            fontWeight: "bold",
            textTransform: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            transition: "all 0.3s ease-in-out",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            "&:hover": {
              background: "linear-gradient(90deg, #FF7B00 0%, #FF2400 100%)",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.5)",
            },
            "&:active": {
              transform: "translateY(0)",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            },
          }}
          size="small"
          variant="contained"
        >
          <img
            src="https://i.imgur.com/DECyii1.png"
            alt="WhatsApp Icon"
            style={{
              width: "25px",
              height: "25px",
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
