import React, { useState, forwardRef } from "react";
import "./OrderForm.css";
import { createOrder } from "../../components/orderforfriendcom/order_api/createOrder"; // adjust path
import Carthandler from "../handlers/Carthandler";

const OrderForm = forwardRef(({ orderData = {}, onClose }, ref) => {
  const [phone, setPhone] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  console.log(orderData);

  const city = "Sindhulimadhi"; // default city (optional, server doesn't use it)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!phone || !addressDetail) {
      setErrorMsg("Please fill all required fields.");
      return;
    }

    // Map front-end data to match server model exactly
    const dataToSend = {
      senderName: "Guest", // default for self-order
      senderPhone: null, // default
      receiverName: "Receiver", // default if not passed
      receiverPhone: phone,
      receiverAddress: addressDetail,
      receiverGender: null,
      receiverAgeGroup: null,
      relationship: null,
      message: null,
      occasion: null,
      deliveryCharge: orderData.deliveryChargeFinal || 0,
      totalPrice: orderData.totalPrice || 0,
      itemsOrdered: orderData.cart?.length
        ? orderData.cart.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          }))
        : [
            {
              name: "Default Item",
              price: orderData.totalPrice || 0,
              quantity: 1,
            },
          ],
      giftRange: null,
      giftCost: 0,
    };

    // Debug log
    console.log("📤 Payload being sent:", dataToSend);

    setLoading(true);

    try {
      const response = await createOrder(dataToSend);

      if (response.success) {
        console.log("✅ Order created:", response.data);

        // Clear form
        setPhone("");
        setAddressDetail("");
        localStorage.removeItem("cart");

        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 2000);
      } else {
        setErrorMsg(response.error || "Failed to create order.");
      }
    } catch (err) {
      console.error("❌ Unexpected error:", err.message);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={ref} className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <h2>Place Your Order</h2>

        <form onSubmit={handleSubmit}>
          {errorMsg && <div className="error-msg">⚠ {errorMsg}</div>}

          <label>Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="Enter your phone number"
          />

          <label>City</label>
          <input type="text" value={city} readOnly className="readonly-input" />

          <label>Tol / Place Name</label>
          <textarea
            value={addressDetail}
            onChange={(e) => setAddressDetail(e.target.value)}
            required
            placeholder="Enter your street/tol name, nearby places, or special notes"
          />

          <div className="modal-buttons">
            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Order"}
            </button>
          </div>
        </form>

        {success && (
          <div className="success-popup">
            <h3>✅ Successfully Ordered!</h3>
            <p>Your order is in review. We’ll contact you in a few minutes.</p>
          </div>
        )}
      </div>
    </div>
  );
});

export default OrderForm;
