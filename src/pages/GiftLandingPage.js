import React, { useState, useRef ,useEffect} from "react";
import "./GiftLandingPage.css";
import DrawerAppBar from "../components/Navbar";
import giftlist from "../data/giftlist.json"; 
import { useNavigate } from "react-router-dom";
// import giftImages from "../data/spinnergiftitems.json";
import { useParams } from 'react-router-dom';
import { getGiftData } from "../components/orderforfriendcom/order_api/getGiftData";
import PromoCardGiftForFriend from "../components/orderforfriendcom/PromoCardGiftForFriend";
import Footer from "../components/footer";
import ClaimedGiftAuthModel from "../components/orderforfriendcom/ClaimedGiftAuthModel";
import isValidUUID from "../tinyfunction/isValidUUID";
import { updateGiftWinItem } from "../components/orderforfriendcom/order_api/updateGiftWinItem";
//orderforfrnfcom updated


// const data = {
//   id: "eea58c73-ccf3-45c2-b29c-b9b8f84c0423",
//   senderName: "John Doe",
//   receiverName: "Jane Smith",
//   relationship: "Best Friend",
//   message: "Happy Birthday Jane! Wishing you all the best 🎉",
//   occasion: "Birthday",
//   itemsOrdered: [
//     { name: "Perfume Gift Set", quantity: 1, price: "1500.00" },
//     { name: "Spa Voucher", quantity: 1, price: "2500.00" },
//     { name: "Chocolate Box", quantity: 1, price: "500.00" },
//     { name: "Book Collection", quantity: 1, price: "1200.00" },
//     { name: "Gift Card", quantity: 1, price: "1000.00" },
//     { name: "Coffee Mug", quantity: 1, price: "300.00" },
//   ],
//   claimed: false,
//   claimedAt: null,
// };


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
    // navigate to order page or open modal
    alert("Redirecting to order page...");
  };
export default function GiftLandingPage() {
   const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showGifts, setShowGifts] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [claimed, setClaimed] = useState(false);
    // const [isValid, setIsValid] = useState(null);
  const wheelRef = useRef(null);

  // const [filteredGifts, setFilteredGifts] = useState(giftlist); // example


const navigate = useNavigate();
// const gifts = Object.entries(orderData.image).map(([name, img]) => ({
//   name,
//   img
// }));


  const [orderData, setOrderData] = useState(null);
 const [showNoGifts, setShowNoGifts] = useState(false);



   const handleCheckGifts = () => {
    // your logic; if none:
    setShowNoGifts(true);
  };

// 1️⃣ ID validation function
// function isValidUUID(id) {
//   // UUID v4 regex
//   const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
//   return uuidV4Regex.test(id);
// }

// 2️⃣ Updated useEffect with validation
useEffect(() => {
  if (!id) return;

  // Validate ID first
  if (!isValidUUID(id)) {
     navigate("/order_for_friend/giftpromo");
    // console.warn("❌ Invalid order ID, skipping API request:", id);
    // setError("Invalid order ID format."); // optional
    // return; // stops execution, will render PromoCardGiftForFriend
  }

  async function fetchOrder() {
    setLoading(true);
    setError(null);

    try {
      const orderData = await getGiftData(id);
      setOrderData(orderData);
    
    } catch (err) {
      console.error("❌ Failed to fetch order data:", err);
      // setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  fetchOrder();
}, [id]);

// 3️⃣ Render logic remains the same
if (loading) return <p>Loading...</p>;
// if (!isValidUUID(id)) return <PromoCardGiftForFriend onOrderNow={handleOrderNow} />;
if (!orderData) return <ClaimedGiftAuthModel onOrderNow={handleOrderNow} />;

  console.log("gfhsddjkfhkdjhfdjk",orderData.giftRange,orderData)

// setSelectedAgeGroup(orderData.ageGroup)
  ////filter giftitem as per user has send data gender,agea and price range
const filteredGifts = giftlist.filter((gift) => {
  let matches = true;

  if (orderData.receiverAgeGroup) {
    matches =
      matches &&
      gift.ageGroup.toLowerCase() === orderData.receiverAgeGroup.toLowerCase();
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


// console.log(orderData)
  const spinWheel = () => {
    if (spinning || claimed || selectedIndex !== null) return;
    setSpinning(true);
    setSelectedIndex(null);

    const segments = filteredGifts.length;
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

const claimGift = async (index) => {

  if (claimed || index === null) return;

  setClaimed(true);

  // try {
  //   const gift = filteredGifts[index]; // get the gift based on clicked index
  //   // console.log(id, gift.name,gift.price)
  //    // call API
  //    await updateGiftWinItem({
  //     orderId: id,
  //     giftName: gift.name,
  //     price: gift.price,
  //   });
  //   // console.log("✅ Gift claimed successfully:", gift.name,id);
  // } catch (err) {
  //   console.error("❌ Error claiming gift:", err);
  //   setError("Failed to claim gift. Please try again.");
  //   setClaimed(false); // revert claimed state if API fails
  // }
};


  return (
    <>
      <DrawerAppBar>
  
        <div className="gift-landing-page" role="main" aria-label="Gift Landing Page">
          {!showGifts ? (
            <section className="wish-section fade-in">
              <h1>
                Happy {orderData.occasion}, {orderData.receiverName}!
              </h1>
              <h3>
                A special wish from {orderData.senderName} ({orderData.relationship})
              </h3>
              <blockquote>{orderData.message || "No message provided."}</blockquote>
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
  className={i === selectedIndex ? "selected-segment" : ""}
>
  {/* Segment path */}
  <path
    d={describeArc(radius, radius, radius, startAngle, endAngle)}
    fill={i % 2 === 0 ? "#FFC107" : "#FFEB3B"}
    stroke="#B71C1C"
    strokeWidth="2"
  />

  {/* Gift Image */}
  <image
    href={gift.image}
    x={textX - 50}  
    y={textY - 40}  
    height="60"
    width="80"
    style={{ pointerEvents: "none", userSelect: "none" }}
    alt={gift.name}
  />

  {/* Background rectangle for text */}
  <rect
    x={textX - 20}           // center around text
    y={textY - 40}           // start above to cover both name & price
    width="30"                // narrow for vertical line
    height="80"               // enough for name + price
    fill="rgba(23, 95, 5, 0.66)"
    rx="6"
    ry="6"
  />

  {/* Gift Name */}
<text
  x={textX}
  y={textY - 10}          // adjust vertical position
  fill="#fff"
  fontSize="12"
  fontWeight="600"
  textAnchor="middle"
  dominantBaseline="middle"
  pointerEvents="none"
  style={{ userSelect: "none" }}
  transform={`rotate(-90, ${textX}, ${textY})`}  // rotate around center
>
  {gift.name}
</text>

<text
  x={textX}
  y={textY + 10}          // adjust below the name
  fill="#fff"
  fontSize="6.5"
  fontWeight="500"
  textAnchor="middle"
  dominantBaseline="middle"
  pointerEvents="none"
  style={{ userSelect: "none" }}
  transform={`rotate(-90, ${textX}, ${textY + 10})`}
>
  Rs {gift.price}
</text>


  {/* Gift Price */}
  {/* <text
    x={textX}
    y={textY + 10}  // second line inside rect
    fill="#fff"
    fontSize="12"
    fontWeight="500"
    textAnchor="middle"
    dominantBaseline="middle"
    pointerEvents="none"
    style={{ userSelect: "none" }}
  >
    Rs {gift.price}
  </text> */}
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
                    🎁 You won: <strong>{filteredGifts[selectedIndex].name}</strong>
                  </section>
                  <button
                    className="claim-btn"
                    onClick={() => claimGift(selectedIndex)}
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
      <div>User ID is: {id}</div>
      <Footer />
    </>
  );
}
