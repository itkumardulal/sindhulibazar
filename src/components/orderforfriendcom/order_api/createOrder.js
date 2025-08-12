const API_ORDER_URL = process.env.REACT_APP_API_URL;


export async function createOrder(orderData) {
  try {
    const res = await fetch(`${API_ORDER_URL}/create_order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || "Failed to create order");
    }

    return await res.json();
  } catch (err) {
    console.error("❌ Order creation failed:", err.message);
    throw err;
  }
}