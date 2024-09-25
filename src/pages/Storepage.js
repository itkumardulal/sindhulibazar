import React, { useState, useEffect } from "react";
import DrawerAppBar from "../components/Navbar";
import ImgMediaCard from "../components/ItemCard";
import { Box, Button, Typography, Tooltip } from "@mui/material";
import Datacarrier from "../data/Datacarrier";
import { useParams } from "react-router-dom";
import { keyframes } from "@emotion/react";
import { CarRentAnimation } from "../components/CarRentAnimation";

// Define keyframes for animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Keyframes for hover animations
const hoverAnimation = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  }
  100% {
    transform: scale(1);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

// Keyframes for back-to-top button visibility
const fadeInButton = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Storepage = () => {
  // receiving the params sent from homepage to knw wht page and data we will be reflecting
  const { producttypeStore } = useParams();
  const [showButton, setShowButton] = useState(false);
  // console.log(producttypeStore)
  let items;
  if (producttypeStore === "FoodStore") {
    items = Datacarrier.FoodStore;
  } else if (producttypeStore === "VehicleStore") {
    items = Datacarrier.VehicalStore;
  } else if (producttypeStore === "GroceryStore") {
    items = Datacarrier.GroceryStore;
  } else if (producttypeStore === "LiquorStore") {
    items = Datacarrier.LiqureStore;
  } else if (producttypeStore === "HerbalStore") {
    items = Datacarrier.HerbalStore;
  } else {
    alert("Something went wrong");
    items = []; // Fallback to an empty array to avoid errors in mapping
  }

  // Handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 300) {
      // Adjust the value to when the button should appear
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  // Add and remove scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCart = () => {
    alert(
      "We are working on updating ADD to Cart for you to allow multiple purchases. Please wait for some days to update this feature. Continue shopping with direct orders on the website."
    );
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      {/* <CarRentAnimation/> */}
      <DrawerAppBar>
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
          shopping_cart
        </Button>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: { xs: 2, sm: 3, md: 4 },
            maxWidth: "100%",
            boxSizing: "border-box",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: { xs: 1, sm: 2, md: 3 },
              width: "100%",
              maxWidth: "1200px", // Max width for larger screens
            }}
          >
            {items.map((dt, index) => (
              <ImgMediaCard
                key={index}
                data={dt}
                sx={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    animation: `${hoverAnimation} 1s ease-in-out`,
                  },
                }}
              />
            ))}
          </Box>

          {showButton && (
            <Tooltip title="Back to Top" arrow>
              <Button
                onClick={scrollToTop}
                sx={{
                  position: "fixed",
                  bottom: "30%",
                  right: 16,
                  fontSize: { xs: "20px", sm: "25px" },
                  padding: 2,
                  color: "white",
                  backgroundColor: "#007bff",
                  borderRadius: "50%",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  zIndex: 1000,
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                  opacity: showButton ? 1 : 0,
                  transform: showButton ? "translateY(0)" : "translateY(100px)",
                  animation: `${fadeInButton} 0.5s ease-out`,
                  "&:hover": {
                    backgroundColor: "#0056b3",
                  },
                }}
              >
                ↑
              </Button>
            </Tooltip>
          )}
        </Box>
      </DrawerAppBar>
      {/* i made the DrawerAPpbar to down. change it in case of erropr */}
    </>
  );
};

export default Storepage;
