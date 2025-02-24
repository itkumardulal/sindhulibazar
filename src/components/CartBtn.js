import { Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";

const CartBtn = ({ handleCart }) => {
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    // Fetch cart from local storage and calculate the item count
    const cart = localStorage.getItem("cart");
    if (cart) {
      const parsedCart = JSON.parse(cart);
      if (Array.isArray(parsedCart)) {
        const itemCount = parsedCart.reduce(
          (total, item) => total + (item.count || 1),
          0
        );
        setTotalItems(itemCount);
      }
    }
  }, []); // Empty dependency array ensures it only runs on mount

  return (
    <Box sx={{ position: "relative" }}>
      <Button
        onClick={handleCart}
        className="material-symbols-outlined"
        sx={{
          fontSize: { xs: "24px", sm: "32px" },
          position: "fixed",
          bottom: 16,
          left: 16,
          padding: 2,
          color: "white",
          backgroundColor: "#1a66ad",
          borderRadius: "50%",
          textDecoration: "none",
          zIndex: 1000,
          transition: "background-color 0.3s ease, transform 0.3s ease",
          "&:hover": {
            backgroundColor: "#155a8a",
            transform: "scale(1.1)",
          },
        }}
      >
        {/* Display cart icon */}
        <span className="material-icons">shopping_cart</span>
        {/* Notification badge inside the button */}
        {totalItems > 0 && (
          <Box
            sx={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              backgroundColor: "#f44336", // Red color for notification
              color: "white",
              borderRadius: "50%",
              padding: "0px 8px",
              fontSize: "12px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "24px",
              height: "24px",
            }}
          >
            {totalItems}
          </Box>
        )}
      </Button>
    </Box>
  );
};

export default CartBtn;
