import React, { useState, useContext, useMemo } from "react";
import { Box, Typography, Stack, IconButton, useMediaQuery, Button } from "@mui/material";
import { useTheme } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ConfirmModal from "../../components/ConfirmItem";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import { useInView } from "react-intersection-observer";
import WhatsAppMessageLink from "../../messagecarrier/Whatsappme";
import { red } from "@mui/material/colors";

const gradients = [
  "linear-gradient(135deg, #f3f3f3ff, #ffcc00)",
  "linear-gradient(135deg, #ffcc00, #f0f0f0ff)",
  "linear-gradient(135deg, #cc5f5fff, #c1d12de5)",
];

export default function ImgMediaCard({ data, index }) {
  const { id, name, image, description, price, category } = data;
  const [count, setCount] = useState(1);
  const [open, setOpen] = useState(false);
  const { setCart } = useContext(CartContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
    toast.success("✅ Added to cart");
  };

  return (
    <>
      <ConfirmModal open={open} setOpen={setOpen} handleClose={() => setOpen(false)} />
      <Box
        ref={ref}
        className={`card-container ${inView ? "fade-in" : ""}`}
        sx={{
          position: "relative",
          background: gradient,
          display: "flex",
          flexDirection: isMobile ? "column" : "column",
          alignItems: "center",
          gap: 1,
          padding: isMobile ? 1 : 2,
          borderRadius: 2,
          minHeight: isMobile ? "auto" : 120,
          width: "100%",
          boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
          transition: "all 0.25s ease",
        }}
      >
        {/* Help button as customer care emoji */}
        <Button
          onClick={() => setOpen(true)}
          sx={{
            position: "absolute",
            top: 4,
            right: 4,
            minWidth: 28,
            minHeight: 28,
            padding: 0.5,
            borderRadius: "50%",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            fontSize:18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 10,
            "&:hover": { transform: "scale(1.2)", boxShadow: "0 2px 6px rgba(0,0,0,0.2)" },
          }}
        >
          🤳
        </Button>

        <img
          src={image}
          alt={name}
          style={{
            width: isMobile ? "100%" : 250,
            height: isMobile ? "auto" : 250,
            borderRadius: 12,
            objectFit: "cover",
          }}
        />

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, fontSize: isMobile ? 12 : 16, mb: 0.1 }}>
            {name}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: isMobile ? 10 : 14, color: "#555", mb: 0.2 }}>
            {description}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: isMobile ? 12 : 16, color: "#b30000", mb: 0.5 }}>
            Rs. {price}
          </Typography>

     <Stack
  direction="row"
  alignItems="center"
  justifyContent="center"
  spacing={1}
  sx={{ flexWrap: "wrap" }}
>
  <IconButton
    className="icon-btn red"
    onClick={() => setCount((c) => (c > 1 ? c - 1 : c))}
    sx={{
      width: isMobile ? 28 : 36,
      height: isMobile ? 28 : 36,
      padding: 0.5,
    }}
  >
    <RemoveIcon fontSize={isMobile ? "inherit" : "small"} />
  </IconButton>

  <Typography sx={{ minWidth: 20, textAlign: "center", fontSize: isMobile ? 12 : 14 }}>
    {count}
  </Typography>

  <IconButton
    className="icon-btn yellow"
    onClick={() => setCount((c) => c + 1)}
    sx={{
      width: isMobile ? 22 : 36,
      height: isMobile ? 22 : 36,
      padding: 0.2,
    }}
  >
    <AddIcon fontSize={isMobile ? "inherit" : "small"} />
  </IconButton>

  <IconButton
    className="icon-btn cart"
    style={{color:"red"}}
    onClick={handleAddToCart}
    sx={{
      width: isMobile ? 30 : 36,
      height: isMobile ? 30 : 36,
      padding: 0.5,
    }}
  >
    <ShoppingCartIcon fontSize={isMobile ? "inherit" : "small"} />
  </IconButton>

  <WhatsAppMessageLink orderDetails={{ name, price, count }}>
    <IconButton
      className="icon-btn whatsapp"
      sx={{
        width: isMobile ? 22 : 36,
        height: isMobile ? 22 : 36,
        padding: 0.1,
      }}
    >
      <WhatsAppIcon fontSize={isMobile ? "inherit" : "small"} />
    </IconButton>
  </WhatsAppMessageLink>
</Stack>

        </Box>
      </Box>
    </>
  );
}
