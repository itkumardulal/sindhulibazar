// src/messagecarrier/WhatsappUtils.js
export const generateWhatsAppLink = ({ name, price, count = 1, orderId }) => {
  const currentHour = new Date().getHours();
  const isDay = currentHour >= 8 && currentHour < 20;
  const currentShift = isDay ? "Day Shift" : "Night Shift";
  const admin = "+9779703782444";
  const deliveryCharge = isDay ? 50 : 120;

  const totalCost = price * count + deliveryCharge;

  const trackOrderUrl = `https://www.sindhulibazar.com/myorders`;

  const message = `नमस्ते, यो मेरो अर्डर विवरण हो !

\`\`\`
Shift:        ${currentShift}
----------------------------------------
Item Name     | Quantity | Price/piece
----------------------------------------
${name.padEnd(12)} | ${String(count).padEnd(8)} | Rs.${String(price).padEnd(10)}
----------------------------------------
Delivery Charge: Rs.${deliveryCharge}
Total Price:    Rs.${totalCost}
📌 Track your order: ${trackOrderUrl}
\`\`\`
`;

  return `https://api.whatsapp.com/send?phone=${admin}&text=${encodeURIComponent(
    message
  )}`;
};
