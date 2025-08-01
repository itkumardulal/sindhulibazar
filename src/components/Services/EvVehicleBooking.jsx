import React from "react";
import { useNavigate } from "react-router-dom";
import "./EvVehicleBooking.css";

const EvVehicleBooking = () => {
  const navigate = useNavigate();

  // Prevent click bubbling on button and navigate
  const handleClick = (e) => {
    e.stopPropagation();
    navigate("/vehicleinfo");
  };

  return (
    <div
      className="ev-booking-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick(e)}
      aria-label="King Long EV Van offer card"
    >
      {/* Flying stars wrapper */}
      <div className="stars-wrapper" aria-hidden="true">
        <span className="star">★</span>
        <span className="star">★</span>
        <span className="star">★</span>
        <span className="star">★</span>
        <span className="star">★</span>
      </div>

      <div className="ev-booking-content">
        <h2>🚐 सिन्धुलीमा उपलब्ध कमर्शियल EV गाडी: कम खर्च, राम्रो व्यवसाय।</h2>

        <p>
          <strong>Facility:</strong> 30% Downpayment, 70% Finance
        </p>

        <p className="price-info">
          <span className="original-price">NPR 4550000</span> 👉{" "}
          <span className="discounted-price">Now NPR 3,799,000 🎉</span>
        </p>

        <button
          className="ev-booking-btn"
          onClick={handleClick}
          aria-label="Book Now and Claim Offer"
        >
          Book Now & Claim Offer
        </button>
      </div>
    </div>
  );
};

export default EvVehicleBooking;
