import React, { useEffect, useState } from "react";
import "./AddToCart.css"; // Import the CSS file
import DrawerAppBar from "../components/Navbar";
import WhatsAppMessageLink from "../components/Whatsappme";
import WhatsAppmebulk from "../components/WhatsAppmebulk";

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0); // New state for total price
  const [checkoutMessage, setCheckoutMessage] = useState(""); // New state for checkout message

  useEffect(() => {
    // Fetch cart from local storage
    let cart = localStorage.getItem("cart");
    cart = cart ? JSON.parse(cart) : [];

    // Update cartItems state with the retrieved cart data
    setCartItems(cart);

    if (Array.isArray(cart)) {
      // Calculate the total number of items in the cart
      const itemCount = cart.reduce(
        (total, item) => total + (item.count || 1),
        0
      );
      setTotalItems(itemCount);

      // Calculate the total price
      const priceSum = cart.reduce(
        (total, item) => total + item.price * item.quantity + 150,
        0
      );
      setTotalPrice(priceSum); // Update the total price state
    }
  }, []); // This effect runs only once when the component mounts

  // const handleBuyNow = (item) => {
  //   alert(`You have purchased: ${item.name}`);
  // };

  const increment = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartId === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    updateTotalPrice(); // Recalculate the total price
  };

  const decrement = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartId === id && item.quantity > 0 // Ensure quantity doesn't go below 0
          ? { ...item, quantity: item.quantity - 1 } // Decrement the quantity by 1
          : item
      )
    );
    updateTotalPrice(); // Recalculate the total price
  };

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.cartId !== id);
    setCartItems(updatedCart); // Update state with the filtered cart items
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update local storage
    updateTotalPrice(updatedCart); // Recalculate the total price
  };

  const updateTotalPrice = (updatedCart) => {
    // Use the updated cart or the current cartItems
    const cart = updatedCart || cartItems;
    const priceSum = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPrice(priceSum); // Update the total price state
  };

  const handleCheckoutAll = () => {
    // Construct the checkout message
    const message = cartItems
      .map(
        (item) =>
          `Item: ${item.name}\nCategory: ${item.category}\nPrice: Rs. ${
            item.price
          }\nQuantity: ${item.quantity}\nTotal: Rs. ${
            item.price * item.quantity
          }`
      )
      .join("\n\n");

    const totalMessage = `Total Price for all items: Rs. ${totalPrice}`;

    // Combine both messages
    const finalMessage = `${message}\n\n${totalMessage}`;
    setCheckoutMessage(finalMessage);

    // Set timer to delete local storage after 30 seconds
    setTimeout(() => {
      localStorage.removeItem("cart");
      setCartItems([]); // Clear the cart items state
    }, 100000); // 30 seconds
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
                    <p className="cart-item-price">Quantity: {item.quantity}</p>
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
                        width: "60px",
                        justifyContent: "space-between",
                      }}
                    >
                      <button
                        className="buy-now-button"
                        onClick={() => decrement(item.cartId)}
                      >
                        -
                      </button>

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

        {/* Display Total Price at the bottom */}
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
            <h3>Total Price for all items: Rs. {totalPrice}</h3>

            {/* Checkout All Button */}
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
                // After preparing the message, redirect to WhatsApp
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
