import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./WhatsAppMessageLink.css";

const WhatsAppmebulk = ({ message }) => {
  const [currentShift, setCurrentShift] = useState("");
  const [admin, setAdmin] = useState("");
  const [deliveryCost, setDeliveryCost] = useState(0);

  const currentHour = new Date().getHours();
  const dayShiftStart = 8;
  const dayShiftEnd = 17;

  useEffect(() => {
    const nightShiftStart = dayShiftEnd;
    const nightShiftEnd = 8;

    if (currentHour >= dayShiftStart && currentHour < dayShiftEnd) {
      setCurrentShift("Day Shift");
      setAdmin("+9779703782444");
      setDeliveryCost(50); // Set delivery cost for day shift
    } else if (currentHour >= nightShiftStart || currentHour < nightShiftEnd) {
      setCurrentShift("Night Shift");
      setAdmin("+9779703782444");
      setDeliveryCost(150); // Set delivery cost for night shift
    } else {
      setCurrentShift("Outside of Day and Night Shifts");
      setAdmin("+9779703782444");
      setDeliveryCost(0); // No delivery cost for outside shifts
    }
  }, [currentHour]);

  const defaultMessage = `Hello, This is my order details!    `;

  const generateWhatsAppLink = () => {
    const url = `https://api.whatsapp.com/send?phone=${admin}&text=${encodeURIComponent(
      defaultMessage +
        currentShift +
        ` Delivery Cost: ${deliveryCost}` +
        message
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
              xs: "12px",
              sm: "14px",
              md: "16px",
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
          CONFIRM ORDER
        </Button>
      </a>
    </div>
  );
};

export default WhatsAppmebulk;
