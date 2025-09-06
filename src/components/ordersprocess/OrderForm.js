import React, { useState, forwardRef } from "react";
import "./OrderForm.css";

const OrderForm = forwardRef(({ orderData, onClose }, ref) => {
  const [phone, setPhone] = useState("");
  const [addressDetail, setAddressDetail] = useState(""); // tol / place
  const [success, setSuccess] = useState(false);
  const city = "Sindhulimadhi"; // default city

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      phone,
      city,
      addressDetail,
      notes: addressDetail, // optional: if you want separate notes field
      ...orderData,
    };
    console.log("Order submitted:", data);

    // Clear form
    setPhone("");
    setAddressDetail("");

    // Remove cart data from localStorage
    localStorage.removeItem("cart");

    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div ref={ref} className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <h2>Place Your Order</h2>

        <form onSubmit={handleSubmit}>
          <label>Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="Enter your phone number"
          />

          <label>City</label>
          <input
            type="text"
            value={city}
            readOnly
            className="readonly-input"
          />

          <label>Tol / Place Name</label>
          <textarea
            value={addressDetail}
            onChange={(e) => setAddressDetail(e.target.value)}
            required
            placeholder="Enter your street/tol name, nearby places, or special notes"
          ></textarea>

          <div className="modal-buttons">
            <button type="submit">Submit Order</button>
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
