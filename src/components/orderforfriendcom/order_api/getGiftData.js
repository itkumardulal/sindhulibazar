const API_URL = process.env.REACT_APP_API_URL;

export async function getGiftData(id) {
//id is avalable here check alreasdy 
  if (!id) throw new Error("Order ID is required");

  try {
    const res = await fetch(`${API_URL}/getGiftData/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check for non-OK HTTP response early to avoid JSON parse errors
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to fetch gift data (status ${res.status})`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching gift data:", err.message);
    throw err;
  }
}
