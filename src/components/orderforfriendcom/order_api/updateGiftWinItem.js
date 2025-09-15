import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL; // your backend URL

/**
 * Updates the user's claimed gift on the server
 * @param {string} orderId - The order ID
 * @param {string} giftName - Name of the gift
 * @param {number|string} price - Price of the gift
 * @param {number} whatsappTries - Number of WhatsApp tries
 * @returns {Promise<Object|null>} - Server response or null if request skipped
 */
export async function updateGiftWinItem({ orderId, giftName, price, whatsappTries = 6 }) {
  console.log(orderId, price, giftName, whatsappTries, "📤 Preparing gift update request");

 const MAX_WHATSAPP_TRIES = 5;

if (!orderId || !giftName || price == null || whatsappTries > MAX_WHATSAPP_TRIES) {
  throw new Error(
    "orderId, giftName, and price are required, or WhatsApp tries exceeded limit"
  );
}

  // Only proceed if WhatsApp tries are 5 or less
  if (whatsappTries < 5) {
    console.warn("❗ WhatsApp tries exceeded limit, request skipped");
    return null; // Don't send request
  }

  try {
    const response = await axios.put(`${API_URL}/updateGiftWin`, {
      id: orderId,
      giftName,
      price,
      whatsappTries,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Failed to update gift win:", error.response || error.message);
    throw error;
  }
}
