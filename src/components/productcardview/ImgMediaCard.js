import React, { useState, useContext, useMemo, useRef, useEffect } from "react";
import { Typography, IconButton, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import ConfirmModal from "../../components/ConfirmItem";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { useInView } from "react-intersection-observer";
import "./ImgMediaCard.css";
import OrderForm from "../ordersprocess/OrderForm";

const gradients = [
  // "linear-gradient(135deg, #f3f3f3, #ecd060ff)",
  "linear-gradient(135deg, #dfddd6ff, #fafafaff)",
  // "linear-gradient(135deg, #d6ddc7ff, #b3be4aff)",
];

export default function ImgMediaCard({ data, index }) {
  const { id, name, image, description, price, category } = data;
  const [count, setCount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [order, setOrder] = useState(null);
  const [open, setOpen] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const { setCart } = useContext(CartContext);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  const gradient = useMemo(() => gradients[index % gradients.length], [index]);
  const orderFormRef = useRef();

  const generateCartId = () =>
    `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const [shiftValue, setShiftValue] = useState(0);

  // Function to determine shift value
  // Function to determine shift value
  const getShiftValue = () => {
    const hour = new Date().getHours(); // 0-23
    // Night shift: 20:00 to 05:59
    return hour >= 20 || hour < 6 ? 120 : 50;
  };

  // useEffect to set shift value when component mounts
  useEffect(() => {
    const value = getShiftValue();
    setShiftValue(value);
  }, []); // empty dependency → runs once on mount

  const handleAddToCart = () => {
    const newItem = {
      cartId: generateCartId(),
      id,
      name,
      image,
      description,
      price,
      category,
      quantity: count,
    };
    setCart((prev) => [...prev, newItem]);
    toast.success("👜 Added to bag");
  };
  const handleOrderClick = (orderDetails) => {
    setOrder(orderDetails);

    setIsModalOpen(true); // ✅ show modal
    // console.log("Order Details:", orderDetails);

    // You can now send this data to another component or API
  };

  return (
    <>
      <ConfirmModal
        open={open}
        setOpen={setOpen}
        handleClose={() => setOpen(false)}
      />
      <div
        ref={ref}
        className={`card ${inView ? "fade-in" : ""}`}
        style={{ background: gradient }}
      >
        <button className="help-btn" onClick={() => setOpen(true)}>
          🤳
        </button>

        <div className="image-wrapper">
          <img src={image} alt={name} className="card-image" />
        </div>
        <Button
          className="add-to-bag-bottom-right"
          startIcon={<ShoppingCartIcon />}
          onClick={handleAddToCart}
          size="small"
          variant="contained"
        >
          Add to Bag
        </Button>
        <div className="card-details">
          <Typography className="product-name" title={name}>
            {name}
          </Typography>
          <Typography className="product-desc" title={description}>
            {description}
          </Typography>
          <Typography className="product-price">Rs. {price}</Typography>

          <div className="quantity-row">
            <IconButton
              className="icon-btn red"
              onClick={() => setCount((c) => (c > 1 ? c - 1 : 1))}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography className="quantity">{count}</Typography>
            <IconButton
              className="icon-btn yellow"
              onClick={() => setCount((c) => c + 1)}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </div>

          <div className="action-buttons">
            <button
              onClick={() => handleOrderClick({ name, price, count })}
              style={{ width: "240px", padding: "10px", margin: "5px" }}
            >
              order now
            </button>
            {/* Conditionally render FormData with props */}
            {isModalOpen && order && (
              <OrderForm
                ref={orderFormRef}
                orderData={{ ...(order || {}), shiftValue }}
                onClose={() => setIsModalOpen(false)} // close modal
              />
            )}

            {/* <WhatsAppMessageLink orderDetails={{ name, price, count }}>
              <Button
                variant="outlined"
                startIcon={<WhatsAppIcon />}
                className="whatsapp-btn"
              >
                WhatsApp
              </Button>
            </WhatsAppMessageLink> */}
          </div>
        </div>
      </div>
    </>
  );
}
