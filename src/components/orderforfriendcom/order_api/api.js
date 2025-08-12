const API_URL = process.env.REACT_APP_API_URL;

export async function fetchOrderById(id) {
  if (!id) throw new Error("Order ID is required");

  const res = await fetch(`${API_URL}/getGiftData/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.error || "Failed to fetch order data");
  }

  return await res.json();
}
