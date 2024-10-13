import { Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";

const CartBtn = ({ handleCart }) => {
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    // Fetch cart from local storage
    let cart = localStorage.getItem("cart");
    cart = cart ? JSON.parse(cart) : [];

    if (Array.isArray(cart)) {
      // Calculate the total number of items in the cart
      const itemCount = cart.reduce(
        (total, item) => total + (item.count || 1),
        0
      );
      setTotalItems(itemCount);
    }
  }, []);

  return (
    <Box sx={{ position: "relative" }}>
      <Button
        onClick={handleCart}
        className="material-symbols-outlined"
        sx={{
          fontSize: { xs: "24px", sm: "32px" },
          position: "fixed",
          bottom: 16,
          right: 16,
          padding: 2,
          color: "white",
          backgroundColor: "#1a66ad",
          borderRadius: "50%",
          textDecoration: "none",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
          transition: "background-color 0.3s ease, transform 0.3s ease",
          "&:hover": {
            backgroundColor: "#155a8a",
            transform: "scale(1.1)",
          },
        }}
      >
        {/* Display cart icon */}
        shopping_cart
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
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
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
