// ../../messagecarrier/whatsappsendgift.js

// helper: format currency
// ../../messagecarrier/whatsappsendgift.js

// helper: format currency
function currency(amount) {
  return `Rs. ${Number(amount).toFixed(2)}`;
}

// helper: bill text (BILL FORMAT ONLY)
export function createBillText(orderData, orderid) {
  let subtotal = 0;
  let itemsText = "";

  orderData.itemsOrdered.forEach((it, idx) => {
    const lineTotal = Number(it.quantity) * Number(it.price);
    subtotal += lineTotal;
    itemsText += `${idx + 1}. ${it.name} x ${it.quantity} = ${currency(
      lineTotal
    )}\n`;
  });

  const delivery = orderData.deliveryCharge || 0;
  const giftCost = orderData.giftCost || 0;
  const total = subtotal + delivery + giftCost;

  return `
🧾 *Gift Order Invoice*
──────────────────────────────
📋 Invoice No: ${orderData.orderId || "INV-001"}
📅 Date: ${new Date().toLocaleDateString("ne-NP")}

👤 *Receiver Details*
   • Name: ${orderData.receiverName}
   • Phone: ${orderData.receiverPhone}
   • Age Group: ${orderData.receiverAgeGroup}
   • Gender: ${orderData.receiverGender}
   • Relationship: ${orderData.relationship}

🎁 *Items Ordered*
${itemsText}
🔗 Send link to receiver: www.sindhulibazar.com/order_for_friend/${orderid}
──────────────────────────────
🚚 Delivery Charge: ${currency(delivery)}
🎁 Gift Cost: ${currency(giftCost)}
💰 *Grand Total: ${currency(total)}*
──────────────────────────────

🎉 Occasion: ${orderData.occasion}
💌 Message: ${orderData.message}

🙏 Thank you for choosing us!
  `.trim();
}

// helper: whatsapp link
export function createWhatsAppLink(toPhone, message) {
  const encodedMessage = encodeURIComponent(message);
  let phone = String(toPhone).trim();
  if (phone.startsWith("0")) phone = "977" + phone.slice(1);
  if (!phone.startsWith("977")) phone = "977" + phone;
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

// MAIN function to call
export function sendWhatsAppBill(orderData, orderid) {
  const billText = createBillText(orderData, orderid);
  const waLink = createWhatsAppLink("9703782444", billText);
  window.open(waLink, "_blank");
}

// ../../messagecarrier/whatsappsendgift.js

// helper: format currency
// function currency(amount) {
//   return `Rs. ${Number(amount).toFixed(2)}`;
// }

// // helper: bill text (BILL FORMAT ONLY)
// export function createBillText(orderData, orderid) {
//   let subtotal = 0;
//   let itemsText = "";

//   orderData.itemsOrdered.forEach((it, idx) => {
//     const lineTotal = Number(it.quantity) * Number(it.price);
//     subtotal += lineTotal;
//     itemsText += `${idx + 1}. ${it.name} x ${it.quantity} = ${currency(
//       lineTotal
//     )}\n`;
//   });

//   const delivery = orderData.deliveryCharge || 0;
//   const giftCost = orderData.giftCost || 0;
//   const total = subtotal + delivery + giftCost;

//   return `
// 🧾 *Gift Order Invoice*
// ──────────────────────────────
// 📋 Invoice No: ${orderData.orderId || "INV-001"}
// 📅 Date: ${new Date().toLocaleDateString("ne-NP")}

// 👤 *Receiver Details*
//    • Name: ${orderData.receiverName}
//    • Phone: ${orderData.receiverPhone}
//    • Age Group: ${orderData.receiverAgeGroup}
//    • Gender: ${orderData.receiverGender}
//    • Relationship: ${orderData.relationship}

// 🎁 *Items Ordered*
// ${itemsText}
// 🔗 Send link to receiver: www.sindhulibazar.com/order_for_friend/${orderid}
// ──────────────────────────────
// 🚚 Delivery Charge: ${currency(delivery)}
// 🎁 Gift Cost: ${currency(giftCost)}
// 💰 *Grand Total: ${currency(total)}*
// ──────────────────────────────

// 🎉 Occasion: ${orderData.occasion}
// 💌 Message: ${orderData.message}

// 🙏 Thank you for choosing us!
//   `.trim();
// }

// // helper: viber link
// function createViberLink(toPhone, message) {
//   const encodedMessage = encodeURIComponent(message);
//   let phone = String(toPhone).trim();
//   if (phone.startsWith("0")) phone = "977" + phone.slice(1);
//   if (!phone.startsWith("977")) phone = "977" + phone;
//   return `viber://chat?number=${phone}&text=${encodedMessage}`;
// }

// // MAIN function (name kept same: sendWhatsAppBill) but opens Viber
// export function sendWhatsAppBill(orderData, orderid) {
//   const billText = createBillText(orderData, orderid);
//   const viberLink = createViberLink("9703782444", billText);
//   const newWindow = window.open(viberLink, "_blank");

//   if (!newWindow) {
//     console.warn("⚠ Viber link could not be opened. Check popup blocker.");
//     return false;
//   }
//   return true;
// }
