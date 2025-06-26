import React, { useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { useInView } from "react-intersection-observer";
import ConfirmModal from "./ConfirmItem";
import WhatsAppMessageLink from "./Whatsappme";
import ToastNotify, { showToast } from "../components/ToastNotify";
import { CartContext } from "../context/CartContext"; // 👈 Import context

// Define keyframes for zoom-in animation
const zoomInAnimation = `
  @keyframes zoomIn {
    0% {
      transform: scale(0.95);
      opacity: 0.5;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

// Loading Overlay Component
const LoadingOverlay = () => (
  <div
    id="loading-overlay"
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(255,255,255,0.9)", // white-ish overlay
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
      flexDirection: "column",
    }}
  >
    <img
      src="https://i.imgur.com/SE8uswq.png" // Replace with your logo
      alt="Loading"
      style={{ width: 100, marginBottom: 20 }}
    />
    <div style={{ fontSize: 18, color: "#333" }}>Loading... Please wait.</div>
  </div>
);

export default function ImgMediaCard({ data }) {
  const { id, name, image, description, price, category } = data;
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(1);
  const [showOverlay, setShowOverlay] = useState(false);

  const { cart, setCart } = useContext(CartContext); // 👈 useContext to access cart

  // Intersection Observer hook to detect when the card is in view
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const increment = () => setCount(count + 1);
  const decrement = () => count > 1 && setCount(count - 1);

  const generateUniqueCartId = () =>
    `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const handleClickAddtoCart = () => {
    const newProduct = {
      cartId: generateUniqueCartId(),
      id,
      name,
      image,
      description,
      price,
      category,
      quantity: count,
    };

    // Update cart state directly, triggers re-render everywhere consuming CartContext
    setCart([...cart, newProduct]);

    showToast("🛒 Product added to cart!");

    // setShowOverlay(true);
    // setTimeout(() => setShowOverlay(false), 500);
  };

  return (
    <>
      <style>{zoomInAnimation}</style>
      <ToastNotify />
      {showOverlay && <LoadingOverlay />}
      <ConfirmModal open={open} setOpen={setOpen} handleClose={handleClose} />
      <Card
        ref={ref}
        sx={{
          maxWidth: 345,
          transition: "transform 0.5s ease, box-shadow 0.5s ease",
          animation: inView ? "zoomIn 0.5s ease-out" : "none",
          "@media (max-width: 600px)": {
            maxWidth: "100%",
            animation: inView ? "zoomIn 0.5s ease-out" : "none",
          },
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
          },
        }}
        elevation={5}
      >
        <CardMedia
          style={{ paddingTop: 5 }}
          component="img"
          alt="Product Image"
          height="140"
          sx={{ objectFit: "contain" }}
          image={image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <br />
          <Typography variant="h6">Rs. {price}</Typography>
        </CardContent>
        <CardActions>
          <Box sx={{ width: "100%" }}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: ".5%",
              }}
            >
              <Button sx={{ mr: 2 }} size="small" variant="outlined" onClick={decrement}>
                -
              </Button>
              <Typography>{count}</Typography>
              <Button sx={{ ml: 2 }} size="small" variant="outlined" onClick={increment}>
                +
              </Button>
            </div>

            <div style={{ flex: 1, justifyContent: "center" }}>
              <WhatsAppMessageLink orderDetails={{ name, price, count }} />

              <Button fullWidth size="medium" variant="outlined" onClick={handleClickAddtoCart}>
                Add to Cart
              </Button>
              <Button fullWidth size="medium" variant="outlined" onClick={handleClickOpen}>
                How to purchase? ("खरीद कसरी गर्ने?")
              </Button>
            </div>
          </Box>
        </CardActions>
      </Card>
    </>
  );
}
