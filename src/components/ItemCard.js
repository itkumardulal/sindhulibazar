import React, { useState } from "react";
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

export default function ImgMediaCard({ data }) {
  const { id, name, image, description, price, category } = data;
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(1);

  // Intersection Observer hook to detect when the card is in view
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1, // Adjust as needed
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      // Prevent count from going below 1
      setCount(count - 1);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const generateUniqueCartId = () => {
    return `cart-${new Date().getTime()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  };
  //loaders
  const showLoadingOverlay = () => {
    // Prevent multiple overlays
    if (document.getElementById("loading-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "loading-overlay";
    Object.assign(overlay.style, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.6)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    });

    // Spinner element
    const spinner = document.createElement("div");
    Object.assign(spinner.style, {
      border: "6px solid #f3f3f3",
      borderTop: "6px solid #3498db",
      borderRadius: "50%",
      width: "60px",
      height: "60px",
      animation: "spin 1s linear infinite",
    });

    // Loading text
    const text = document.createElement("div");
    text.innerText = "Loading... Please wait.";
    Object.assign(text.style, {
      marginTop: "15px",
      color: "#fff",
      fontSize: "1.2rem",
      fontWeight: "500",
      fontFamily: "Arial, sans-serif",
    });

    overlay.appendChild(spinner);
    overlay.appendChild(text);
    document.body.appendChild(overlay);

    // Add keyframes animation for spinner
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
    document.head.appendChild(styleSheet);
  };

  //loader ends

  const handleClickAddtoCart = () => {
    // Get existing cart from localStorage
    let cart = localStorage.getItem("cart");

    // If cart exists, parse it, otherwise initialize an empty array
    cart = cart ? JSON.parse(cart) : [];

    // Create a new product object with a unique cart ID
    const newProduct = {
      cartId: generateUniqueCartId(), // Unique identifier for the cart item
      id: id,
      name: name,
      image: image,
      description: description,
      price: price,
      category: category,
      quantity: count,
    };

    // Add the new product to the cart
    cart.push(newProduct);

    // Save updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    showLoadingOverlay();

    showToast("🛒 Product added to cart!");

    // alert("New Product added to cart");

    // Show loading overlay before reload

    setTimeout(() => {
      window.location.reload();
    }, 100); // Wait 0.5 seconds for user to see toast + loading
  };

  return (
    <>
      <style>{zoomInAnimation}</style>
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
            {/* Quantity controls */}
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: ".5%",
              }}
            >
              <Button
                sx={{ mr: 2 }}
                size="small"
                variant="outlined"
                onClick={decrement}
              >
                -
              </Button>
              <Typography>{count}</Typography>
              <Button
                sx={{ ml: 2 }}
                size="small"
                variant="outlined"
                onClick={increment}
              >
                +
              </Button>
            </div>

            <div
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <WhatsAppMessageLink orderDetails={{ name, price, count }} />

              <Button
                fullWidth
                size="medium"
                variant="outlined"
                onClick={handleClickAddtoCart} // Call the function directly
              >
                Add to Cart
              </Button>
              <Button
                fullWidth
                size="medium"
                variant="outlined"
                onClick={handleClickOpen}
              >
                How to purchase? ("खरीद कसरी गर्ने?")
              </Button>
            </div>
          </Box>
        </CardActions>
      </Card>
    </>
  );
}
