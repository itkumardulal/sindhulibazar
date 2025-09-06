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
      return { success: false, error: errData.error || "Failed to create order" };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (err) {
    console.error("❌ Order creation failed:", err.message);
    return { success: false, error: err.message || "Failed to create order" };
  }
}
