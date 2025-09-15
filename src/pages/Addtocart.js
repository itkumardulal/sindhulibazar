// src/pages/AddToCart.js
import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AddToCart.css";
import DrawerAppBar from "../components/Navbar";
import { generateWhatsAppLink } from "../messagecarrier/Whatsappme";
import WhatsAppmebulk from "../messagecarrier/WhatsAppmebulk";
import { CartContext } from "../context/CartContext";
import Carthandler from "../components/handlers/Carthandler";
import GiftPreInstructModel from "../components/orderforfriendcom/GiftPreInstructModel";
import OrderForm from "../components/ordersprocess/OrderForm";

const AddToCart = () => {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [isNightShift, setIsNightShift] = useState(false);
  const [deliveryChargeFinal, setDeliveryChargeFinal] = useState(50);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [modalId, setModalId] = useState(null);

  const checkoutRef = useRef(null);
  const orderFormRef = useRef(null);

  useEffect(() => {
    if (modalId === 0 && orderFormRef.current) {
      orderFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [modalId]);

  // Detect night shift
  useEffect(() => {
    const hour = new Date().getHours();
    setIsNightShift(hour >= 20 || hour < 8);
  }, []);

  useEffect(() => {
    let hasScrolled = false;
    if (!hasScrolled && checkoutRef.current && cart.length > 0) {
      const element = checkoutRef.current;
      const y = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: y - 500,
        behavior: "smooth",
      });
      hasScrolled = true;
    }
  }, []);

  // Calculate total items, price, and delivery charges
  useEffect(() => {
    // Total items (sum of quantities)
    const itemCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
    setTotalItems(itemCount);

    // Total price of items
    const priceSum = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // Unique item names for delivery charge logic
    const uniqueItemNames = Array.from(new Set(cart.map((item) => item.name)));

    // Base delivery charge
    let deliveryCharge = isNightShift ? 120 : 50;

    // If more than 1 unique item, add extra charge per quantity
    if (uniqueItemNames.length > 1) {
      deliveryCharge += isNightShift ? 50 : 15;
    }

    setDeliveryChargeFinal(deliveryCharge);
    setTotalPrice(priceSum + deliveryCharge);
  }, [cart, isNightShift]);

  const increment = (id) =>
    setCart((prev) =>
      prev.map((item) =>
        item.cartId === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

  const decrement = (id) =>
    setCart((prev) =>
      prev.map((item) =>
        item.cartId === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );

  const handleRemove = (id) =>
    setCart((prev) => prev.filter((item) => item.cartId !== id));

  const handleCheckoutAll = () => {
    setModalId(0);
    setIsGiftModalOpen(true);
  };

  const handleSendGift = () => {
    setModalId(1);
    setIsGiftModalOpen(true);
  };

  const handleAddMore = () => navigate("/FoodStore");

  return (
    <>
      <DrawerAppBar />

      <div className="cart-wrapper">
        <div className="cart-container">
          <h2 className="cart-title">My Bag ({totalItems} items)</h2>

          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            <>
              <div className="cart-list">
                {cart.map((item) => (
                  <div className="cart-row" key={item.cartId}>
                    <div
                      className="remove-badge-left"
                      onClick={() => handleRemove(item.cartId)}
                    >
                      ×
                    </div>

                    <div className="cart-info">
                      <strong>{item.name}</strong>
                      <small>Category: {item.category}</small>
                      <span>
                        Rs. {item.price} x {item.quantity} = Rs.{" "}
                        {item.price * item.quantity}
                      </span>
                    </div>

                    <div className="cart-actions">
                      <div className="qty-control">
                        <button onClick={() => decrement(item.cartId)}>
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => increment(item.cartId)}>
                          +
                        </button>
                      </div>

                      <generateWhatsAppLink
                        orderDetails={{
                          name: item.name,
                          price: item.price,
                          count: item.quantity,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button className="checkout-btn add-more" onClick={handleAddMore}>
                Add More Items
              </button>

              <div className="cart-notices">
                {isNightShift && (
                  <div className="notice-box warning">
                    🌙 Night delivery: Food & Liquor available. Grocery & Bakery
                    unavailable.
                  </div>
                )}
                <div className="notice-box info">
                  📌 Delivery charges: Rs. 50 (Day) / Rs. 120 (Night), + Rs. 15
                  extra (Day) or Rs. 50 extra (Night) if more than 1 unique item
                </div>
              </div>

              <div className="checkout-summary" ref={checkoutRef}>
                <p>Delivery Charges: Rs. {deliveryChargeFinal}</p>
                <p>
                  <strong>Total: Rs. {totalPrice}</strong>
                </p>
                <button className="checkout-btn" onClick={handleSendGift}>
                  🎁 Send as Gift
                </button>

                <button className="checkout-btn" onClick={handleCheckoutAll}>
                  🛒 Order for Myself
                </button>
              </div>
            </>
          )}

          {isGiftModalOpen && (
            <>
              {modalId === 1 ? (
                <GiftPreInstructModel
                  orderData={{
                    totalPrice,
                    deliveryChargeFinal,
                    totalItems,
                    cart,
                    isNightShift,
                    payableAmount: totalPrice - deliveryChargeFinal,
                    setCheckoutMessage,
                    setCart,
                  }}
                  onClose={() => setIsGiftModalOpen(false)}
                />
              ) : (
                <OrderForm
                  ref={orderFormRef}
                  orderData={{
                    totalPrice,
                    deliveryChargeFinal,
                    totalItems,
                    cart,
                    isNightShift,
                    payableAmount: totalPrice - deliveryChargeFinal,
                    setCheckoutMessage,
                    setCart,
                  }}
                  onClose={() => setIsGiftModalOpen(false)}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AddToCart;
