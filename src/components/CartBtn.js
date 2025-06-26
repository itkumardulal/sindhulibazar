import React, { useContext, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartContext } from "../context/CartContext"; // adjust path as needed

const CartBtn = ({ handleCart }) => {
  const { cart } = useContext(CartContext); // get cart from context
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    // Calculate total item count whenever cart changes
    const itemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    setTotalItems(itemCount);
  }, [cart]);

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
        <ShoppingCartIcon sx={{ fontSize: 32 }} />
        {totalItems > 0 && (
          <Box
            sx={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              backgroundColor: "#f44336",
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
