import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AddToCart.css";
import DrawerAppBar from "../components/Navbar";
import WhatsAppMessageLink from "../messagecarrier/Whatsappme";
import WhatsAppmebulk from "../messagecarrier/WhatsAppmebulk";
import { CartContext } from "../context/CartContext";
import Carthandler from "../components/handlers/Carthandler";
import GiftPreInstructModel from "../components/orderforfriendcom/GiftPreInstructModel";
import Footer from "../components/footer";
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
  const [modalId, setModalId] = useState(null); // null means no modal open yet

  const checkoutRef = useRef(null);
  const orderFormRef = useRef(null);

  useEffect(() => {
    if (modalId === 0 && orderFormRef.current) {
      orderFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center", // center the form in viewport
      });
    }
  }, [modalId]);

  // Detect night shift
  useEffect(() => {
    const hour = new Date().getHours();
    setIsNightShift(hour >= 20 || hour < 6);
  }, []);

  useEffect(() => {
    let hasScrolled = false;

    if (!hasScrolled && checkoutRef.current && cart.length > 0) {
      const element = checkoutRef.current;
      const y = element.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: y - 500, // adjust this value
        behavior: "smooth",
      });

      hasScrolled = true;
    }
    // 👇 no dependencies -> runs only once on mount
  }, []);

  // Calculate total items, price, and delivery charges
  useEffect(() => {
    const itemCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
    setTotalItems(itemCount);

    const priceSum = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const uniqueCategories = Array.from(
      new Set(cart.map((item) => item.category))
    );

    // First category charge
    let deliveryCharge = isNightShift ? 120 : 50;

    // Extra categories add 50 each
    if (uniqueCategories.length > 1) {
      deliveryCharge += (uniqueCategories.length - 1) * 50;
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
  const handleCheckoutAll = () =>
    Carthandler(
      cart,
      isNightShift,
      totalPrice - deliveryChargeFinal,
      setCheckoutMessage,
      setCart
    );
  // const handleCheckoutAll = () => {
  //   setModalId(0); // or any ID you want for checkout
  //   setIsGiftModalOpen(true);

  // };

  const handleSendGift = () => {
    setModalId(1); // different ID for gift
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
              {/* Cart Items */}
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

                      <WhatsAppMessageLink
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

              {/* Notices / Info Boxes */}
              <div className="cart-notices">
                {isNightShift && (
                  <div className="notice-box warning">
                    🌙 Night delivery: Food & Liquor available. Grocery & Bakery
                    unavailable.
                  </div>
                )}
                <div className="notice-box info">
                  📌 Delivery charges: Rs. 50 for first category (Day) / Rs. 120
                  (Night), + Rs. 50 per extra category
                </div>
              </div>

              {/* Checkout Summary */}
              <div className="checkout-summary" ref={checkoutRef}>
                <p>Delivery Charges: Rs. {deliveryChargeFinal}</p>
                <p>
                  <strong>Total: Rs. {totalPrice}</strong>
                </p>

                <button
                  className="checkout-btn"
                  onClick={handleSendGift}
                  // disabled
                >
                  Send as Gift (new)
                </button>

                <button className="checkout-btn" onClick={handleCheckoutAll}>
                  Order for Myself
                </button>

                {checkoutMessage && (
                  <WhatsAppmebulk message={checkoutMessage} />
                )}
              </div>
            </>
          )}

          {/* {isGiftModalOpen && (

            <GiftPreInstructModel
              orderData={{ totalPrice, deliveryChargeFinal, totalItems, cart }}
              onClose={() => setIsGiftModalOpen(false)}
            />
          )} */}
          {isGiftModalOpen && (
            <>
              {modalId === 1 ? (
                <GiftPreInstructModel
                  orderData={{
                    totalPrice,
                    deliveryChargeFinal,
                    totalItems,
                    cart,
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
                  }}
                  onClose={() => setIsGiftModalOpen(false)}
                />
              )}
            </>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default AddToCart;
