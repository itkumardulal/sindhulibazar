const API_URL = process.env.REACT_APP_API_URL;

export async function getGiftData(id) {
  if (!id) throw new Error("Order ID is required");

  try {
    const res = await fetch(`${API_URL}/getGiftData`, {
      method: "POST",               // Use POST method
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }), // Send id in request body as JSON
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || "Failed to fetch gift data");
    }

    const data = await res.json();
    console.log(data);
    return data;

  } catch (err) {
    console.error("❌ Fetching gift data failed:", err.message);
    throw err;
  }
}
