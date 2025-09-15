const Carthandler = (
  cart = [],
  isNightShift,
  totalPrice,
  setCheckoutMessage,
  setCart
) => {
  const shortenName = (name) =>
    name.length > 30 ? name.slice(0, 25) + "..." : name;

  // 📝 Order Review section
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

  // 🧾 Delivery charge logic based on total quantity
  const baseDelivery = isNightShift ? 120 : 50;
  const extraCharge = totalPrice > 1 ? (isNightShift ? 50 : 15) : 0;

  // calculate total quantity
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const deliveryCharge = baseDelivery + (totalQuantity > 1 ? extraCharge : 0);
  const grandTotal = totalPrice + deliveryCharge;

  // Unique stores count
  const uniqueStores = new Set(cart.map((item) => item.category)).size;

  const billHeader = `Item                 | Qty | Price   | Total`;
  const billLineSeparator = `----------------------------------------------`;

  const storeCountLine = `🛍️ तपाईंको अर्डर ${uniqueStores} वटा स्टोरबाट आउँदैछ।`;

  const billSummary = `
${billLineSeparator}
🚚 *Delivery Charges:* Rs. *${deliveryCharge}*
💰 *Grand Total:* Rs. *${grandTotal}*
${billLineSeparator}`;

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
${billLines.join("\n")}
${billSummary}
\`\`\`
🙏 Thank you for shopping with us!
`;

  setCheckoutMessage(finalMessage);

  // Optionally clear cart after order
  setTimeout(() => {
    setCart([]);
  }, 30000);
};

export default Carthandler;
