import React, { useState, useRef, useEffect } from "react";
import "./GiftLandingPage.css";
import axios from "axios";
import DrawerAppBar from "../components/Navbar";
import giftlist from "../data/giftlist.json";
import { useNavigate, useParams } from "react-router-dom";
import { getGiftData } from "../components/orderforfriendcom/order_api/getGiftData";
import PromoCardGiftForFriend from "../components/orderforfriendcom/PromoCardGiftForFriend";
import Footer from "../components/footer";
import isValidUUID from "../tinyfunction/isValidUUID";
import spinSound from "./spinner12.mp3";
import toast from "react-hot-toast";

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

export default function GiftLandingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const wheelRef = useRef(null);
  const spinSoundRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState(null);
  const [showGifts, setShowGifts] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [claimed, setClaimed] = useState(false);
  const [claimAttempts, setClaimAttempts] = useState(() => {
    const savedAttempts = localStorage.getItem(`claimAttempts_${id}`);
    return savedAttempts ? Number(savedAttempts) : 0;
  });

  useEffect(() => {
    if (!id || !isValidUUID(id)) {
      navigate("/order_for_friend/giftpromo");
      return;
    }

    async function fetchOrder() {
      setLoading(true);
      try {
        const data = await getGiftData(id);
        setOrderData(data);
      } catch (err) {
        console.error("Failed to fetch order data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [id, navigate]);

  if (loading) return <p>Loading...</p>;
  if (!orderData) return <PromoCardGiftForFriend />;

// --- Inside GiftLandingPage ---

const filteredGifts = giftlist.filter((gift) => {
  let matches = true;

  // Convert gift price to number
  const giftPrice = Number(gift.price);

  // Price range filter
  if (orderData.giftRange && !isNaN(giftPrice)) {
    const [min, max] = orderData.giftRange.split("-").map(Number);
    matches = giftPrice >= min && giftPrice <= max;
  }
  if (!matches) return false;

  // Age group filter (fallback to 'any')
  const giftAge = gift.ageGroup?.toLowerCase() || "any";
  const receiverAge = orderData.receiverAgeGroup?.toLowerCase() || "any";
  if (receiverAge !== "any") matches = giftAge === receiverAge;
  if (!matches) return false;

  // Gender filter (fallback to 'any')
  const giftGender = gift.gender?.toLowerCase() || "any";
  const receiverGender = orderData.receiverGender?.toLowerCase() || "any";
  if (receiverGender !== "any") matches = giftGender === receiverGender;

  return matches;
});

// Fallback: show all gifts if none matched
const finalGifts = filteredGifts.length > 0 ? filteredGifts : giftlist;


// --- Spin logic ---
const spinWheel = () => {
  if (spinning || claimed || selectedIndex !== null) return;
  setSpinning(true);
  setSelectedIndex(null);

  if (spinSoundRef.current) {
    spinSoundRef.current.currentTime = 0;
    spinSoundRef.current.play().catch(() => {});
  }

  const segments = finalGifts.length;
  const segmentAngle = 360 / segments;
  const randomIndex = Math.floor(Math.random() * segments);
  const extraRounds = 20;
  const rotation =
    360 * extraRounds +
    (360 - (randomIndex * segmentAngle + segmentAngle / 2));

  if (wheelRef.current) {
    wheelRef.current.style.transition =
      "transform 15s cubic-bezier(0.33, 1, 0.68, 1)";
    wheelRef.current.style.transform = `rotate(${rotation}deg)`;
  }

  setTimeout(() => {
    setSelectedIndex(randomIndex);
    setSpinning(false);
    if (spinSoundRef.current) {
      spinSoundRef.current.pause();
      spinSoundRef.current.currentTime = 0;
    }
  }, 15200);
};


  const claimGifthandler = async (giftwon) => {
    if (claimed || !giftwon) return;
    if (claimAttempts >= 2)
      return alert("Maximum attempts reached for claiming the gift.");

    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      const res = await axios.patch(`${apiUrl}/updateGiftWin/${id}`, {
        gift_item: giftwon,
      });
      toast(res.data.message || "Gift claimed successfully!");
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

  // Default fallback values
  const occasion = orderData.occasion || "Special Day";
  const receiverName = orderData.receiverName || "Friend";
  const senderName = orderData.senderName || "Your Well-Wisher";
  const relationship = orderData.relationship || "Someone Special";
  const message =
    orderData.message ||
    "Wishing you happiness, joy, and lots of surprises! We are thrilled to be part of your special moment.";

  return (
    <>
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
                Happy {occasion}, {receiverName}!
              </h1>
              <h3>
                A special wish from {senderName} ({relationship})
              </h3>
              <blockquote>{message}</blockquote>
              <button
                className="view-gifts-btn"
                onClick={() => setShowGifts(true)}
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
>
  {finalGifts.map((gift, i) => {
    const segments = finalGifts.length;
    const segmentAngle = 360 / segments;
    const startAngle = segmentAngle * i - 90;
    const endAngle = startAngle + segmentAngle;
    const midAngle = (startAngle + endAngle) / 2;
    const textRadius = radius * 0.65;
    const rad = (Math.PI / 180) * midAngle;
    const textX = radius + textRadius * Math.cos(rad);
    const textY = radius + textRadius * Math.sin(rad);

    return (
      <g key={gift.id} aria-label={gift.name || "Surprise Gift"}>
        <path
          d={describeArc(radius, radius, radius, startAngle, endAngle)}
          fill={i % 2 === 0 ? "#FFC107" : "#FFEB3B"}
          stroke="#B71C1C"
          strokeWidth="2"
        />
        {gift.image && (
          <image
            href={gift.image}
            x={textX - 50}
            y={textY - 40}
            height="60"
            width="80"
            style={{ pointerEvents: "none", userSelect: "none" }}
            alt={gift.name || "Surprise Gift"}
          />
        )}
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
          Rs {gift.price || "N/A"}
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
                >
                  {spinning ? "Spinning..." : "Spin the Wheel 🎡"}
                </button>
              )}

       {!claimed && selectedIndex !== null && (
  <>
    <section className="gift-details">
      🎁 You won:{" "}
      <strong>{finalGifts[selectedIndex].name || "Surprise Gift"}</strong>
    </section>
    <button
      className="claim-btn"
      onClick={() =>
        claimGifthandler(finalGifts[selectedIndex].name || "Surprise Gift")
      }
      disabled={claimed || claimAttempts >= 3}
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
