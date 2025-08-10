import React, { useState, useRef } from "react";
import "./GiftLandingPage.css";
import DrawerAppBar from "../components/Navbar";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import giftImages from "../data/spinnergiftitems.json";

const data = {
  id: "eea58c73-ccf3-45c2-b29c-b9b8f84c0423",
  senderName: "John Doe",
  receiverName: "Jane Smith",
  relationship: "Best Friend",
  message: "Happy Birthday Jane! Wishing you all the best 🎉",
  occasion: "Birthday",
  itemsOrdered: [
    { name: "Perfume Gift Set", quantity: 1, price: "1500.00" },
    { name: "Spa Voucher", quantity: 1, price: "2500.00" },
    { name: "Chocolate Box", quantity: 1, price: "500.00" },
    { name: "Book Collection", quantity: 1, price: "1200.00" },
    { name: "Gift Card", quantity: 1, price: "1000.00" },
    { name: "Coffee Mug", quantity: 1, price: "300.00" },
  ],
  claimed: false,
  claimedAt: null,
};





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


  const [showGifts, setShowGifts] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [claimed, setClaimed] = useState(false);
  const wheelRef = useRef(null);
      const navigate = useNavigate();
const gifts = Object.entries(giftImages).map(([name, img]) => ({
  name,
  img
}));

  const spinWheel = () => {
    if (spinning || claimed || selectedIndex !== null) return;
    setSpinning(true);
    setSelectedIndex(null);

    const segments = gifts.length;
    const segmentAngle = 360 / segments;
    const randomIndex = Math.floor(Math.random() * segments);
    const extraRounds = 6;

    const rotation =
      360 * extraRounds + (360 - (randomIndex * segmentAngle + segmentAngle / 2));

    if (wheelRef.current) {
      wheelRef.current.style.transition = "transform 5s cubic-bezier(0.33, 1, 0.68, 1)";
      wheelRef.current.style.transform = `rotate(${rotation}deg)`;
    }

    setTimeout(() => {
      setSelectedIndex(randomIndex);
      setSpinning(false);
    }, 5200);
  };

  const claimGift = () => {
    if (claimed || selectedIndex === null) return;
    setClaimed(true);
  };

  return (
    <>
      <DrawerAppBar>
        <div className="gift-landing-page" role="main" aria-label="Gift Landing Page">
          {!showGifts ? (
            <section className="wish-section fade-in">
              <h1>
                Happy {data.occasion}, {data.receiverName}!
              </h1>
              <h3>
                A special wish from {data.senderName} ({data.relationship})
              </h3>
              <blockquote>{data.message || "No message provided."}</blockquote>
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
                    className={`wheel-svg ${spinning ? "spinning" : ""} ${claimed ? "claimed" : ""}`}
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {gifts.map((gift, i) => {
                      const segments = gifts.length;
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
                          key={i}
                          aria-label={gift.name}
                          tabIndex={-1}
                          className={i === selectedIndex ? "selected-segment" : ""}
                        >
                          <path
                            d={describeArc(radius, radius, radius, startAngle, endAngle)}
                            fill={i % 2 === 0 ? "#FFC107" : "#FFEB3B"}
                            stroke="#B71C1C"
                            strokeWidth="2"
                          />
                          <image
                            href={gift.img}
                            x={textX - 25}
                            y={textY - 50}
                            height="50"
                            width="50"
                            style={{ pointerEvents: "none", userSelect: "none" }}
                            alt={gift.name}
                          />
                          <text
                            x={textX}
                            y={textY + 15}
                            fill="#7F0000"
                            fontSize="12"
                            fontWeight="700"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            pointerEvents="none"
                            style={{ userSelect: "none" }}
                          >
                            {gift.name}
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
                  <section className="gift-details" aria-live="polite" aria-atomic="true">
                    🎁 You won: <strong>{gifts[selectedIndex].name}</strong>
                  </section>
                  <button
                    className="claim-btn"
                    onClick={claimGift}
                    disabled={claimed}
                    aria-disabled={claimed}
                  >
                    Claim My Gift
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
    <p>You will receive your package soon. Thank you for claiming your gift!</p>

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
