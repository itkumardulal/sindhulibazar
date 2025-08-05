import React, { useContext, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartContext } from "../context/CartContext";

const CartBtn = ({ handleCart }) => {
  const { cart } = useContext(CartContext);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const itemCount = cart.reduce(
      (total, item) => total + (item.quantity || 1),
      0
    );
    setTotalItems(itemCount);
  }, [cart]);

  return (
    <Box sx={{ position: "relative" }}>
      <Button
        onClick={handleCart}
        aria-label="Open Cart"
        sx={{
          position: "fixed",
          bottom: { xs: 16, sm: 20, md: 24, lg: 32 },
          left: { xs: 16, sm: 20, md: 24, lg: 32 },
          padding: { xs: 2, sm: 2.5, md: 3 },
          backgroundColor: "#1976d2",
          color: "#fff",
          borderRadius: "50%",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          zIndex: 1100,
          minWidth: 0,
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "#1565c0",
            transform: "scale(1.1)",
          },
        }}
      >
        <ShoppingCartIcon
          sx={{
            fontSize: { xs: 30, sm: 34, md: 38, lg: 42 },
          }}
        />
        {totalItems > 0 && (
          <Box
            sx={{
              position: "absolute",
              top: -8,
              right: -8,
              backgroundColor: "#e53935",
              color: "#fff",
              borderRadius: "50%",
              fontSize: { xs: "11px", sm: "13px", md: "14px" },
              fontWeight: 600,
              width: { xs: 20, sm: 22, md: 24 },
              height: { xs: 20, sm: 22, md: 24 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 0 2px #fff",
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
