import React, { useContext, useEffect, useState } from "react";
import "./AddToCart.css";
import DrawerAppBar from "../components/Navbar";
import WhatsAppMessageLink from "../components/Whatsappme";
import WhatsAppmebulk from "../components/WhatsAppmebulk";
import { CartContext } from "../context/CartContext"; // adjust path

const AddToCart = () => {
  const { cart, setCart } = useContext(CartContext); // use cart from context
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [isNightShift, setIsNightShift] = useState(false);
  const [deliveryChargeFinal, setDeliveryChargeFinal] = useState(50);

  useEffect(() => {
    const currentHour = new Date().getHours();
    setIsNightShift(currentHour >= 20 || currentHour < 6);
  }, []);

  // Calculate totals whenever cart changes
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
    const message = cart
      .map(
        (item) =>
          `Item: ${item.name}\nCategory: ${item.category}\nPrice: Rs. ${
            item.price
          }\nQuantity: ${item.quantity}\nTotal: Rs. ${
            item.price * item.quantity
          }`
      )
      .join("\n");

    const uniqueCategories = new Set(cart.map((item) => item.category));
    const deliveryChargePerCategory = isNightShift ? 150 : 50;
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
      setCart([]); // clear cart in context (also updates localStorage)
    }, 30000);
  };

  return (
    <>
      <DrawerAppBar />

      <div className="cart-container">
        <h2>Shopping Cart</h2>
        <h4 style={{ padding: 5 }}> {totalItems} items for checkout</h4>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
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
