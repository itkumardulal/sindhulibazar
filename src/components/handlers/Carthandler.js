// Carthandler.js
const Carthandler = (
  cart,
  isNightShift,
  totalPrice,
  setCheckoutMessage,
  setCart
) => {
  const shortenName = (name) => (name.length > 30 ? name.slice(-25) : name);

  // 📝 Review section
  const itemLines = cart.map((item, idx) => {
    const displayName = shortenName(item.name);
    return `${(idx + 1).toString().padEnd(2)}. ${displayName.padEnd(
      25
    )} | Qty: ${item.quantity}`;
  });

  // 📋 Bill section
  const billLines = cart.map((item) => {
    const displayName = shortenName(item.name);
    const totalItemPrice = item.price * item.quantity;
    return `${displayName.padEnd(20)} | ${item.quantity
      .toString()
      .padStart(3)} | Rs.${item.price
      .toString()
      .padStart(6)} | *Rs.${totalItemPrice.toString().padStart(7)}*`;
  });

  // 🧾 Delivery and total
  const uniqueCategories = new Set(cart.map((item) => item.category));
  const deliveryChargePerCategory = isNightShift ? 150 : 50;
  const totalDeliveryCharge = uniqueCategories.size * deliveryChargePerCategory;
  const grandTotal = totalPrice + totalDeliveryCharge;

  const billHeader = `Item                 | Qty | Price   | Total`;
  const billLineSeparator = `----------------------------------------------`;

  const billSummary = `
${billLineSeparator}
🚚 *Delivery Charges:* Rs. *${totalDeliveryCharge}*
💰 *Grand Total:* Rs. *${grandTotal}*
${billLineSeparator}`;

  const storeCountLine = `🛍️ *तपाईंको अर्डर ${uniqueCategories.size} वटा स्टोरबाट आउँदैछ।*`;

  const finalMessage = `
       **नमस्ते, यो मेरो अर्डर विवरण हो!**
🧾 *Order Review (अर्डर समीक्षा)*
\`\`\`
${itemLines.join("\n")}
\`\`\`
${storeCountLine}

📊 *Bill Summary*
\`\`\`
${billHeader}
${billLineSeparator}
${billLines.join("\n")}${billSummary}
\`\`\`
🙏 Thank you for shopping with us!
`;

  setCheckoutMessage(finalMessage);

  setTimeout(() => {
    setCart([]); // Clear cart after 30 seconds
  }, 30000);
};

export default Carthandler;
