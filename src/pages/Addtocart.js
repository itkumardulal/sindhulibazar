import React, { useContext, useEffect, useState } from "react";
import "./AddToCart.css";
import DrawerAppBar from "../components/Navbar";
import WhatsAppMessageLink from "../messagecarrier/Whatsappme";
import WhatsAppmebulk from "../messagecarrier/WhatsAppmebulk";
import { CartContext } from "../context/CartContext";
import Carthandler from "../components/handlers/Carthandler";
import GiftPreInstructModel from "../components/orderforfriendcom/GiftPreInstructModel";

const   AddToCart = () => {
  const { cart, setCart } = useContext(CartContext);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [isNightShift, setIsNightShift] = useState(false);
  const [deliveryChargeFinal, setDeliveryChargeFinal] = useState(50);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);


  useEffect(() => {
    const currentHour = new Date().getHours();
    setIsNightShift(currentHour >= 20 || currentHour < 6);
  }, []);

  useEffect(() => {
    const itemCount = cart.reduce(
      (total, item) => total + (item.quantity || 1),
      0
    );
    setTotalItems(itemCount);

    const priceSum = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const deliveryChargePerCategory = isNightShift ? 150 : 50;
    const uniqueCategories = new Set(cart.map((item) => item.category));
    const deliveryCharge = uniqueCategories.size * deliveryChargePerCategory;

    setDeliveryChargeFinal(deliveryCharge);
    setTotalPrice(priceSum + deliveryCharge);
  }, [cart, isNightShift]);

  const increment = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.cartId === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.cartId === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCart((prev) => prev.filter((item) => item.cartId !== id));
  };

  const handleCheckoutAll = () => {
    Carthandler(
      cart,
      isNightShift,
      totalPrice - deliveryChargeFinal,
      setCheckoutMessage,
      setCart
    );
  };
  const handleSendGift = () => {


    //form open 

    //here the checkout message is created inside carthandler
    // Carthandler(
      
    //   cart,
    //   isNightShift,
    //   totalPrice - deliveryChargeFinal,
    //   setCheckoutMessage,
    //   setCart
    // );
     setIsGiftModalOpen(true);
  };
  

  return (
    <>
      <DrawerAppBar />

      <div className="cart-container">
        <h2>Shopping Cart</h2>
        <h4 style={{ padding: 5 }}>{totalItems} items for checkout</h4>

        {cart.length === 0 ? (
          <span>Your cart is empty.</span>
        ) : (
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.cartId}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <span className="cart-item-price">Category: {item.category}</span>
                    <span className="cart-item-price">Price: Rs. {item.price}</span>
                    <span
                      style={{
                        backgroundColor: "yellow",
                        width: "150px",
                        height: "20px",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        borderRadius: "5px",
                        fontSize: "13px",
                      }}
                    >
                      Total Price: Rs. {item.price * item.quantity}
                    </span>
                    <div
                      style={{
                        display: "flex",
                        width: "80px",
                        justifyContent: "space-between",
                      }}
                    >
                      <button
                        className="buy-now-button"
                        onClick={() => decrement(item.cartId)}
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        className="buy-now-button"
                        onClick={() => increment(item.cartId)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "5px",
                      padding: "5px",
                      justifyContent: "space-around",
                    }}
                  >
                    <button
                      className="buy-now-button"
                      style={{ backgroundColor: "red" }}
                      onClick={() => handleRemove(item.cartId)}
                    >
                      Remove
                    </button>
                    <WhatsAppMessageLink
                      orderDetails={{
                        name: item.name,
                        price: item.price,
                        count: item.quantity,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              backgroundColor: "#f0f0f0",
              borderRadius: "5px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                textAlign: "left",
                backgroundColor: "#fff",
                padding: "15px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                lineHeight: "1.6",
                fontSize: "16px",
              }}
            >
              <h4
                style={{
                  marginBottom: "10px",
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "8px",
                }}
              >
                🧾 <strong>Order Summary</strong>
              </h4>
              <div>
                <strong>Delivery Charges:</strong> Rs. {deliveryChargeFinal}
              </div>
              <div>
                <strong>Total Amount (incl. delivery):</strong> Rs. {totalPrice}
              </div>
              <hr style={{ margin: "12px 0" }} />
              <div style={{ fontSize: "14px", color: "#555" }}>
                📌 <strong>Note:</strong>
                <br />- We deliver <strong>food and liquor</strong> at night
                too.
                <br />- <strong>Grocery and Bakery</strong> are not available
                for delivery after 8 PM.
                <br />- Delivery charge is based on number of store categories:
                <ul style={{ marginTop: "5px", paddingLeft: "20px" }}>
                  <li>Rs. 50 per category (Day Shift)</li>
                  <li>Rs. 120 per category (Night Shift)</li>
                </ul>
              </div>
            </div>

          <button
  className="checkout-all-button"
  style={{
    backgroundColor: "#9e9e9e", // gray to indicate disabled
    color: "white",
    padding: "20px 50px",
    borderRadius: "5px",
    cursor: "not-allowed",
    marginTop: "10px",
    width: "100%",
    position: "relative",
    overflow: "hidden",
  }}
  disabled
>
  {/* Animated gradient or shimmer effect */}
  <span
    style={{
      position: "absolute",
      top: 0,
      left: "-100%",
      width: "200%",
      height: "100%",
      background:
        "linear-gradient(120deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.2) 100%)",
      animation: "shine 2s infinite",
      pointerEvents: "none",
    }}
  ></span>
  Send as Gift to Friend (Coming Soon)
</button>

{/* Add this CSS in your global CSS or a <style> tag */}
<style>
  {`
    @keyframes shine {
      0% { left: -100%; }
      100% { left: 100%; }
    }
  `}
</style>

            {isGiftModalOpen && ( console.log(totalPrice, deliveryChargeFinal, totalItems, cart),<GiftPreInstructModel
  orderData={{
    totalPrice,
    deliveryChargeFinal,
    totalItems,
   cart
  }}
    onClose={() => setIsGiftModalOpen(false)}
  />
)}

            <button
              className="checkout-all-button"
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "20px 50px",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
                width: "100%",
              }}
              onClick={handleCheckoutAll}
            >
              Order for myself
            </button>
                

            {checkoutMessage && <WhatsAppmebulk message={checkoutMessage} />}
          </div>
        )}
      </div>
    </>
  );
};

export default AddToCart;
