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

    alert("New Product added to cart");
    window.location.reload(); // Refresh the page
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
                paddingBottom: "2.5%",
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

            <WhatsAppMessageLink orderDetails={{ name, price, count }} />
            <div style={{ flex: 1, justifyContent: "center" }}>
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
