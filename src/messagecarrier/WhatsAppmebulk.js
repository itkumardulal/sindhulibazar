// import { Button } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import "./WhatsAppMessageLink.css";

// const WhatsAppmebulk = ({ message }) => {
//   const [currentShift, setCurrentShift] = useState("");
//   const [admin, setAdmin] = useState("+9779703782444");
//   // const [deliveryCost, setDeliveryCost] = useState(0);

//   useEffect(() => {
//     const currentHour = new Date().getHours();
//     const dayShiftStart = 8;
//     const dayShiftEnd = 20;
//     const nightShiftStart = dayShiftEnd;
//     const nightShiftEnd = 8;

//     if (currentHour >= dayShiftStart && currentHour < dayShiftEnd) {
//       setCurrentShift("Day Shift");
//       setAdmin("+9779703782444");
//       // setDeliveryCost(50); // Set delivery cost for day shift
//     } else if (currentHour >= nightShiftStart || currentHour < nightShiftEnd) {
//       setCurrentShift("Night Shift");
//       setAdmin("+9779703782444");
//       // setDeliveryCost(120); // Set delivery cost for night shift
//     } else {
//       setCurrentShift("Outside of Day and Night Shifts");
//       setAdmin("+9779703782444");
//       // setDeliveryCost(0); // No delivery cost for outside shifts
//     }
//   }, [message]);

//   const defaultMessage = `Hello, This is my order details:`;

//   const generateWhatsAppLink = () => {
//     const safeMessage = message || ""; // fallback to empty string if undefined or null
//     const formattedMessage = `

// ${safeMessage}
//   `;

//     const url = `https://api.whatsapp.com/send?phone=${admin}&text=${encodeURIComponent(
//       formattedMessage
//     )}`;
//     return url;
//   };

//   return (
//     <div>
//       <a
//         href={generateWhatsAppLink()}
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         <Button
//           sx={{
//             mb: 2,
//             width: "100%",
//             background: "linear-gradient(145deg, #e1b709, #FF9800)",
//             color: "white",
//             border: "none",
//             borderRadius: "8px",
//             padding: "12px 24px",
//             fontSize: {
//               xs: "12px",
//               sm: "14px",
//               md: "16px",
//             },
//             fontWeight: "bold",
//             cursor: "pointer",
//             transition: "background 0.3s, transform 0.3s, box-shadow 0.3s",
//             boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
//             "&:hover": {
//               background: "linear-gradient(145deg, #FFB300, #FF6F00)",
//               transform: "translateY(-3px)",
//               boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
//             },
//             "&:active": {
//               transform: "translateY(0)",
//               boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
//             },
//           }}
//           size="medium"
//           variant="outlined"
//         >
//           CONFIRM ORDER
//         </Button>
//       </a>
//     </div>
//   );
// };

// export default WhatsAppmebulk;

// src/messagecarrier/Whatsappme.js

// src/messagecarrier/WhatsAppmebulk.js
// src/messagecarrier/WhatsAppmebulk.js
export const generateWhatsAppBulkLink = (cartItems) => {
  const trackOrderUrl = `https://www.sindhulibazar.com/myorders`;
  const admin = "+9779703782444";

  // Determine current shift and base delivery charge
  const currentHour = new Date().getHours();
  const dayShiftStart = 8;
  const dayShiftEnd = 20;

  const isDayShift = currentHour >= dayShiftStart && currentHour < dayShiftEnd;
  const currentShift = isDayShift ? "Day Shift" : "Night Shift";
  const baseDeliveryCharge = isDayShift ? 50 : 120;

  // Aggregate unique items by name (quantity treated as 1)
  const uniqueItemsMap = new Map();
  cartItems.forEach((item) => {
    if (!uniqueItemsMap.has(item.name)) {
      uniqueItemsMap.set(item.name, { ...item, quantity: 1 });
    }
  });
  const uniqueItems = Array.from(uniqueItemsMap.values());

  // Extra charge logic: if more than 1 unique item, add extra
  const extraCharge = uniqueItems.length > 1 ? (isDayShift ? 15 : 50) : 0;
  const deliveryCharge = baseDeliveryCharge + extraCharge;

  // 🧾 Order Review lines
  const orderLines = uniqueItems.map(
    (item, index) =>
      `${index + 1}. ${item.name.padEnd(25)} | Qty: ${item.quantity}`
  );

  // 📊 Bill Summary
  const billHeader = "Item                       | Qty | Price   | Total";
  const billLines = uniqueItems.map((item) => {
    const totalItem = item.price * item.quantity;
    return `${item.name.padEnd(25)} | ${String(item.quantity).padStart(
      3
    )} | Rs.${String(item.price).padStart(6)} | *Rs.${String(
      totalItem
    ).padStart(6)}*`;
  });

  const grandTotal =
    uniqueItems.reduce((sum, i) => sum + i.price * i.quantity, 0) +
    deliveryCharge;

  const message = `*नमस्ते, यो मेरो अर्डर विवरण हो!*
🧾 Order Review (अर्डर समीक्षा)

${orderLines.join("\n")}

// 🛍 तपाईंको अर्डर ${uniqueItems.length} वटा  छ।

📊 Bill Summary
${billHeader}
----------------------------------------------
${billLines.join("\n")}
----------------------------------------------
🚚 *Delivery Charges:* Rs. *${deliveryCharge}*
💰 *Grand Total:* Rs. *${grandTotal}*
----------------------------------------------
📌 Track your order: ${trackOrderUrl}

🙏 Thank you for shopping with us`;

  const encodedMessage = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${admin}&text=${encodedMessage}`;
};
