import React, { useEffect, useState } from "react";
import "./AddToCart.css"; // Import the CSS file
import DrawerAppBar from "../components/Navbar";
import WhatsAppMessageLink from "../components/Whatsappme";
import WhatsAppmebulk from "../components/WhatsAppmebulk";

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [isNightShift, setIsNightShift] = useState(false); // New state for day/night

  useEffect(() => {
    const currentHour = new Date().getHours();
    setIsNightShift(currentHour >= 20 || currentHour < 6); // Night from 8 PM to 6 AM

    let cart = localStorage.getItem("cart");
    cart = cart ? JSON.parse(cart) : [];

    setCartItems(cart);

    if (Array.isArray(cart)) {
      const itemCount = cart.reduce(
        (total, item) => total + (item.count || 1),
        0
      );
      setTotalItems(itemCount);
      updateTotalPrice(cart);
    }
  }, []);

  const increment = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartId === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    updateTotalPrice();
  };

  const decrement = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartId === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
    updateTotalPrice();
  };

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.cartId !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateTotalPrice(updatedCart);
  };

  const updateTotalPrice = (updatedCart) => {
    const cart = updatedCart || cartItems;
    const priceSum = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const deliveryChargePerCategory = isNightShift ? 50 : 150;
    const uniqueCategories = new Set(cart.map((item) => item.category));
    const deliveryCharge = uniqueCategories.size * deliveryChargePerCategory;

    setTotalPrice(priceSum + deliveryCharge);
  };

  const handleCheckoutAll = () => {
    const message = cartItems
      .map(
        (item) =>
          `Item: ${item.name}\nCategory: ${item.category}\nPrice: Rs. ${
            item.price
          }\nQuantity: ${item.quantity}\nTotal: Rs. ${
            item.price * item.quantity
          }`
      )
      .join("\n");

    const uniqueCategories = new Set(cartItems.map((item) => item.category));
    const deliveryChargePerCategory = isNightShift ? 50 : 150;
    const totalDeliveryCharge =
      uniqueCategories.size * deliveryChargePerCategory;

    const totalMessage = `
      ------------------------------
      Delivery Charges: Rs. ${totalDeliveryCharge}
      ------------------------------
      Total Price for all items: Rs. ${totalPrice}
    `;
    const finalMessage = `
      ********* Your Order Summary *********
      ${message}
      ${totalMessage}
      Thank you for shopping with us! `;

    setCheckoutMessage(finalMessage);

    setTimeout(() => {
      localStorage.removeItem("cart");
      setCartItems([]);
    }, 30000);
  };

  return (
    <>
      <DrawerAppBar />

      <div className="cart-container">
        <h2>Shopping Cart</h2>
        <h4 style={{ padding: 5 }}> {totalItems} items for checkout</h4>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item) => (
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
                    <p className="cart-item-price">Category: {item.category}</p>
                    <p className="cart-item-price">Price: Rs. {item.price}</p>
                    <p
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
                    </p>
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

        {cartItems.length > 0 && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              backgroundColor: "#f0f0f0",
              borderRadius: "5px",
              textAlign: "center",
            }}
          >
            <h4>
              Total Price for all items including delivery : Rs. {totalPrice}
              <p></p> Note: We deliver liquor at night shift too. Food and
              Grocery are not aavailble for delivery aget 8PM. Different
              category orders will charge you an extra 50 at day shift.
            </h4>
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
              onClick={() => {
                handleCheckoutAll();
              }}
            >
              I want to order all items
            </button>
            {checkoutMessage && <WhatsAppmebulk message={checkoutMessage} />}
          </div>
        )}
      </div>
    </>
  );
};

export default AddToCart;
