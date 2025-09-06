import React, { useState, forwardRef } from "react";
import "./OrderForm.css";
import { createOrder } from "../../components/orderforfriendcom/order_api/createOrder";
// import Carthandler from "../handlers/Carthandler";
import { useNavigate } from "react-router-dom";

const OrderForm = forwardRef(({ orderData = {}, onClose }, ref) => {
  const [phone, setPhone] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  // console.log("📥 orderData received:", orderData);
  const navigate = useNavigate();
  const city = "Sindhulimadhi"; // default city

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!phone || !addressDetail) {
      setErrorMsg("Please fill all required fields.");
      return;
    }

    // Decide whether to use cart or single order
    let itemsOrdered = [];

    if (orderData.cart?.length) {
      itemsOrdered = orderData.cart.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));
    } else if (orderData.name && orderData.price) {
      itemsOrdered = [
        {
          name: orderData.name,
          price: orderData.price,

          quantity: orderData.count || 1,
        },
      ];
    } else {
      itemsOrdered = [
        {
          name: "Default Item",
          price: orderData.totalPrice || 0,
          quantity: 1,
        },
      ];
    }

    // Build payload
    const uniqueId = `order-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newtotalPrice =
      Number(orderData.price) + Number(orderData.shiftValue);

    const dataToSend = {
      id: uniqueId,
      createdAt: new Date().toISOString(), // add timestamp
      senderName: "Guest",
      senderPhone: null,
      receiverName: receiverName,
      receiverPhone: phone,
      receiverAddress: addressDetail,
      receiverGender: null,
      receiverAgeGroup: null,
      relationship: null,
      message: null,
      occasion: null,
      deliveryCharge:
        orderData.deliveryChargeFinal || orderData.shiftValue || 0,
      totalPrice: orderData.totalPrice || newtotalPrice || 0,

      itemsOrdered,
      giftRange: null,
      giftCost: 0,
    };

    console.log("📤 Payload being sent:", dataToSend);

    setLoading(true);

    try {
      const response = await createOrder(dataToSend);

      if (response.success) {
        console.log("✅ Order created:", response.data);

        // Clear form fields
        setPhone("");
        setAddressDetail("");
        localStorage.removeItem("cart");

        // Store order in localStorage
        // Store order in localStorage
        let existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
        existingOrders.push(dataToSend);

        // If more than 5 orders, remove all previous orders
        if (existingOrders.length > 5) {
          existingOrders = [dataToSend]; // keep only the current order
        }

        localStorage.setItem("orders", JSON.stringify(existingOrders));

        setSuccess(true);

        // Delay before closing modal and reload
        setTimeout(() => {
          setSuccess(false);
          onClose();
          navigate("/myorders"); // ✅ navigate to All Orders page
          // window.location.reload();
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
          <label>Receiver Name</label>
          <input
            type="text"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            required
            placeholder="Enter receiver's name"
          />
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
