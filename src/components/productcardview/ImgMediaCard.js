import React, { useState, useContext, useMemo } from "react";
import {
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ConfirmModal from "../../components/ConfirmItem";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { useInView } from "react-intersection-observer";
import WhatsAppMessageLink from "../../messagecarrier/Whatsappme";
import "./ImgMediaCard.css";

const gradients = [
  // "linear-gradient(135deg, #f3f3f3, #ffcc00)",
  "linear-gradient(135deg, #ffcc00, #f0f0f0)",
  // "linear-gradient(135deg, #d6ddc7ff, #c1d12d)",
];

export default function ImgMediaCard({ data, index }) {
  const { id, name, image, description, price, category } = data;
  const [count, setCount] = useState(1);
  const [open, setOpen] = useState(false);
  const { setCart } = useContext(CartContext);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  const gradient = useMemo(() => gradients[index % gradients.length], [index]);

  const generateCartId = () =>
    `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

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

  return (
    <>
      <ConfirmModal open={open} setOpen={setOpen} handleClose={() => setOpen(false)} />
      <div
        ref={ref}
        className={`card ${inView ? "fade-in" : ""}`}
        style={{ background: gradient }}
      >
        <button className="help-btn" onClick={() => setOpen(true)}>🤳</button>

        <div className="image-wrapper">
          <img src={image} alt={name} className="card-image" />
        
        </div>
  <Button
            className="add-to-bag-bottom-right"
        startIcon={<ShoppingCartIcon  />}
            onClick={handleAddToCart}
            size="small"
            variant="contained"
          >
            Add to Bag
          </Button>
        <div className="card-details">
          <Typography className="product-name" title={name}>{name}</Typography>
          <Typography className="product-desc" title={description}>{description}</Typography>
          <Typography className="product-price">Rs. {price}</Typography>

          <div className="quantity-row">
            <IconButton className="icon-btn red" onClick={() => setCount(c => c > 1 ? c - 1 : 1)}>
              <RemoveIcon fontSize="small" />
            </IconButton>
            <Typography className="quantity">{count}</Typography>
            <IconButton className="icon-btn yellow" onClick={() => setCount(c => c + 1)}>
              <AddIcon fontSize="small" />
            </IconButton>
          </div>

          <div className="action-buttons">
            <WhatsAppMessageLink orderDetails={{ name, price, count }}>
              <Button
                variant="outlined"
                startIcon={<WhatsAppIcon />}
                className="whatsapp-btn"
              >
                WhatsApp
              </Button>
            </WhatsAppMessageLink>
          </div>
        </div>
      </div>
    </>
  );
}
