import React, { useState, useRef, useEffect } from "react";
import "./GiftLandingPage.css";
import axios from "axios";
import DrawerAppBar from "../components/Navbar";
import giftlist from "../data/giftlist.json";
import { useNavigate, useParams } from "react-router-dom";
import { getGiftData } from "../components/orderforfriendcom/order_api/getGiftData";
import PromoCardGiftForFriend from "../components/orderforfriendcom/PromoCardGiftForFriend";
import Footer from "../components/footer";
import ClaimedGiftAuthModel from "../components/orderforfriendcom/ClaimedGiftAuthModel";
import isValidUUID from "../tinyfunction/isValidUUID";
import { updateGiftWinItem } from "../components/orderforfriendcom/order_api/updateGiftWinItem";

import spinSound from "./spinner12.mp3";
// Wheel radius
const radius = 150;

function describeArc(cx, cy, r, startAngle, endAngle) {
  const rad = Math.PI / 180;
  const x1 = cx + r * Math.cos(rad * startAngle);
  const y1 = cy + r * Math.sin(rad * startAngle);
  const x2 = cx + r * Math.cos(rad * endAngle);
  const y2 = cy + r * Math.sin(rad * endAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  return [
    `M${cx},${cy}`,
    `L${x1},${y1}`,
    `A${r},${r} 0 ${largeArcFlag} 1 ${x2},${y2}`,
    "Z",
  ].join(" ");
}

const handleOrderNow = () => {
  alert("Redirecting to order page...");
};

export default function GiftLandingPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showGifts, setShowGifts] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [claimed, setClaimed] = useState(false);
  const wheelRef = useRef(null);

  // 🎵 audio ref
  const spinSoundRef = useRef(null);

  const [claimAttempts, setClaimAttempts] = useState(() => {
    const savedAttempts = localStorage.getItem(`claimAttempts_${id}`);
    return savedAttempts ? Number(savedAttempts) : 0;
  });

  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [showNoGifts, setShowNoGifts] = useState(false);

  useEffect(() => {
    if (!id) return;

    if (!isValidUUID(id)) {
      navigate("/order_for_friend/giftpromo");
    }

    async function fetchOrder() {
      setLoading(true);
      setError(null);

      try {
        const orderData = await getGiftData(id);
        setOrderData(orderData);
      } catch (err) {
        console.error("❌ Failed to fetch order data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!orderData) return <ClaimedGiftAuthModel onOrderNow={handleOrderNow} />;

  const filteredGifts = giftlist.filter((gift) => {
    let matches = true;

    if (orderData.receiverAgeGroup) {
      matches =
        matches &&
        gift.ageGroup.toLowerCase() ===
          orderData.receiverAgeGroup.toLowerCase();
    }

    if (orderData.receiverGender) {
      matches =
        matches &&
        gift.gender.toLowerCase() === orderData.receiverGender.toLowerCase();
    }

    if (orderData.giftRange) {
      const [min, max] = orderData.giftRange.split("-").map(Number);
      matches = matches && gift.price >= min && gift.price <= max;
    }

    return matches;
  });

  const spinWheel = () => {
    if (spinning || claimed || selectedIndex !== null) return;
    setSpinning(true);
    setSelectedIndex(null);

    // 🎵 Play spin sound
    if (spinSoundRef.current) {
      spinSoundRef.current.currentTime = 0;
      spinSoundRef.current.play().catch((err) => {
        console.warn("Sound play blocked:", err);
      });
    }

    const segments = filteredGifts.length;
    const segmentAngle = 360 / segments;
    const randomIndex = Math.floor(Math.random() * segments);
    const extraRounds = 20; // enough for 15s spin

    const rotation =
      360 * extraRounds +
      (360 - (randomIndex * segmentAngle + segmentAngle / 2));

    if (wheelRef.current) {
      wheelRef.current.style.transition =
        "transform 15s cubic-bezier(0.33, 1, 0.68, 1)"; // 15 seconds spin
      wheelRef.current.style.transform = `rotate(${rotation}deg)`;
    }

    setTimeout(() => {
      setSelectedIndex(randomIndex);
      setSpinning(false);

      // 🎵 Stop sound when spin ends
      if (spinSoundRef.current) {
        spinSoundRef.current.pause();
        spinSoundRef.current.currentTime = 0;
      }
    }, 15200); // slightly more than 15s for safety
  };

  const claimGifthandler = async (giftwon) => {
    if (claimed || giftwon === null) return;

    if (claimAttempts >= 2) {
      alert(
        "You have reached the maximum number of attempts for claiming this gift."
      );
      return;
    }

    const giftName = giftwon;
    const orderId = id;
    const apiUrl = process.env.REACT_APP_API_URL;

    try {
      const res = await axios.patch(`${apiUrl}/updateGiftWin/${orderId}`, {
        gift_item: giftName,
      });

      alert(res.data.message || "Gift claimed successfully!");
      setClaimed(true);

      const newAttempts = claimAttempts + 1;
      setClaimAttempts(newAttempts);
      localStorage.setItem(`claimAttempts_${id}`, newAttempts);
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Failed to update gift. Please try again."
      );
      const newAttempts = claimAttempts + 1;
      setClaimAttempts(newAttempts);
      localStorage.setItem(`claimAttempts_${id}`, newAttempts);
    }
  };

  return (
    <>
      {/* 🎵 Spin sound (hidden) */}
      <audio ref={spinSoundRef} src={spinSound} preload="auto" />

      <DrawerAppBar>
        <div
          className="gift-landing-page"
          role="main"
          aria-label="Gift Landing Page"
        >
          {!showGifts ? (
            <section className="wish-section fade-in">
              <h1>
                Happy {orderData.occasion}, {orderData.receiverName}!
              </h1>
              <h3>
                A special wish from {orderData.senderName} (
                {orderData.relationship})
              </h3>
              <blockquote>
                {orderData.message || "No message provided."}
              </blockquote>
              <button
                className="view-gifts-btn"
                onClick={() => setShowGifts(true)}
                aria-label="View Gifts"
              >
                View Gifts 🎁
              </button>
            </section>
          ) : (
            <section className="gift-section fade-in">
              {!claimed && (
                <section className="wheel-container" aria-label="Gift spinner">
                  <svg
                    width={radius * 2}
                    height={radius * 2}
                    viewBox={`0 0 ${radius * 2} ${radius * 2}`}
                    ref={wheelRef}
                    className={`wheel-svg ${spinning ? "spinning" : ""} ${
                      claimed ? "claimed" : ""
                    }`}
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {filteredGifts.map((gift, i) => {
                      const segments = filteredGifts.length;
                      const segmentAngle = 360 / segments;
                      const startAngle = segmentAngle * i - 90;
                      const endAngle = startAngle + segmentAngle;

                      const midAngle = (startAngle + endAngle) / 2;
                      const textRadius = radius * 0.65;
                      const rad = (Math.PI / 180) * midAngle;
                      const textX = radius + textRadius * Math.cos(rad);
                      const textY = radius + textRadius * Math.sin(rad);

                      return (
                        <g
                          key={gift.id}
                          aria-label={gift.name}
                          tabIndex={-1}
                          className={
                            i === selectedIndex ? "selected-segment" : ""
                          }
                        >
                          <path
                            d={describeArc(
                              radius,
                              radius,
                              radius,
                              startAngle,
                              endAngle
                            )}
                            fill={i % 2 === 0 ? "#FFC107" : "#FFEB3B"}
                            stroke="#B71C1C"
                            strokeWidth="2"
                          />
                          <image
                            href={gift.image}
                            x={textX - 50}
                            y={textY - 40}
                            height="60"
                            width="80"
                            style={{
                              pointerEvents: "none",
                              userSelect: "none",
                            }}
                            alt={gift.name}
                          />
                          <rect
                            x={textX - 20}
                            y={textY - 40}
                            width="30"
                            height="80"
                            fill="rgba(23, 95, 5, 0.66)"
                            rx="6"
                            ry="6"
                          />
                          <text
                            x={textX}
                            y={textY - 10}
                            fill="#fff"
                            fontSize="12"
                            fontWeight="600"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{ userSelect: "none" }}
                            transform={`rotate(-90, ${textX}, ${textY})`}
                          >
                            {gift.name}
                          </text>
                          <text
                            x={textX}
                            y={textY + 10}
                            fill="#fff"
                            fontSize="6.5"
                            fontWeight="500"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{ userSelect: "none" }}
                            transform={`rotate(-90, ${textX}, ${textY + 10})`}
                          >
                            Rs {gift.price}
                          </text>
                        </g>
                      );
                    })}
                    <circle
                      cx={radius}
                      cy={radius}
                      r={40}
                      fill="#B71C1C"
                      stroke="#FFC107"
                      strokeWidth="4"
                    />
                  </svg>
                  <span className="pointer" aria-hidden="true" />
                </section>
              )}

              {!claimed && selectedIndex === null && (
                <button
                  onClick={spinWheel}
                  className="spin-btn"
                  disabled={spinning}
                  aria-disabled={spinning}
                >
                  {spinning ? "Spinning..." : "Spin the Wheel 🎡"}
                </button>
              )}

              {!claimed && selectedIndex !== null && (
                <>
                  <section
                    className="gift-details"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    🎁 You won:{" "}
                    <strong>{filteredGifts[selectedIndex].name}</strong>
                  </section>
                  <button
                    className="claim-btn"
                    onClick={() =>
                      claimGifthandler(filteredGifts[selectedIndex].name)
                    }
                    disabled={claimed || claimAttempts >= 3}
                    aria-disabled={claimed || claimAttempts >= 3}
                  >
                    {claimAttempts >= 2
                      ? "Max Attempts Reached"
                      : claimed
                      ? "Gift Claimed"
                      : "Claim My Gift"}
                  </button>
                </>
              )}

              {claimed && (
                <section
                  className="celebration full-celebration"
                  role="alert"
                  aria-live="assertive"
                  style={{ textAlign: "center" }}
                >
                  <div className="confetti-container">
                    {[...Array(30)].map((_, i) => (
                      <div key={i} className="confetti"></div>
                    ))}
                  </div>
                  <h2>🎉 Congratulations! 🎉</h2>
                  <p>
                    You will receive your package soon. Thank you for claiming
                    your gift!
                  </p>
                  <button
                    onClick={() => (window.location.href = "/home")}
                    style={{
                      marginTop: "20px",
                      padding: "10px 20px",
                      backgroundColor: "#ff9800",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  >
                    Continue to Website
                  </button>
                </section>
              )}
            </section>
          )}
        </div>
      </DrawerAppBar>
      <Footer />
    </>
  );
}
